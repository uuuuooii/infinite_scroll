import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import Search from "../components/search/Search";
import "../styles/Infinite.css";

function InfiniteScroll() {
  const categoryList = ["A Posts", "B Posts"];
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(0);

  const fetchData = async (page) => {
    setLoad(true); //로딩 시작
    const response = await fetch(
      `https://recruit-api.yonple.com/recruit/354412/a-posts?page=${page}`
    );
    const data = await response.json();
    setItems((prev) => [...prev, ...data]); //리스트 추가
    setLoad(false); //로딩 종료
  };
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (page < 10) fetchData(page);
  }, [page]);

  return (
    <div>
      <div className="color"></div>

      <Search
        items={items}
        setItems={setItems}
        categoryList={categoryList}
        // obsRef={obsRef}
      />
    </div>
  );
}

export default InfiniteScroll;
