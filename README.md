# 📄 Documentation

* [`api/register`](#api-register) => text(register an account)
* [`api/registers`](# [POST] /api/register) => text(register an account)
---

## `api/register`

### ▶️ Description  
Registers a new user account by accepting user details and returning a confirmation response.

---

### 📤 Request Payload

The request body must be a JSON object containing the following fields:

| Field            | Type   | Required | Description                               |
|------------------|--------|----------|-----------------------------------------|
| `email`          | string | Yes      | User's valid email address.              |
| `username`       | string | Yes      | Desired username for the account.       |
| `password`       | string | Yes      | User's password (securely hashed).      |
| `contact_number` | string | No       | User's phone number including country code. |
| `date_of_birth`  | string | No       | User's birth date in `YYYY-MM-DD` format. |
| `suffix`         | string | No       | Name suffix (e.g., Jr., Sr., III).      |
| `last_name`      | string | Yes      | User's family name.                      |
| `first_name`     | string | Yes      | User's given name.                       |
| `year_level`     | string | No       | Current academic year or standing.      |
| `course`         | string | No       | Academic course or program enrolled.    |
| `idNumber`       | string | No       | Institution-issued identification number.|

---

### 💡 Notes  
- All required fields must be included to successfully create an account.  
- Passwords should comply with security best practices (e.g., minimum length, complexity).  
- The endpoint expects JSON format; content type must be set to `application/json`.  

---

---

### [POST] /api/register

### ▶️ Description  
Registers a new user account by accepting user details and returning a confirmation response.

---

### 📤 Request Payload

The request body must be a JSON object containing the following fields:

| Field            | Type   | Required | Description                               |
|------------------|--------|----------|-----------------------------------------|
| `email`          | string | Yes      | User's valid email address.              |
| `username`       | string | Yes      | Desired username for the account.       |
| `password`       | string | Yes      | User's password (securely hashed).      |
| `contact_number` | string | No       | User's phone number including country code. |
| `date_of_birth`  | string | No       | User's birth date in `YYYY-MM-DD` format. |
| `suffix`         | string | No       | Name suffix (e.g., Jr., Sr., III).      |
| `last_name`      | string | Yes      | User's family name.                      |
| `first_name`     | string | Yes      | User's given name.                       |
| `year_level`     | string | No       | Current academic year or standing.      |
| `course`         | string | No       | Academic course or program enrolled.    |
| `idNumber`       | string | No       | Institution-issued identification number.|

---

### 💡 Notes  
- All required fields must be included to successfully create an account.  
- Passwords should comply with security best practices (e.g., minimum length, complexity).  
- The endpoint expects JSON format; content type must be set to `application/json`.  

---
