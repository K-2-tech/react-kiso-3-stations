import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { NotFound } from "./pages/Notfound";
import { Home } from "./pages/Home";
import SetIcon from "./pages/Iconsetpage";
const ProtectedRoutes = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/seticon" element={<SetIcon />} />
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
