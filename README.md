# 📄 Documentation

- [`[POST] /api/auth/register`](#post-apiauthregister) => text(register an account)
- [`[POST] /api/auth/login`](#post-apiauthlogin) => login an account
- [`[GET] /api/user/`](#get-apiuser) => get all users

---

### [POST] /api/auth/register

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

### [POST] /api/auth/login

# ▶️ Description

    - No description

- **idNumber**: `string` => required
- **password**: `string` => required

---

---

### [GET] /api/user/

# ▶️ Description

    - No description

---

Here’s the entire setup guide in one markdown block:

````markdown
# Setting Up MongoDB with Docker

Follow these steps to set up MongoDB using Docker.

## 1. Install Docker
If you haven't installed Docker yet, download and install it from the [Docker official website](https://www.docker.com/get-started).

## 2. Pull MongoDB Image
Once Docker is installed, open your terminal or command prompt and pull the MongoDB Docker image from Docker Hub by running the following command:

```bash
docker pull mongo
````

## 3. Run MongoDB Container

After pulling the MongoDB image, run a MongoDB container with the following command:

```bash
docker run --name mongodb -d -p 27017:27017 mongo
```

### Explanation of the Command:

* `--name mongodb`: This names your container "mongodb".
* `-d`: This runs the container in detached mode (background).
* `-p 27017:27017`: This exposes MongoDB's default port (27017) to your local machine.

## 4. Verify MongoDB Container is Running

To check if the MongoDB container is running, use:

```bash
docker ps
```

## 5. Connect to MongoDB with `mongosh`

To connect to the MongoDB shell, use the following command:

```bash
docker exec -it mongodb mongosh
```

This will allow you to interact with MongoDB using the `mongosh` shell.

## 6. Stopping and Starting the MongoDB Container

If you want to stop or start the MongoDB container:

* To stop the container:

  ```bash
  docker stop mongodb
  ```

* To start the container again:

  ```bash
  docker start mongodb
  ```

## 7. Optional: Set Up MongoDB with Custom Configuration

If you want to use a custom configuration or mount a volume to persist data, you can run MongoDB with the following command:

```bash
docker run --name mongodb -d -p 27017:27017 -v /your/local/directory:/data/db mongo
```

This will mount your local directory (`/your/local/directory`) to MongoDB's data directory (`/data/db`), allowing you to persist data across container restarts.

## Conclusion

Now you have MongoDB running on Docker! You can connect to it using `mongosh`, manage containers, and even configure custom settings. Let me know if you need further help!

```

You can copy and paste this markdown in one go!
```

