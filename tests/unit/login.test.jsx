// src/tests/App.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import App from "../../src/App";

test("Login component renders form and button", () => {
  render(<App />);

  // メールアドレスの入力フィールドを確認
  const emailInput = screen.getByLabelText(/メールアドレス/i);
  expect(emailInput).toBeInTheDocument();

  // パスワードの入力フィールドを確認
  const passwordInput = screen.getByLabelText(/パスワード/i);
  expect(passwordInput).toBeInTheDocument();

  // ログインボタンを確認
  const loginButton = screen.getByRole("button", { name: /ログイン/i });
  expect(loginButton).toBeInTheDocument();

  // ログインフォーム全体を確認
  const loginForm = screen.getByTestId("login-form");
  expect(loginForm).toBeVisible();
});
