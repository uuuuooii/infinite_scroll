import React from "react";
import { useState, useEffect, forwardRef } from "react";
import Search from "../components/search/Search";
import { useInView } from "react-intersection-observer";
import "../styles/Infinite.css";

function InfiniteScroll() {
  //scroll 계산
  const categoryList = ["A Posts", "B Posts"];
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);

  //react-Intersection-Observer 라이브러리이용
  const [ref, inView] = useInView();
  const [loading, setLoad] = useState(false);

  const fetchData = async (page) => {
    setLoad(true); //로딩 시작
    const response = await fetch(
      `https://recruit-api.yonple.com/recruit/354412/a-posts?page=${page}`
    );
    const data = await response.json();
    setItems((prev) => [...prev, ...data]); //리스트 추가
    setLoad(false); //로딩 종료
  };

  //scroll 계산
  // const handleScroll = () => {
  //   const scrollHeight = document.documentElement.scrollHeight;
  //   const scrollTop = document.documentElement.scrollTop;
  //   const clientHeight = document.documentElement.clientHeight;

  //   if (scrollTop + clientHeight >= scrollHeight) {
  //     setPage((page) => page + 1);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    if (page < 10) fetchData(page);
  }, [page]);

  //react-Intersection-Observer 라이브러리이용
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면 page+=1
    if (inView && !loading) {
      setLoad(true);
      setTimeout(() => {
        setPage((prevState) => prevState + 1);
        setLoad(0);
      }, 500);
    }
  }, [inView]);

  return (
    <div>
      <div className="color"></div>

      <Search
        items={items}
        setItems={setItems}
        categoryList={categoryList}
        ref={ref}
      />
      <div ref={ref}>This is Target.</div>
    </div>
  );
}

export default InfiniteScroll;
