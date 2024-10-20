import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Bookslist from "../components/Bookslist";
import "./Home.css";
export const Home = () => {
  return (
    <>
      <header className="header">
        <p class="header__description">Homeだよ</p>

        <div className="header__setting">
          <Icon />
          <Link to="/seticon">アイコンを再設定</Link>
          <br></br>
          <Link to="login">サインアウト</Link>
        </div>
      </header>
      <main className="bookslist">
        <Bookslist />
      </main>
    </>
  );
};
