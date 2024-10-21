import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { NotFound } from "./pages/Notfound";
import { Home } from "./pages/Home";
import SetIcon from "./pages/Iconsetpage";
import Profile from "./pages/Profile";
import { NewBook } from "./pages/NewBook";
import Detail from "./pages/Detail";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/seticon" element={<SetIcon />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new" element={<NewBook />} />
        <Route path="/detail/:bookId" element={<Detail />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
