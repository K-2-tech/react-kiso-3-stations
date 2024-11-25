import { useParams, useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const Detail = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [cookies] = useCookies();
  const status = useSelector((state) => state.books.status);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [bookurl, setBookUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const url = "https://railway.bookreview.techtrain.dev";
  console.log(bookId);
  useEffect(() => {
    const fetchBookData = () => {
      axios
        .get(`${url}/books/${bookId}`, {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
          path: { id: { bookId } },
        })
        .then((res) => {
          console.log(res.data);
          const bookData = res.data;
          setTitle(bookData.title);
          setBookUrl(bookData.url);
          setDetail(bookData.detail);
          setReview(bookData.review);
        })
        .catch((err) => {
          setErrorMessage(`更新に失敗しました。${err}`);
        });
    };
    if (cookies.token && bookId) {
      fetchBookData();
    } else {
      navigate("/login");
    }
  }, [cookies.token, bookId]);
  return (
    <>
      <p>詳細ページ</p>
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>Error: {errorMessage}</div>}
      <ul>
        <li>本のタイトル:{title}</li>
        <li>本のリンク:{bookurl}</li>
        <li>本の詳細:{detail}</li>
        <li>本のレビュー:{review}</li>
      </ul>
      <Link to="/">ホームに戻る</Link>
    </>
  );
};
export default Detail;
