const { test, expect } = require("@playwright/test");

test("should display error message when email is invalid", async ({ page }) => {
  // ログインページを開く
  await page.goto("http://localhost:5173");

  // メールアドレスに無効な値を入力する
  await page.fill("#email", "invalidEmail");

  // パスワードに有効な値を入力する
  await page.fill("#password", "validPassword");

  // ログインボタンをクリックする
  await page.click('button[type="submit"]');

  // エラーメッセージが表示されることを確認する
  await expect(page.locator(".error-message")).toHaveText(
    "正しいメールアドレスを入力してください",
    { timeout: 20000 }
  );
});

test("should not display error message when email is valid", async ({
  page,
}) => {
  // ログインページを開く
  await page.goto("http://localhost:5173");

  // メールアドレスに有効な値を入力する
  await page.fill("#email", "valid@example.com");

  // パスワードに有効な値を入力する
  await page.fill("#password", "validPassword");

  // ログインボタンをクリックする
  await page.click('button[type="submit"]');

  // エラーメッセージが表示されないことを確認する
  await expect(page.locator(".error-message")).not.toBeVisible();
});
