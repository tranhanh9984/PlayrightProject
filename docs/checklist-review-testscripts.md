# CHECKLIST REVIEW PLAYWRIGHT TEST SCRIPT

## 1. Test Design & Coverage

### Requirement Coverage
- [ ] Script map với User Story/Requirement nào?
- [ ] Cover đúng Acceptance Criteria?
- [ ] Cover Happy Path?
- [ ] Cover Negative Cases?
- [ ] Cover Boundary Cases?
- [ ] Cover Business Rules?

### Traceability
- [ ] Test name có thể truy ngược Requirement?
- [ ] Có Test Case ID/User Story ID không?

Ví dụ:

```ts
test('[US-102] User can login successfully', async () => {})
```

---

## 2. Test Naming Convention

### Test Name
- [ ] Tên test rõ ràng?
- [ ] Mô tả hành vi người dùng?
- [ ] Không dùng tên chung chung?

❌
```ts
test('Login Test')
```

❌
```ts
test('TC01')
```

✅
```ts
test('User can login with valid credentials')
```

---

## 3. Code Readability

### Readability
- [ ] Code dễ đọc?
- [ ] Dễ hiểu với tester khác?
- [ ] Có comment cho logic phức tạp?

### Formatting
- [ ] Format thống nhất?
- [ ] Tuân thủ ESLint/Prettier?

---

## 4. Page Object Model (POM)

### POM Usage
- [ ] Không hard-code locator trong test?
- [ ] Locator được đưa vào Page Object?

❌
```ts
await page.locator('#username').fill('admin');
```

✅
```ts
await loginPage.enterUsername('admin');
```

---

## 5. Locator Quality

### Stable Locator
- [ ] Ưu tiên `getByRole()`?
- [ ] Ưu tiên `getByTestId()`?
- [ ] Locator ổn định?

**Ưu tiên:**
```
getByRole()
getByLabel()
getByTestId()
```

**Hạn chế:**
```
xpath
nth-child
absolute xpath
```

---

## 6. Hard-coded Data

### Test Data
- [ ] Có hard-code dữ liệu không?
- [ ] Dữ liệu được externalize?

❌
```ts
username = 'admin'
password = '123456'
```

✅
```ts
config.user.username
```

---

## 7. Reusability

### Reuse Function
- [ ] Có code duplicate?
- [ ] Common action được tái sử dụng?

Ví dụ:

❌
```
Login lặp lại 20 lần.
```

✅
```ts
await loginPage.login(user);
```

---

## 8. Wait Strategy

### Wait Handling
- [ ] Không dùng `waitForTimeout()`?

❌
```ts
await page.waitForTimeout(5000);
```

✅
```ts
await expect(button).toBeVisible();
```

Hoặc:
```ts
await page.waitForLoadState('networkidle');
```

---

## 9. Assertion Quality

### Assertion
- [ ] Có verify kết quả không?
- [ ] Assert đủ mạnh?

❌
```ts
await page.click('Login');
// Không verify gì.
```

✅
```ts
await expect(page).toHaveURL('/dashboard');
```

---

## 10. Test Independence

### Độc lập
- [ ] Test chạy riêng được?
- [ ] Không phụ thuộc test khác?

❌
```
TC02 phụ thuộc TC01 tạo user
```

✅
```
Mỗi test tự setup data.
```

---

## 11. Test Stability

### Flaky Prevention
- [ ] Không phụ thuộc timing?
- [ ] Không phụ thuộc thứ tự chạy?
- [ ] Không phụ thuộc dữ liệu môi trường?

---

## 12. Error Handling

### Failure Investigation
- [ ] Có screenshot khi fail?
- [ ] Có trace?
- [ ] Có video nếu cần?

Ví dụ:
```ts
use: {
  screenshot: 'only-on-failure',
  trace: 'retain-on-failure'
}
```

---

## 13. Parallel Execution

### Parallel Safe
- [ ] Chạy song song được?
- [ ] Không dùng shared data?

Ví dụ:

❌
```ts
user@test.com // cho mọi test.
```

✅
```ts
user_${Date.now()}@test.com
```

---

## 14. Test Data Management

### Data Lifecycle
- [ ] Setup data rõ ràng?
- [ ] Cleanup data rõ ràng?

Ví dụ:
```ts
beforeEach()
afterEach()
```

---

## 15. Environment Management

### Config
- [ ] Không hard-code URL?

❌
```ts
https://uat.company.com
```

✅
```ts
process.env.BASE_URL
```

---

## 16. Security Review

### Sensitive Data
- [ ] Không commit password?
- [ ] Không commit token?
- [ ] Không commit API key?

---

## 17. Logging

### Debugging
- [ ] Có log cần thiết?
- [ ] Log hỗ trợ debug?

Ví dụ:
```ts
console.log(`Create user: ${email}`);
```

hoặc
```ts
test.step()
```

---

## 18. Performance of Test

### Runtime
- [ ] Có thao tác dư thừa?
- [ ] Có login lặp lại không cần thiết?

Ví dụ:

Nên dùng:
```ts
storageState
```
thay vì login mỗi test.

---

## 19. Playwright Best Practices

### Framework Usage
- [ ] Sử dụng fixtures?
- [ ] Sử dụng `test.step()`?
- [ ] Sử dụng `expect` đúng cách?
- [ ] Sử dụng projects cho cross-browser?

---

## 20. CI/CD Readiness

### Pipeline Ready
- [ ] Chạy headless được?
- [ ] Chạy trên Jenkins/GitLab CI được?
- [ ] Không phụ thuộc local machine?

---

## REVIEW SCORECARD (Dùng cho Lead)

| Tiêu chí | Điểm |
|---|---|
| Coverage | 20 |
| POM | 10 |
| Locator | 15 |
| Assertion | 15 |
| Wait Strategy | 10 |
| Reusability | 10 |
| Stability | 10 |
| Security | 5 |
| CI/CD Ready | 5 |

### Đánh giá

| Điểm | Kết quả |
|---|---|
| 90-100 | Approve |
| 80-89 | Minor Fix |
| 70-79 | Rework |
| <70 | Reject |

---

## Top 10 lỗi Playwright mà reviewer nên bắt ngay

1. Dùng `waitForTimeout()`
2. Hard-code locator
3. Hard-code URL
4. Hard-code user/password
5. Không có assertion
6. XPath dài
7. Duplicate code
8. Test phụ thuộc lẫn nhau
9. Không dùng Page Object Model
10. Không có screenshot/trace khi fail
