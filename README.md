# 📝 Swing Notes API

The **Swing Notes API** is a RESTful service that allows authenticated users to create, view, update, and delete personal notes. It features user authentication via JWT and is built with **Node.js**, **Express**, and **PostgreSQL**.

## 🚀 Features

* ✅ User signup & login with JWT-based authentication
* 🗒️ Full CRUD for personal notes
* 🧪 Testing with Jest and Supertest
* 🌱 Development seed script for generating users and notes
* 📚 API documentation via Swagger (OpenAPI 3.0.3)

---

## 🧰 Tech Stack

* **Node.js** & **Express**
* **PostgreSQL** with `pg`
* **JWT** for Authentication
* **Jest** + **Supertest** for Testing
* **Swagger (OpenAPI 3.0.3)** for API Documentation

---

## ⚙️ Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/OzzoDev/SwingNotesApi.git
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. *(Optional)* **Seed the database with random data**

   ```bash
   npm run seed
   ```

---

## 🧪 Running Tests

Run the full test suite using:

```bash
npm test
```

---

## 🔐 Environment Variables

Ensure the following environment variables are configured:

```env
PORT=3000
JWT_SECRET=your_secret
NODE_ENV=development
POSTGRES_URL=postgres://<user>:<password>@<host>:<port>/<dbname>
```

---

## 📘 API Documentation

The API follows the [OpenAPI 3.0.3 specification](https://swagger.io/specification/). Below is a summary of the endpoints:

### 📋 Endpoints Table

| Method | Endpoint              | Description                | Auth Required | Tags  |
| ------ | --------------------- | -------------------------- | ------------- | ----- |
| POST   | `/api/user/signup`    | Register a new user        | ❌ No          | Auth  |
| POST   | `/api/user/login`     | Log in and receive JWT     | ❌ No          | Auth  |
| GET    | `/api/notes`          | Get all notes for the user | ✅ Yes         | Notes |
| POST   | `/api/notes`          | Create a new note          | ✅ Yes         | Notes |
| GET    | `/api/notes/{noteId}` | Get a single note by ID    | ✅ Yes         | Notes |
| PUT    | `/api/notes/{noteId}` | Update a note by ID        | ✅ Yes         | Notes |
| DELETE | `/api/notes/{noteId}` | Delete a note by ID        | ✅ Yes         | Notes |

You can use tools like **Postman**, **Insomnia**, or **Swagger UI** to test these endpoints.

---

## 🔗 Swagger JSON

This API is documented with Swagger. Use the provided JSON to integrate with Swagger UI or import it into tools like Postman.

<details>
<summary>Swagger Info Summary</summary>

```json
{
  "openapi": "3.0.3",
  "info": {
    "title": "Swing Note API",
    "version": "1.0.0",
    "description": "The **Swing Note API** allows authenticated users to create, view, update, and delete personal notes. It also handles user authentication via signup and login routes with JWT token issuance."
  },
  "servers": [
    {
      "url": "http://localhost:3000",
      "description": "Local development server"
    }
  ],
  "tags": [
    {
      "name": "Auth",
      "description": "User authentication and authorization"
    },
    {
      "name": "Notes",
      "description": "CRUD operations for user notes"
    }
  ]
}
```

</details>

