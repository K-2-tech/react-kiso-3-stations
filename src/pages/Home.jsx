import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Bookslist from "../components/Bookslist";
import ProtectedRoutes from "./ProtectedRoutes";
import "./Home.css";
import { Helmet } from "react-helmet";
export const Home = () => {
  return (
    <>
      <Helmet>
        <title>書籍レビューアプリ</title>
        <meta
          name="description"
          content="このサイトはみんなで書籍のレビューを共有・作成・編集するサイトです"
        />
      </Helmet>
      <header className="header">
        <p className="header__description">Homeだよ</p>

        <div className="header__setting">
          <ProtectedRoutes>
            <Icon />
            <Link to="/profile">ユーザー情報編集</Link>
            <Link to="/seticon">アイコン編集</Link>
            <Link to="/new">書籍レビュー投稿</Link>
            <Link to="/login">ログアウト</Link>
          </ProtectedRoutes>
        </div>
      </header>

      <main className="bookslist">
        <Bookslist />
      </main>
    </>
  );
};
