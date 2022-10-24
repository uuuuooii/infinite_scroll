import React from "react";
import { useState, useEffect } from "react";
import "../styles/Infinite.css";

function InfiniteScroll() {
  const [categoryA, setCategoryA] = useState([]);
  const [categoryB, setCategoryB] = useState([]);
  const categoryList = ["A Posts", "B Posts"];
  const item = ["ddddd", "ddddd", "ddddd", "ddddd"];

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://recruit-api.yonple.com/recruit/354412/b-posts?page=0")
      .then((res) => res.json())
      .then((res) => {
        setCategoryA(res);
        console.log(res);
      });
  }, []);

  useEffect(() => {
    fetch("https://recruit-api.yonple.com/recruit/354412/a-posts?page=0")
      .then((res) => res.json())
      .then((res) => {
        setCategoryB(res);
        console.log(res);
      });
  }, []);

  return (
    <div>
      <p>InfiniteScroll</p>
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
        {categoryA.map((category) => {
          return (
            <div key={category.id}>
              <p>
                {category.title}, <br /> {category.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InfiniteScroll;
