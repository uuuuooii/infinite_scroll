import React from "react";
import { useState, useEffect } from "react";

function Detail({ id }) {
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    fetch(`https://recruit-api.yonple.com/recruit/354412/b-posts/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setDetail(res);
        // console.log(res);
      });
  }, []);

  return;
}

export default Detail;
