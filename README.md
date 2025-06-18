# 📄 Documentation
 
- [`[POST] /api/auth/register`](#post-apiauthregister) => register an account
- [`[GET] /profile`](#get-profile) => Get Data
- [`[POST] /api/auth/login`](#post-apiauthlogin) => Login
- [`[PUT] /info?id=1`](#put-info?id=1) => Update Data
- [`[DEL] /info?id=1`](#del-info?id=1) => Delete Data
- [`[GET] /api/user/`](#get-api/user) => Get All Users
- [`[GET] /user/getUserById/68469e1ef430dfbabd85b276`](#get-usergetUserById68469e1ef430dfbabd85b276) => Get Profile
- [`[POST] /auth/forgot-password`](#post-apiauthregister) => Forgot password
v
- [`[POST] /api/otp/generate`](#post-apiauthregister) => Generate OTP
- [`[POST] /otp/validate`](#post-apiauthregister) => OTP Validate
- [`[POST] /api/auth/logout`](#post-apiauthregister) => Logout
- [`[POST] /`](#post-apiauthregister) => New Request
- [`[POST] /`](#post-apiauthregister) => Current User
---
 
## `[POST]` /api/auth/register
 
###  Description
 
Registers a new user account by accepting user details and returning a confirmation response.
 
 
###  Request Payload
 
The request body must be a JSON object containing the following fields:
 
### UserSchema Fields
 
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
- **other_info**: `[object]` => 
---
 
### Other_info : Description
 
The `other_info` object will vary depending on the role chosen. Below are the fields for each role:
 
| **Role**    | **Fields**                      |
|-------------|----------------------------------|
| **Student** | course: string                  |
|             | yearLevel: number                |
|             | section: string                 |
| **Staff**   | department: string              |
|             | position: string                |
| **Counselor**| specialization: string          |
|             | availableDays: string[]         |
|             | roomNumber: string              |
 
### Example:
 
 
 
``` json
{
  "course": "BSIS",
  "yearLevel": "4",
  "block": "B"
}
 ```
 
## `[GET]` /profile
 
 
###  Description
 
This GET request retrieves data from an endpoint using query parameters (e.g., id=1). A successful response returns a 200 OK status with a response body, such as HTML or JSON data. No request body is needed for GET requests.
 
 
## `[POST]` /api/auth/login
 
 
###  Description
This POST request sends JSON data (e.g., idNumber and password) via the request body to the API. A successful response typically returns a 200 OK or 201 Created status code, with the data reflected in the response.
 
### Request Payload
The request body must be a JSON object containing the following fields:
- idNumber (string): The unique identifier for the user.
- password (string): The user's password.
 
### Login Fields
``` json
{
	  "idNumber": "KC-22-A-00324",
      "password": "jojogret"
}
 ```
 
 
## `[PUT]` /info?id=1
 
###  Description
This PUT request is used to overwrite existing data. It modifies an entity (identified by an identifier in the URL, e.g., id=1). A successful response typically returns a 200 OK, 201 Created, or 204 No Content status code.
 
### Request Payload 
The request body must be a JSON object containing the fields you want to update. In this case, the example shows a field to update the `name` of the user.
 
 
``` json
{
	"name": "Add your name in the body"
}
 ```
 
 
## `[DEL]` /info?id=1
 
 
###  Description
This DELETE request removes data created via a POST request. The entity to be deleted is identified by an identifier in the URL (e.g., id=1). A successful response typically returns a 200 OK, 202 Accepted, or 204 No Content status code.
 
## `[GET]` /api/user/
 
###  Description
 
 
This endpoint retrieves information about users from the system. It is a simple GET request that returns user data.
 
### Request Parameters:
No specific parameters are required. Simply send a GET request to the URL.
 
### Expected Response:
A successful response returns a JSON object with:
 
- `id`: Unique identifier for the user.
 
- `name`: The name of the user.
 
- `email`: The email address associated with the user.
 
- `created_at`: Timestamp of when the user was created.
 
- `updated_at`: Timestamp of the last update made to the user information.
 
### Notes
 
- Ensure necessary permissions to access user data.
 
- The response may vary based on user role and permissions.
 
- Handle errors like unauthorized access or user not found.
 
## `[GET]` /user/getUserById/68469e1ef430dfbabd85b276`
 
 
###  Description
 
This endpoint retrieves the details of a user based on the provided user ID.
 
#### Request
 
- **Method:** GET
 
- **URL:** `{{base_url}}/user/getUserById/{userId}`
 
- **Path Parameter:**
 
    - `userId` (string): e unique identifier of the user (e.g., 68469e1ef430dfbabd85b276).
 
 
#### Response
A successful response returns the user's details in JSON format, including:
 
- `id`: The unique identifier of the user.
 
- `name`: The name of the user.
 
- `email`: The email address of the user.
 
- `createdAt`: The timestamp when the user was created.
 
- `updatedAt`: The timestamp of the last update made to the user's details.
 
 
#### Notes
 
- Ensure the provided user ID is valid to avoid errors.
- A 404 Not Found status is returned if the user is not found.
- Authentication may be required based on API security settings.
 
 
## `[POST]` /auth/forgot-password
 
###  Description
 
This endpoint allows users to reset their password by providing their identification details and a new password.
 
#### Request Format
 
- **Method**: POST
 
- **Endpoint**: `{{base_url}}/auth/forgot-password`
 
- **Content-Type**: application/json
 
 
#### Request Body
 
- **newPassword** (string): The new password that the user wishes to set.
 
- **idNumber** (string): The user's identification number.
 
- **code** (string): A verification code associated with the password reset process.
 
 
**Example Request Body**:
 
``` json
{
  "newPassword": "password1234",
  "idNumber": "2025001",
  "code": "1233455"
}
 
 ```
 
#### Response Structure
 
- **status** (string):  Success or error status.
 
- **message** (string): Description of the result.
 
#### Notes
Ensure to handle the response based on the status.
 
 
 
## `[POST]` /api/otp/generate
 
###  Description
This endpoint is used to generate a One-Time Password (OTP) for a specified purpose, such as password recovery.
 
### Request
 
- **Method**: POST
 
- **URL**: `{{base_url}}/api/otp/generate`
 
 
#### Request Body
 
The request body must be in JSON format and include the following parameters:
 
- `email` (string): The user's email address to receive the OTP.
 
- `purpose` (string): The purpose of the OTP (e.g., "FORGOT_PASSWORD" for password recovery).
 
 
### Expected Response
A successful response confirms that the OTP has been sent, including any relevant information about the OTP process.
 
 
### Notes
 
- Ensure the provided email is valid and accessible by the user.
- Define the purpose parameter clearly to avoid confusion.
 
 
 
## `[POST]` /otp/validate
###  Description
This endpoint generates a One-Time Password (OTP) for a specified purpose, such as password recovery.
 
### Request
 
 
**Method:** POST  
**URL:** `{{base_url}}/otp/validate`
 
#### Request Body
 
 
 
- **email** (string): The user's email address.
- **code** (string): The OTP code received by the user. 
- **purpose** (string): The purpose for validating the OTP (e.g., "FORGOT_PASSWORD").
 
 
 
 
### Example of a valid request body:
 
``` json
{
  "email": "user@example.com",
  "code": "123456",
  "purpose": "FORGOT_PASSWORD"
}
 
 ```
 
### Response
 
A success response include:
 
- **status** (string): The result of the OTP validation.
- **message** (string): A description of the validation result.
- **data** (object): Additional data related to the user's account or session.
 
 
### Example Response
 
``` json
{
  "status": "success",
  "message": "OTP validated successfully.",
  "data": {
    "userId": "12345",
    "sessionToken": "abcde12345"
  }
}
 
 ```
 
### Notes
 
- Ensure the provided email is registered in the system
- The OTP is time-sensitive and should be used promptly to avoid expiration.
 
 
## `[POST]` /api/auth/logout
 
 
###  Description
Logs out a user by invalidating the provided access and refresh tokens.
 
### HTTP Method
 
`POST`
 
### Endpoint
 
`{{base_url}}/api/auth/logout`
 
### Request Parameters
 
- **accessToken** (string): The token granting access to the user's session.
- **refreshToken** (string): The token used to obtain a new access token.
 
 
### Expected Response
Upon successful logout:
 
- **Status Code**: `401`
 
- **Content-Type**: `application/json`
 
- { "success": true, "error": { "status": 0, "message": "", "suggestions": \[\] }}
 
The success field indicates the outcome, while the error object provides additional details, such as status, message, and suggestions.
 
 
 
## `[POST]` /
 
 
###  Description
This endpoint is designed to accept data submissions from clients. It allows users to send specific information in the request body, which will be processed by the server.
 
### Request Body Format
 
The request body must be formatted as `form-data` or `x-www-form-urlencoded`. Each key in the request body represents a separate parameter. The parameters are as follows:
 
- **Parameter1**: (type: text) Description of Parameter1.
 
- **Parameter2**: (type: text) Description of Parameter2.
 
- **Parameter3**: (type: file) Description of Parameter3.
 
 
### Expected Response Format
 
Upon successful processing, the server will return a response with:
 
- **Status**: Indicates success or failure.
 
- **Message**: A descriptive message about the request outcome.
 
- **Data**: Relevant data related to the request, formatted as per the API's specifications.
 
### Notes
Ensure the request body follows the specified format to receive the expected response.
 
 
 
## `[GET]` /
 
 
###  Description
 
This endpoint retrieves data based on specified parameters, providing the necessary information by querying the server.
 
### Request Parameters
 
- **Parameter 1**: Description of what this parameter does.
 
- **Parameter 2**: Description of what this parameter does.
 
- **Parameter 3**: Description of what this parameter does.
 
 
### Expected Response
 
The response will contain the following fields:
 
- **Field 1**: Description of what this field represents.
 
- **Field 2**: Description of what this field represents.
 
- **Field 3**: Description of what this field represents.
 
 
### Notes
 
- Ensure all required parameters are included to receive a successful response.
 
- The response will be in JSON format.
 
- Handle any potential errors by checking the response status code.
