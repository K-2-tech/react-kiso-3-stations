import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signIn, signOut } from "../authSlice";

function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const url = "https://railway.bookreview.techtrain.dev";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //もしtokenがあったら、tokenを削除、stateを更新
  if (cookies.token) {
    removeCookie("token", { path: "/" });
    dispatch(signOut());
  }
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("正しいメールアドレスを入力してください")
      .required("メールアドレスは必須です"),
    password: Yup.string().required("パスワードは必須です"),
  });

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    axios
      .post(`${url}/signin`, values)
      .then((response) => {
        setCookie("token", response.data.token, { path: "/" });
        dispatch(signIn());
        navigate("/");
      })
      .catch((error) => {
        setStatus(error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <h3>
        アカウントを持っていない方は<Link to="/signup">作成</Link>
      </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div>
              <label htmlFor="email">メールアドレス:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="password">パスワード:</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              ログイン
            </button>
            <br />
            <Link to="/">ログインせずにホームへ</Link>
            {status && <div>{status}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
