import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
const Profile = () => {
  const [initialValues, setInitialValues] = useState({
    name: "", // 初期値を空文字列に設定
  });
  const [cookies] = useCookies(["token"]);
  const url = "https://railway.bookreview.techtrain.dev";

  useEffect(() => {
    // 登録済みのユーザー情報を取得して初期値として設定
    axios
      .get(`${url}/users`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then((response) => {
        setInitialValues({
          name: response.data.name,
        });
        console.log(response.data.name);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, [cookies.token, url]);

  const validationSchema = Yup.object({
    name: Yup.string().required("ユーザー名は必須です"),
  });

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    axios
      .put(`${url}/users`, values, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then((response) => {
        console.log("User profile updated:", response.data);
        setStatus({ success: "プロフィールが更新されました" });
      })
      .catch((error) => {
        setStatus({ error: "プロフィールの更新に失敗しました" });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <h1>ユーザー情報</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div>
              <label htmlFor="name">ユーザー名:</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              更新
            </button>
            {status && status.success && <div>{status.success}</div> && (
              <>
                {
                  <>
                    <br></br>
                    <Link to="/">ホームに戻る</Link>
                    <br></br>
                    <Link to="/seticon">アイコンの再設定</Link>
                  </>
                }
              </>
            )}
            {status && status.error && <div>{status.error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
