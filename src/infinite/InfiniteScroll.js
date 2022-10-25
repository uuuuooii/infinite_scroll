import React from "react";
import { useState, useEffect } from "react";
import Search from "../search/Search";
import axios from "axios";
import "../styles/Infinite.css";

function InfiniteScroll() {
  const [categoryA, setCategoryA] = useState([]);
  const [categoryB, setCategoryB] = useState([]);
  const categoryList = ["A Posts", "B Posts"];
  const item = ["ddddd", "ddddd", "ddddd", "ddddd"];

  const [loading, setLoading] = useState(false);

  const page = useEffect(() => {
    fetch(`https://recruit-api.yonple.com/recruit/354412/a-posts?${page}`)
      .then((res) => res.json())
      .then((res) => {
        setCategoryA(res);
        // console.log(categoryA);
      });
  }, []);

  // useEffect(() => {
  //   fetch("https://recruit-api.yonple.com/recruit/354412/b-posts?page=0")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setCategoryB(res);
  //       console.log(categoryB);
  //     });
  // }, []);

  return (
    <div>
      <p>InfiniteScroll</p>
      <Search
        categoryA={categoryA}
        setCategoryA={setCategoryA}
        categoryList={categoryList}
      />
    </div>
  );
}

export default InfiniteScroll;
