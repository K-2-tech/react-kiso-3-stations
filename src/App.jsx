import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { NotFound } from "./pages/Notfound";
import { Home } from "./pages/Home";
import SetIcon from "./pages/Iconsetpage";
import Profile from "./pages/Profile";
import { NewReview } from "./pages/NewReview";
import Detail from "./pages/Detail";
import EditReview from "./pages/EditReview";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/seticon" element={<SetIcon />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new" element={<NewReview />} />
        <Route path="/detail/:bookId" element={<Detail />} />
        <Route path="/edit/:bookId" element={<EditReview />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
