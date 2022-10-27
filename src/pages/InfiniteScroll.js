import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import Search from "../components/search/Search";
import "../styles/Infinite.css";
//
import { FaSearch } from "react-icons/fa";

function InfiniteScroll() {
  const categoryList = ["A Posts", "B Posts"];
  const [items, setItems] = useState([]);
  const [target, setTarget] = useState(null);
  const [page, setPage] = useState([]);

  // const [filteredResults, setFilteredResults] = useState([]);

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const inputFocus = useRef(null);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = items.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(items);
    }
  };
  //

  const fetchData = async () => {
    const response = await fetch(
      `https://recruit-api.yonple.com/recruit/354412/b-posts?page=${page}`
    );
    const data = await response.json();
    setItems((prev) => [...prev, ...data]);
    page++;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let observer;
    if (target) {
      const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          await fetchData();
          observer.observe(entry.target);
        }
      };
      observer = new IntersectionObserver(onIntersect, { threshold: 1 }); // 추가된 부분
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <div>
      <div className="color"></div>

      {/* <Search
        items={items}
        setItems={setItems}
        categoryList={categoryList}
        setTarget={setTarget}
      /> */}
      <div className="input_wrap">
        <FaSearch
          className="input_icon"
          onClick={() => {
            inputFocus.current.focus();
            // console.dir(inputFocus.current);
          }}
        />
        <input
          className="input"
          type="text"
          placeholder="검색어를 입력하세요"
          onChange={(e) => searchItems(e.target.value)}
          ref={inputFocus}
        />
      </div>
      <div className="title_button">
        {categoryList.map((item) => {
          return (
            <span key={item} className="button" onClick={() => setItems()}>
              {item}
              <div ref={setTarget}>This is Target.</div>
            </span>
          );
        })}
      </div>
      <hr className="line" />
      <div className="wrap_search">
        {searchInput.length > 1
          ? filteredResults.map((item) => {
              return (
                <div>
                  <div>
                    <div>{item.id}.</div>
                    <div>{item.title}</div>
                    <div>{item.content}</div>
                  </div>
                  <div ref={setTarget}>This is Target.</div>
                </div>
              );
            })
          : items.map((category) => {
              return (
                <div className="wrap_category" key={category.id}>
                  <div className="category_id">{category.id}.</div>
                  <div className="category_title">{category.title} </div>
                  <div className="category_content">{category.content}</div>
                  <div ref={setTarget}>This is Target.</div>
                </div>
              );
            })}
        <div ref={setTarget}>This is Target.</div>
      </div>

      <div></div>
    </div>
  );
}

export default InfiniteScroll;
