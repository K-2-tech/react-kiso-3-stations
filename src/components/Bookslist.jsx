// src/features/books/BooksList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchBooks,
  fetchPublicBooks,
  incrementOffset,
  decrementOffset,
} from "../booksSlice";
import "./Bookslist.css";
import LoadingModal from "./LoadingModal";
const Bookslist = () => {
  const dispatch = useDispatch(); // アクションを送信するためのdispatch関数を取得
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const books = useSelector((state) => state.books.books); // 書籍のリストをストアから取得
  const offset = useSelector((state) => state.books.offset); // オフセットてのは現在のページ位置のこと
  const status = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);
  const auth = useSelector((state) => state.auth.isSignIn);
  //ProtectedRoutesコンポーネント作る必要なかったねー
  useEffect(() => {
    if (cookies.token) {
      dispatch(fetchBooks({ offset, token: cookies.token }));
    } else {
      dispatch(fetchPublicBooks({ offset }));
    }
  }, [dispatch, offset, cookies.token]);

  return (
    <div>
      <h2>書籍一覧</h2>
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>Error: {error}</div>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link className="title" to={`/detail/${book.id}`}>
              {book.title}
            </Link>
            {auth && (
              <button onClick={() => navigate(`/edit/${book.id}`)}>
                編集/削除
              </button>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(decrementOffset())}>前へ</button>
      <button onClick={() => dispatch(incrementOffset())}>次へ</button>
    </div>
  );
};

export default Bookslist;
