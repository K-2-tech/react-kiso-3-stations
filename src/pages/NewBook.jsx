import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const NewBook = () => {
  const url = "https://railway.bookreview.techtrain.dev";
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [bookurl, setBookUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleBookUrlChange = (e) => setBookUrl(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);
  const onCreateReview = () => {
    const data = {
      title: title,
      url: bookurl,
      detail: detail,
      review: review,
    };

    axios
      .post(`${url}/books`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`リストの作成に失敗しました。${err}`);
      });
  };

  return (
    <div>
      <main className="new-list">
        <h2>レビュー新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="new-review-form">
          <label>書籍のタイトル</label>
          <br />
          <input
            type="text"
            onChange={handleTitleChange}
            className="new-review-title"
          />
          <br />
          <label>書籍のurl</label>
          <br />
          <input
            type="text"
            onChange={handleBookUrlChange}
            className="new-review-url"
          />
          <br />
          <label>書籍の詳細</label>
          <br />
          <input
            type="text"
            onChange={handleDetailChange}
            className="new-review-detail"
          />
          <br />
          <label>書籍のレビュー</label>
          <br />
          <input
            type="text"
            onChange={handleReviewChange}
            className="new-review-review"
          />
          <br />
          <button
            type="button"
            onClick={onCreateReview}
            className="new-review-button"
          >
            作成
          </button>
        </form>
      </main>
    </div>
  );
};
