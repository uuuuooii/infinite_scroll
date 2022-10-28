import React, { useState, useRef, forwardRef } from "react";
import { FaSearch } from "react-icons/fa";
import "../../styles/Search.css";

const Search = forwardRef(({ items, setItems, categoryList }, ref) => {
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

  return (
    <>
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
                </div>
              );
            })
          : items.map((category) => {
              return (
                <div className="wrap_category" key={category.id}>
                  <div className="category_id">{category.id}.</div>
                  <div className="category_title">{category.title} </div>
                  <div className="category_content">{category.content}</div>
                </div>
              );
            })}
        <div ref={ref}>This is Target.</div>
      </div>
    </>
  );
});

export default Search;
