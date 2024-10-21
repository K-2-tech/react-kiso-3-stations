/////
import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const url = "https://railway.bookreview.techtrain.dev";
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("ユーザー名は必須です"),
    email: Yup.string()
      .email("正しいメールアドレスを入力してください")
      .required("メールアドレスは必須です"),
    password: Yup.string()
      .min(6, "パスワードは6文字以上である必要があります")
      .required("パスワードは必須です"),
  });

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    axios
      .post(`${url}/users`, values)
      .then((response) => {
        const token = response.data.token;
        console.log(response.data);
        setCookie("token", token);
        navigate("/seticon");
      })
      .catch((error) => {
        setStatus(error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (auth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>サインアップ</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div>
              <label htmlFor="name">ユーザー名:</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
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
              Sign Up
            </button>
            {status && <p>{status}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
