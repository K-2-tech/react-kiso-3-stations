// src/features/books/BooksList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, incrementOffset, decrementOffset } from "../booksSlice"; // 必要なアクションとスライスをインポート
import { useCookies } from "react-cookie";

const Bookslist = () => {
  const dispatch = useDispatch(); // アクションを送信するためのdispatch関数を取得
  const [cookies] = useCookies(["token"]);
  const books = useSelector((state) => state.books.books); // 書籍のリストをストアから取得
  const offset = useSelector((state) => state.books.offset); // 現在のオフセット（ページ位置）をストアから取得
  const status = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    if (cookies.token) {
      dispatch(fetchBooks({ offset, token: cookies.token }));
    }
  }, [dispatch, offset, cookies.token]);

  return (
    <div>
      <h2>書籍一覧</h2>
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>Error: {error}</div>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
      <button onClick={() => dispatch(decrementOffset())}>前へ</button>
      <button onClick={() => dispatch(incrementOffset())}>次へ</button>
    </div>
  );
};

export default Bookslist;
