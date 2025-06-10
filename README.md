# 📄 Documentation

- [`[POST] /api/register`](#post-apiregister) => text(register an account)

---

### [POST] /api/register

# ▶️ Description

Registers a new user account by accepting user details and returning a confirmation response.

---

# 📤 Request Payload

The request body must be a JSON object containing the following fields:

# UserStudentSchema Fields

- **idNumber**: `string` => required
- **email**: `string` => required
- **password**: `string` => required
- **role**: `string` => not required (default: 'student')
- **isVerified**: `boolean` => not required (default: false)
- **isActive**: `boolean` => not required (default: false)
- **course**: `string` => required
- **block**: `string` => not required
- **year_level**: `number` => required
- **first_name**: `string` => required
- **last_name**: `string` => required
- **middle_name**: `string` => not required
- **suffix**: `string` => required
- **gender**: `string` => not required (default: 'other')
- **date_of_birth**: `date` => required
- **address**: `string` => not required
- **contact_number**: `string` => required
- **facebook**: `string` => not required

---

## 💡 Notes

- All required fields must be included to successfully create an account.
- Passwords should comply with security best practices (e.g., minimum length, complexity).
- The endpoint expects JSON format; content type must be set to `application/json`.

---
