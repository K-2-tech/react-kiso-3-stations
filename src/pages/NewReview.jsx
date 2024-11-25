import React from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
const validationSchema = Yup.object({
  title: Yup.string()
    .max(2000, "タイトルは2000文字以内で入力してください")
    .required("タイトルは必須です"),
  url: Yup.string()
    .url("有効なURLを入力してください")
    .required("URLは必須です"),
  detail: Yup.string()
    .max(2000, "詳細は2000文字以内で入力してください")
    .required("詳細は必須です"),
  review: Yup.string()
    .max(2000, "レビューは2000文字以内で入力してください")
    .required("レビューは必須です"),
});
export const NewReview = () => {
  const url = "https://railway.bookreview.techtrain.dev";
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    const data = {
      title: values.title,
      url: values.url,
      detail: values.detail,
      review: values.review,
    };

    axios
      .post(`${url}/books`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setStatus({ error: `リストの作成に失敗しました。${err}` });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <main className="new-list">
        <h2>レビュー新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <Formik
          initialValues={{
            title: "",
            url: "",
            detail: "",
            review: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="new-review-form">
              <div>
                <label htmlFor="title">書籍のタイトル</label>
                <br />
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="new-review-title"
                />
                <ErrorMessage name="title" component="div" />
              </div>
              <div>
                <label htmlFor="url">書籍のURL</label>
                <br />
                <Field
                  type="text"
                  id="url"
                  name="url"
                  className="new-review-url"
                />
                <ErrorMessage name="url" component="div" />
              </div>
              <div>
                <label htmlFor="detail">書籍の詳細</label>
                <br />
                <Field
                  type="text"
                  id="detail"
                  name="detail"
                  className="new-review-detail"
                />
                <ErrorMessage name="detail" component="div" />
              </div>
              <div>
                <label htmlFor="review">書籍のレビュー</label>
                <br />
                <Field
                  type="text"
                  id="review"
                  name="review"
                  className="new-review-review"
                />
                <ErrorMessage name="review" component="div" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="new-review-button"
              >
                作成
              </button>
              {status && status.error && <div>{status.error}</div>}
            </Form>
          )}
        </Formik>
        <Link to="/">ホームに戻る</Link>
      </main>
    </div>
  );
};
