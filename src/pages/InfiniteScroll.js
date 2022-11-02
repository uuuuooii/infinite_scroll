import React from "react";
import { useState, useEffect, forwardRef } from "react";
import Search from "../components/search/Search";
import { useInView } from "react-intersection-observer";
import "../styles/Infinite.css";

function InfiniteScroll() {
  const [aPost, setAPost] = useState({
    items: [],
    page: 0,
  });
  const [bPost, setBPost] = useState({
    items: [],
    page: 0,
  });

  //react-Intersection-Observer 라이브러리이용
  const [ref, inView] = useInView();
  const [loading, setLoad] = useState(false);

  //category
  const [category, setCategory] = useState("a");

  const fetchAData = async (page) => {
    setLoad(true); //로딩 시작

    const response = await fetch(
      `https://recruit-api.yonple.com/recruit/354412/a-posts?page=${page}`
    );
    const data = await response.json();
    setAPost((prev) => {
      return { ...prev, items: [...prev.items, ...data] };
    }); //리스트 추가
    setLoad(false); //로딩 종료
  };

  const fetchBData = async (page) => {
    setLoad(true); //로딩 시작

    const response = await fetch(
      `https://recruit-api.yonple.com/recruit/354412/b-posts?page=${page}`
    );
    const data = await response.json();
    setBPost((prev) => {
      return { ...prev, items: [...prev.items, ...data] };
    }); //리스트 추가
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
    if (category === "a") {
      if (aPost.page < 10) fetchAData(aPost.page);
      if (bPost.page === 0) fetchBData(bPost.page);
    } else {
      if (bPost.page < 10) fetchBData(bPost.page);
    }
  }, [aPost.page, bPost.page]);

  //react-Intersection-Observer 라이브러리 이용
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면 page+=1
    if (inView && !loading) {
      setLoad(true);
      setTimeout(() => {
        if (category === "a")
          setAPost((prev) => {
            return { ...prev, page: prev.page + 1 };
          });
        else {
          setBPost((prev) => {
            return { ...prev, page: prev.page + 1 };
          });
        }
        setLoad(0);
      }, 500);
    }
  }, [inView]);

  useEffect(() => {
    console.log("test");
    console.log(aPost.items);
    console.log(bPost.items);
  }, []);

  return (
    <div>
      <div className="color"></div>

      <Search
        aItems={aPost.items}
        bItems={bPost.items}
        category={category}
        setCategory={setCategory}
        ref={ref}
        // categoryList={categoryList}
        // fetchData2={fetchData2}
        // items2={items2}
        // setItems2={setItems2}
        // setCategory={setCategoryA}
      />
      <div ref={ref}>This is Target.</div>
    </div>
  );
}

export default InfiniteScroll;
