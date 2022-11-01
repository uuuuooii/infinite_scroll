import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Detail({}) {
  const [detail, setDetail] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://recruit-api.yonple.com/recruit/354412/a-posts/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setDetail(res);
      });
  }, []);

  return (
    <div>
      <div>{detail.title}</div>
      <div>{detail.content}</div>
    </div>
  );
}

export default Detail;
