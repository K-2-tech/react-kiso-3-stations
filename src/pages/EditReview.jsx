import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

const EditReview = () => {
  const url = "https://railway.bookreview.techtrain.dev";
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [initialValues, setInitialValues] = useState({
    title: "",
    url: "",
    detail: "",
    review: "",
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // データの読み込み中に表示するメッセージ
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/books/${bookId}`, {
          headers: { authorization: `Bearer ${cookies.token}` },
        });
        const bookData = res.data;
        setInitialValues({
          title: bookData.title,
          url: bookData.url,
          detail: bookData.detail,
          review: bookData.review,
        });
        setLoading(false);
      } catch (err) {
        setErrorMessage(`更新に失敗しました。${err}`);
        setLoading(false);
      }
    };
    fetchData();
  }, [bookId, cookies.token, url]);

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    axios
      .put(`${url}/books/${bookId}`, values, {
        headers: { authorization: `Bearer ${cookies.token}` },
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

  const handleDelete = () => {
    axios
      .delete(`${url}/books/${bookId}`, {
        headers: { authorization: `Bearer ${cookies.token}` },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`レビューの削除に失敗しました。${err}`);
      });
  };

  if (loading) {
    return <div>Loading...</div>; // データ読み込み中の表示
  }

  return (
    <div>
      <main className="new-list">
        <h2>レビュー編集</h2>
        <p className="error-message">{errorMessage}</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
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
                更新
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="new-review-button"
              >
                レビューを削除
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

export default EditReview;
