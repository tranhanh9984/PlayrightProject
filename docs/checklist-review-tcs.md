# CHECKLIST REVIEW TEST CASE

---

## 1. Requirement Coverage

### Kiểm tra độ bao phủ

- [ ] Test Case đã cover toàn bộ **Business Requirement** chưa?
- [ ] Cover **Functional Requirement** chưa?
- [ ] Cover **Non-Functional Requirement** nếu có chưa?
- [ ] Cover **Acceptance Criteria** chưa?
- [ ] Cover **User Story** chưa?
- [ ] Cover các **Rule nghiệp vụ** chưa?

### Truy vết (Traceability)

- [ ] Có mapping **Requirement ↔ Test Case** không?
- [ ] Có Requirement nào **chưa được test** không?
- [ ] Có Test Case nào **không liên quan** Requirement không?

---

## 2. Test Case Structure

### Thông tin cơ bản

- [ ] Test Case ID đúng format?
- [ ] Test Case Title rõ ràng?
- [ ] Priority được xác định?
- [ ] Preconditions đầy đủ?

### Nội dung

- [ ] Step thực hiện dễ hiểu?
- [ ] Step không bị thiếu?
- [ ] Step không bị dư thừa?

### Kết quả

- [ ] Expected Result rõ ràng?
- [ ] Có thể verify được?
- [ ] Không mơ hồ?

**Ví dụ:**

> ❌ **Sai:**
>
> Hệ thống hiển thị đúng

> ✅ **Đúng:**
>
> Hiển thị thông báo: **"Login successful"**

---

## 3. Positive Test Coverage

### Happy Path

- [ ] Luồng chính đã được cover?
- [ ] User thao tác đúng quy trình?
- [ ] Dữ liệu hợp lệ?

**Ví dụ Login:**

- [ ] Username đúng
- [ ] Password đúng

---

## 4. Negative Test Coverage

### Dữ liệu không hợp lệ

- [ ] Required field?
- [ ] Empty value?
- [ ] Null value?
- [ ] Invalid format?
- [ ] Invalid business rule?

**Ví dụ Email:**

| Input         | Kết quả mong đợi |
|---------------|-------------------|
| `abc`         | Invalid           |
| `abc@`        | Invalid           |
| `@gmail.com`  | Invalid           |

---

## 5. Boundary Value Analysis

### Kiểm tra biên

**Ví dụ Password (Min = 8, Max = 20):**

| Giá trị    | Loại       | Kết quả mong đợi |
|------------|------------|-------------------|
| 7 ký tự    | Below Min  | Invalid           |
| 8 ký tự    | Min        | Valid             |
| 9 ký tự    | Above Min  | Valid             |
| 19 ký tự   | Below Max  | Valid             |
| 20 ký tự   | Max        | Valid             |
| 21 ký tự   | Above Max  | Invalid           |

- [ ] Đã cover đủ các giá trị biên?

---

## 6. Equivalence Partitioning

### Đại diện nhóm dữ liệu

**Ví dụ Tuổi:**

| Nhóm    | Khoảng giá trị | Kết quả mong đợi |
|---------|-----------------|-------------------|
| Valid   | 18 ~ 60         | Chấp nhận         |
| Invalid | < 18            | Từ chối            |
| Invalid | > 60            | Từ chối            |

- [ ] Có đại diện từng nhóm chưa?

---

## 7. Business Rule Validation

### Logic nghiệp vụ

- [ ] Cover tất cả rule?
- [ ] Cover exception case?
- [ ] Cover special case?

**Ví dụ:**

| Loại khách | Rule       |
|------------|------------|
| Khách VIP  | Giảm 10%   |
| Khách VVIP | Giảm 20%   |

- [ ] Đã test cả 2 loại khách?

---

## 8. Integration Coverage

### Tích hợp hệ thống

- [ ] API liên quan đã test?
- [ ] Service liên quan đã test?
- [ ] DB interaction đã test?

**Ví dụ luồng tích hợp:**

```
Order Service → Payment Service → Notification Service
```

- [ ] Cover đầy đủ luồng?

---

## 9. Data Validation

### Kiểm tra dữ liệu

- [ ] Dữ liệu lưu DB đúng?
- [ ] Dữ liệu update đúng?
- [ ] Dữ liệu delete đúng?

**Ví dụ Create User:**

- [ ] DB insert đúng record?
- [ ] Không lưu dữ liệu thừa?

---

## 10. UI Validation

### Giao diện

- [ ] Label đúng?
- [ ] Message đúng?
- [ ] Format đúng?

**Ví dụ kiểm tra format:**

- [ ] Currency format (VD: `1,000,000 VND`)
- [ ] Date format (VD: `DD/MM/YYYY`)
- [ ] Number format (VD: `1,234.56`)

---

## 11. Error Handling

### Xử lý lỗi

- [ ] System Error?
- [ ] Network Error?
- [ ] API Timeout?
- [ ] DB Error?

**Ví dụ:**

- [ ] Payment timeout → Hiển thị thông báo lỗi phù hợp
- [ ] OTP expired → Yêu cầu gửi lại OTP

---

## 12. Security Coverage

### Bảo mật

- [ ] SQL Injection?
- [ ] XSS (Cross-Site Scripting)?
- [ ] Authentication?
- [ ] Authorization?

**Ví dụ:**

- [ ] User A **không** xem được dữ liệu User B
- [ ] Input chứa `<script>` bị sanitize
- [ ] Input chứa `' OR 1=1 --` không gây lỗi

---

## 13. Regression Impact

### Ảnh hưởng chức năng khác

- [ ] Feature mới ảnh hưởng module nào?
- [ ] Đã có test case regression chưa?

---

## 14. Reusability

### Tái sử dụng

- [ ] Test Case bị trùng?
- [ ] Có thể merge?
- [ ] Có thể dùng chung data?

---

## 15. Test Data

### Dữ liệu kiểm thử

- [ ] Test Data đầy đủ?
- [ ] Data hợp lệ?
- [ ] Data đặc biệt?

**Ví dụ các loại data cần test:**

- [ ] Tiếng Việt (có dấu)
- [ ] Tiếng Anh
- [ ] Ký tự đặc biệt (`!@#$%^&*`)
- [ ] Unicode / Emoji

---

## 16. Automation Readiness

> Nếu dự kiến automate:

- [ ] Step rõ ràng, không mơ hồ?
- [ ] Data độc lập, không phụ thuộc test khác?
- [ ] Kết quả dễ verify bằng code?
- [ ] Có thể chạy lặp lại (idempotent)?

---

## 17. Review Quality Score

> Gợi ý cho Lead / Reviewer chấm điểm:

| #  | Tiêu chí              | Điểm tối đa |
|----|-----------------------|--------------|
| 1  | Requirement Coverage  | 20           |
| 2  | Positive Cases        | 10           |
| 3  | Negative Cases        | 15           |
| 4  | Boundary Cases        | 10           |
| 5  | Business Rules        | 15           |
| 6  | Data Validation       | 10           |
| 7  | Security              | 10           |
| 8  | Maintainability       | 10           |
|    | **Tổng**              | **100**      |

### Đánh giá:

| Điểm       | Kết quả        |
|------------|----------------|
| >= 90      | ✅ **Approve**  |
| 80 - 89    | ⚠️ **Minor Update** |
| < 80       | ❌ **Rework**   |
