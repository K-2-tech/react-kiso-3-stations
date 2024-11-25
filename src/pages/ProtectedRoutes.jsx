import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ProtectedRoutes = ({ children }) => {
  const auth = useSelector((state) => state.auth.isSignIn);
  console.log(auth);
  if (!auth) {
    console.log("you are not authorized");

    return <Link to="/login">ログイン</Link>;
  }

  return (
    <>
      <>{children}</>;{console.log("you are authorized")}
    </>
  );
};
export default ProtectedRoutes;
