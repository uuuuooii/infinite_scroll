import React, { useState, useRef, forwardRef, useNavigate } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/Search.css";

const Search = forwardRef(({ items, setItems, categoryList }, ref) => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const inputFocus = useRef(null);
  // const navigate = useNavigate();

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
                <div
                // onClick={() => {
                //   navigate("/detail");
                // }}
                >
                  <span className="wrap_button">
                    <div className="category_id">{item.id}.</div>
                    <div className="category_title">{item.title}</div>
                    <div className="category_content">{item.content}</div>
                  </span>
                </div>
              );
            })
          : items.map((category) => {
              return (
                <span className="wrap_button">
                  <div className="wrap_category" key={category.id}>
                    <div className="category_id">{category.id}.</div>
                    <div className="category_title">{category.title} </div>
                    <br />
                    <div className="category_content">{category.content}</div>
                  </div>
                </span>
              );
            })}
        {/* <div ref={ref}></div> */}
      </div>
    </>
  );
});

export default Search;
