## Authentication

- [`[POST] /api/auth/register`](#post-apiauthregister) => register an account
- [`[POST] /api/auth/verify`](#post-apiauthverify) => verify an account
- [`[POST] /api/auth/login`](#post-apiauthlogin) => login to the account
- [`[PATCH] /api/auth/update`](#patch-apiauthupdate) => update user profile
- [`[POST] /api/auth/forgot-password`](#post-apiauthforgot-password) => forgot password
- [`[PATCH] /api/auth/reset-password`](#patch-apiauthreset-password) => reset password
- [`[POST] /api/auth/logout`](#post-apiauthlogout) => logout from the account
- [`[POST] /api/auth/refresh`](#post-apiauthrefresh) => refresh authentication token

---

## User Management

- [`[POST] /api/user/`](#post-apiuser) => create a new user
- [`[GET] /api/user/`](#get-apiuser) => get all users
- [`[GET] /api/user/getProfile/:idNumber`](#get-apiusergetprofileidnumber) => get user profile by ID number
- [`[GET] /api/user/getUserById/:uid`](#get-apiusergetuserbyiduid) => get user by UID
- [`[GET] /api/user/current`](#get-apiusercurrent) => get current user profile

---

## Appointment

- [`[POST] /api/appointment/create`](#post-apiappointmentcreate) => create an appointment
- [`[GET] /api/appointment/getAll`](#get-apiappointmentgetall) => get all appointments
- [`[GET] /api/appointment/getById/:appointmentId`](#get-apiappointmentgetbyidappointmentid) => get appointment by ID
- [`[PATCH] /api/appointment/update`](#patch-apiappointmentupdate) => update an appointment
- [`[PATCH] /api/appointment/cancel`](#patch-apiappointmentcancel) => cancel an appointment
- [`[PUT] /api/appointment/accept`](#put-apiappointmentaccept) => accept an appointment
- [`[PUT] /api/appointment/verify`](#put-apiappointmentverify) => verify an appointment

---

## Config

- [`[POST] /api/config/create`](#post-apiconfigcreate) => create a new appointment configuration
- [`[PATCH] /api/config/update`](#patch-apiconfigupdate) => update appointment configuration

---

## `[POST]` /api/auth/register

### Description

Registers a new user account by accepting user details and returning a confirmation response.

### Request Payload

The request body must be a JSON object containing the following fields:

#### Fields

- **idNumber**: `string` => required
- **email**: `string` => required
- **password**: `string` => required
- **role**: `string` => required (default: 'student')
- **verified**: `boolean` => not required (default: false)
- **active**: `boolean` => not required (default: false)
- **first_name**: `string` => required
- **last_name**: `string` => required
- **middle_name**: `string` => not required
- **suffix**: `string` => not required
- **gender**: `string` => not required `[accept: male, female, and other]` (default: 'other')
- **date_of_birth**: `date` => required
- **address**: `string` => not required
- **contact_number**: `string` => required
- **facebook**: `string` => not required
- **other_info**: `[object]` => fields is base on the role see in the table below:

---

The `other_info` object will vary depending on the role chosen. Below are the fields for each role:

  <style>
    table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ddd;
        }
        th {
           padding: 10px;
            text-align: center;
            border: 1px solid #ddd;
        }
    </style>

<table>
    <tr>
        <th>Role</th>
        <th>Fields</th>
    </tr>
    <tr>
        <td rowspan="1"><strong>student</strong></td>
        <td>
          <ul>
                <li>course: <code>string</code> <span class="highlight">=> required</span></li>
                <li>yearLevel: <code>number</code> <span class="required">=> required</span></li>
                <li>block: <code>string</code><span class="required">=> required</span></li>
            </ul>
    </tr>
    <tr>
    <td rowspan="1"> <string>staff</strong></td>
     <td>
          <ul>
                <li>department: <code>string</code>  <span class="required">=> required</span></li>
                <li>position: <code>string</code>  <span class="required">=> required</span></li>
    <tr>
    <td rowspan="1"> <string>counselor</strong></td>
     <td>
          <ul>
                <li>specialization: <code>string</code> <span class="required">=> required</span></li>
                <li>notAvailableSched: <code>string[]</code>  <span class="required">=> required</span></li>
                <li>roomNumber: <code>string</code> <span class="required">=> required</span></li>
            </ul>
    </tr>
</table>

### Response

The response will contain the following:

- **status**: `boolean` => `true` if registration is successful, `false` otherwise
- **document**: `object` => contains relevant user registration documents or data, if applicable
- **otpResponse**: `object` => response related to OTP validation (could include OTP sent status, expiration time, etc.)
- **error?**: `object` => an optional error field that provides error details if the registration fails (e.g., validation errors, missing fields, etc.)

### Example Request:

```json
{
  "idNumber": "123456789",
  "email": "example@email.com",
  "password": "password123",
  "role": "student",
  "course": "BSIS",
  "block": "B",
  "year_level": 4,
  "first_name": "John",
  "last_name": "Doe",
  "middle_name": "Smith",
  "suffix": "Jr",
  "gender": "other",
  "date_of_birth": "2000-01-01",
  "address": "123 Main St, City, Country",
  "contact_number": "09123456789",
  "facebook": "https://facebook.com/johndoe",
  "course": "BSIS",
  "yearLevel": "4",
  "block": "B",
  "other_info": {
    "course": "BSIS",
    "yearLevel": "4",
    "block": "B"
  }
}
```

If the registration is successful, a verification code will be sent to the registered email. You can then go [`verify`](#post-apiauthverify), which will call the verification API.

[Back to top ↑](#authentication)

---

## `[POST]` /api/auth/verify

### Description

Verifies the account of a user by accepting verification details and returning a confirmation response.

### Request Payload

The request body must be a JSON object containing the following fields:

#### Fields

- **email**: `string` => required
- **code**: `string` => required

### Response

The response will contain a confirmation of the verification process:

- **status**: `boolean` => `true` if registration is successful, `false` otherwise

### Example Request

```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

[Back to top ↑](#authentication)

---

## `[POST]` /api/auth/login

### Description

Logs a user into their account using provided credentials and returns an authentication token.

### Request Payload

The request body must be a JSON object containing the following fields:

#### Fields

- **idNumber**: `string` => required
- **password**: `string` => required

### Response

The response will contain the following:

- **success**: `boolean` => `true` if login is successful, `false` otherwise
- **document**:

  - **token**: `object` => contains the `accessToken` and `refreshToken`
  - **user**: `object` => the user’s data

- **error?**: `object` => an optional error field that provides error details if the login fails (e.g., incorrect credentials)

### Example Request

```json
{
  "idNumber": "123456789",
  "password": "password123"
}
```

[Back to top ↑](#authentication)

---

## `[PATCH]` /api/auth/update

### Description

Updates the profile of a logged-in user by modifying the user’s details based on the authenticated context.

### Authorization

This endpoint requires a **Bearer Token** in the request header. The token should be provided as follows:

```http
Authorization: Bearer {accessToken}
```

The `accessToken` must correspond to a user with the role of `Student`,`Staff` or `Counselor`. If the role is anything other than else, the request will be forbidden.

### Request Payload

The request body must be a JSON object containing the following fields:

#### Fields

- **idNumber**: `string` => required (used to identify the user)
- **email**: `string` => required (used to verify if you are the owner)
- **password**: `string` => requiered
- **role**: `string` => optional (default: 'student')
- **verified**: `boolean` => optional (default: false)
- **active**: `boolean` => optional (default: false)
- **first_name**: `string` => optional
- **last_name**: `string` => optional
- **middle_name**: `string` => optional
- **suffix**: `string` => optional
- **gender**: `string` => optional `[accept: male, female, and other]` (default: 'other')
- **date_of_birth**: `date` => optional
- **address**: `string` => optional
- **contact_number**: `string` => optional
- **facebook**: `string` => optional
- **other_info**: `[object]` => optional, based on the role
  [see here](#post-apiauthregister)

### Response

The response will contain the following:

- **success**: `boolean` => `true` if the update is successful, `false` otherwise
- **document**:

  - **user**: `object` => the updated user’s data (e.g., `idNumber`, `email`, `first_name`, etc.)

- **error?**: `object` => an optional error field that provides error details if the update fails (e.g., missing fields, invalid data)

[Back to top ↑](#authentication)

---

## `[POST]` /api/auth/forgot-password

### Description

Sends a password reset code to the user's email to allow them to reset their password. If the reset code is successfully sent, the user will be directed to a password reset page where they can confirm the code and provide a new password.

### Request Payload

The request body must be a JSON object containing one of the following fields:

#### Fields

- **idNumber**: `string` => required

  **OR**

- **email**: `string` => required

### Response

The response will contain the following:

- **success**: `boolean` => `true` if the reset code is sent successfully, `false` otherwise
- **error?**: `object` => optional field that provides error details if there’s a problem with the request (e.g., invalid `idNumber` or `email`, user not found)

### Example Response

```json
{
  "success": true
}
```

If the success is `true`, direct the user to [<u>reset-password</u>](#patch-apiauthreset-password) to confirm the reset verfication code and provide a new password.

[Back to top ↑](#authentication)

---

## `[PATCH]` /api/auth/reset-password

### Description

Resets the password for a user by verifying their email or ID and accepting a new password.

### Request Payload

The request body must be a JSON object containing the following fields:

#### Fields

- **idNumber**: `string` => required (if using `idNumber`)
- **email**: `string` => required (if using `email`)
- **newPassword**: `string` => required (the new password the user wants to set)
- **code**: `string` => required (the password reset code that was sent to the user)

### Response

The response will contain the following:

- **success**: `boolean` => `true` if the password is successfully reset, `false` otherwise
- **error?**: `object` => optional field that provides error details if the reset fails (e.g., invalid code, user not found)

### Example Response

```json
{
  "success": true
}
```

[Back to top ↑](#authentication)

---

## `[POST]` /api/auth/logout

### Description

Logs the user out of their session and invalidates the authentication token.

### Request Payload

The request body must be a JSON object containing the following fields:

#### Fields

- **accessToken**: `string` => required (the access token of the user)
- **refreshToken**: `string` => required (the refresh token of the user)

### Response

The response will contain the following:

- **success**: `boolean` => `true` if the logout is successful, `false` otherwise
- **error?**: `object` => optional field that provides error details if the logout fails (e.g., invalid token, session not found)

### Example Response

```json
{
  "success": true
}
```

[Back to top ↑](#authentication)

---

## `[POST]` /api/auth/refresh

### Description

Refreshes the authentication token for the user to maintain their logged-in state. If the access token expires, a new access token and refresh token will be generated. These two tokens must be stored with every request.

### Request Payload

The request body must be a JSON object containing the following field:

#### Fields

- **refreshToken**: `string` => required (the refresh token of the user)

### Response

The response will contain the following:

- **success**: `boolean` => `true` if the token refresh is successful, `false` otherwise
- **token**:

  - **accessToken**: `string` => new access token
  - **refreshToken**: `string` => new refresh token

- **error?**: `object` => optional field that provides error details if the refresh fails (e.g., invalid or expired refresh token)

### Example Request

```json
{
  "refreshToken": "myRefreshToken123456"
}
```

[Back to top ↑](#authentication)

---

## `[POST]` /api/user/

### Description

Creates a new user account by accepting user details and returning a confirmation response. This operation is restricted to users with `Counselor` or `Staff` roles.

### Request Payload

The request body must be a JSON object containing the following fields (similar to the registration process):

#### Fields

- **idNumber**: `string` => required
- **email**: `string` => required
- **password**: `string` => required
- **role**: `string` => required (default: 'student')
- **verified**: `boolean` => not required (default: false)
- **active**: `boolean` => not required (default: false)
- **first_name**: `string` => required
- **last_name**: `string` => required
- **middle_name**: `string` => not required
- **suffix**: `string` => not required
- **gender**: `string` => not required `[accept: male, female, and other]` (default: 'other')
- **date_of_birth**: `date` => required
- **address**: `string` => not required
- **contact_number**: `string` => required
- **facebook**: `string` => not required
- **other_info**: `[object]` => optional, based on the role [see here](#post-apiauthregister)

### Authorization

This endpoint requires a **Bearer Token** in the request header. The token should be provided as follows:

```http
Authorization: Bearer {accessToken}
```

The `accessToken` must correspond to a user with the role of `Staff` or `Counselor`. If the role is anything other than `Staff` or `Counselor`, the request will be forbidden.

### Response

The response will contain the following:

- **success**: `boolean` => `true` if the user was created successfully, `false` otherwise
- **document**: `object` => the created user’s data
- **error?**: `object` => optional field that provides error details if the creation fails (e.g., invalid access token, forbidden role)

### Example Request

```json
{
  "idNumber": "KC-A-1234",
  "email": "user@example.com",
  "password": "password123",
  "role": "student",
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "2000-01-01",
  "contact_number": "09123456789",
  "facebook": "https://facebook.com/johndoe",
  "course": "BSIS",
  "yearLevel": "4",
  "block": "B",
  "other_info": {
    "course": "BSIS",
    "yearLevel": "4",
    "block": "B"
  }
}
```

### Example Response

```json
{
  "success": true,
  "user": {
    "idNumber": "123456789",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
    // ....the rest
  }
}
```

[Back to top ↑](#user-management)

---

## `[GET]` /api/user/

### Description

Fetches a list of all users. This operation is **restricted** and only accessible by users with `Counselor` or `Staff` roles.

### Authorization

This endpoint requires a **Bearer Token** in the request header. The token should be provided as follows:

```http
Authorization: Bearer {accessToken}
```

The `accessToken` must correspond to a user with the role of `Staff` or `Counselor`. If the role is anything other than `Staff` or `Counselor`, the request will be forbidden.

### Request Parameters

You can use the following query parameters:

- **query**: `object` => optional filter query (e.g., search criteria or conditions)
- **sort**: `object` => optional sorting options (e.g., sort by `createdAt`, `name`, etc.)
- **page**: `number` => required (the page number, default is `1`)
- **limit**: `number` => required (the number of results per page, default is `10`)
- **searchTerm**: `string` => optional search term to filter users (e.g., name, email, etc.)
- **paginate**: `boolean` => required (set to `true` to paginate results)
- **includeDeleted**: `boolean` => optional (set to `true` to include deleted users, `false` to exclude deleted users)

### Example Request

To fetch the first page of users, with 10 results per page, and a search for users with the term "anna", while including deleted users:

```http
GET /api/user/?page=1&limit=10&searchTerm=anna&paginate=true&includeDeleted=true
```

You can also adjust the query parameters like `query` or `sort` as needed.

### Example Response

```json
{
  "success": true,
  "total": 3,
  "_results": 3,
  "results": 3,
  "documents": [
    {
      "_id": "6853a8809da8fa1dd7f7e903",
      "idNumber": "KC-123",
      "email": "student@student.com",
      "role": "student",
      "verified": true,
      "active": true,
      "first_name": "First Name",
      "last_name": "Last Name",
      "gender": "female",
      "date_of_birth": "1990-03-10T00:00:00.000Z",
      "contact_number": "09178889900",
      "address": "Poblacion, Katipunan",
      "facebook": "https://facebook.com/first.last",
      "other_info": {
        "course": "BSIS",
        "yearLevel": "3",
        "section": "marang"
      },
      "deletedAt": "2025-06-20T06:04:03.089Z", // Deleted user
      "createdAt": "2025-06-19T06:04:48.107Z",
      "updatedAt": "2025-06-19T06:04:48.107Z"
    }
  ],
  "page": 1,
  "limit": 10
}
```

NOTE: to make work the `searchTerm`, you must allowed a certain fields like this on the example:

```typescript
class UserService extends BaseService<
  IUserModel,
  UserStudentMongooseRepository
> {
  constructor() {
    this.allowedFilterFields = ['role']; //you can add more here
  }
}
```

[Back to top ↑](#user-management)

---

## `[GET]` /api/user/getProfile/:idNumber

### Description

Retrieves the user profile associated with a specific ID number. Accessible by `Counselor` or `Staff` roles.

[Back to top ↑](#user-management)

---

## `[GET]` /api/user/getUserById/:uid

### Description

Fetches a user profile by their unique UID. Restricted to `Counselor` or `Staff` roles.

[Back to top ↑](#user-management)

---

## `[GET]` /api/user/current

### Description

Retrieves the profile of the currently authenticated user. Available to `Counselor`, `Staff`, or `Student` roles.

[Back to top ↑](#user-management)

---

## `[POST]` /api/appointment/create

### Description

Creates a new appointment by accepting appointment details and returning a confirmation response.

[Back to top ↑](#appointment)

---

## `[GET]` /api/appointment/getAll

### Description

Fetches a list of all appointments. Accessible by `Counselor` or `Staff` roles.

[Back to top ↑](#appointment)

---

## `[GET]` /api/appointment/getById/:appointmentId

### Description

Retrieves appointment details by appointment ID.

[Back to top ↑](#appointment)

---

## `[PATCH]` /api/appointment/update

### Description

Updates an existing appointment.

[Back to top ↑](#appointment)

---

## `[PATCH]` /api/appointment/cancel

### Description

Cancels an existing appointment.

[Back to top ↑](#appointment)

---

## `[PUT]` /api/appointment/accept

### Description

Accepts an appointment. Restricted to `Staff` roles.

[Back to top ↑](#appointment)

---

## `[PUT]` /api/appointment/verify

### Description

Verifies an appointment. Restricted to `Counselor` roles.

[Back to top ↑](#appointment)

---

## `[POST]` /api/config/create

### Description

Creates a new appointment configuration. Restricted to `Counselor` roles.

[Back to top ↑](#config)

---

## `[PATCH]` /api/config/update

### Description

Updates the appointment configuration. Restricted to `Counselor` roles.

[Back to top ↑](#config)

---

```

```
