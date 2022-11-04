import React, { useState, useRef, forwardRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "../../styles/Search.css";

const Search = forwardRef(({ itemsA, itemsB, setCategory, category }, ref) => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const inputFocus = useRef(null);
  const navigate = useNavigate();
  const { Id } = useParams();

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = itemsA.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(itemsA);
    }
  };

  const onChangeCategory = (ctg) => {
    setCategory(ctg);
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
        <div onClick={() => onChangeCategory("a")}>Atype</div>
        <div onClick={() => onChangeCategory("b")}>Btype</div>
      </div>
      <hr className="line" />
      <div className="wrap_search">
        {searchInput.length > 1
          ? filteredResults.map((item) => {
              return (
                <div>
                  <span className="wrap_button" key={item.id}>
                    <div className="category_id">{item.id}.</div>
                    <div className="category_title">{item.title}</div>
                    <div className="category_content">{item.content}</div>
                  </span>
                </div>
              );
            })
          : category === "a"
          ? itemsA.map((category) => {
              return (
                <div
                  key={category.id}
                  className="wrap_button"
                  onClick={() => {
                    navigate(`/detail/${category.id}`);
                  }}
                >
                  <div className="wrap_category" key={category.id}>
                    <div className="category_id">{category.id}.</div>
                    <div className="category_title">{category.title} </div>
                    <br />
                    <div className="category_content">{category.content}</div>
                  </div>
                </div>
              );
            })
          : [
              itemsB.map((category) => {
                return (
                  <span
                    key={category.id}
                    className="wrap_button"
                    onClick={() => {
                      navigate(`/detail/${category.id}`);
                    }}
                  >
                    <div className="wrap_category" key={category.id}>
                      <div className="category_id">{category.id}.</div>
                      <div className="category_title">{category.title} </div>
                      <br />
                      <div className="category_content">{category.content}</div>
                    </div>
                  </span>
                );
              }),
            ]}
      </div>
    </>
  );
});

export default Search;
