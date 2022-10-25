import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Search({ categoryA, setCategoryA, categoryList }) {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = categoryA.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(categoryA);
    }
  };

  return (
    <>
      <div>
        <FaSearch />
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          onChange={(e) => searchItems(e.target.value)}
        />
      </div>
      <div className="title">
        {categoryList.map((item) => {
          return (
            <button
              key={item}
              className="button"
              onClick={() => setCategoryA()}
            >
              {item}
            </button>
          );
        })}
      </div>
      <hr />
      <div>
        {searchInput.length > 1
          ? filteredResults.map((item) => {
              return (
                <div>
                  <div>
                    <div>{item.title}</div> <br />
                    <div>{item.content}</div>
                  </div>
                </div>
              );
            })
          : categoryA.map((category) => {
              return (
                <div key={category.id}>
                  <div>{category.title}</div> <br />
                  <div>{category.content}</div>
                </div>
              );
            })}
      </div>
      <div></div>
    </>
  );
}

export default Search;
