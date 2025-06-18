# HttpResponse – Express Response Helper

A lightweight and consistent utility to send standardized HTTP responses in your Express.js applications.

## ✨ Features

- ✅ Simple and consistent response format
- 📦 Typed with TypeScript
- ⚡ Fast integration with Express
- 🔁 Built-in support for common status codes
- 🧩 Optional metadata, headers, and error structure
- 🧼 Cleaner controller logic using `HttpResponse.send()` base method

---

## 📦 Installation

```bash
npm install express-response-rest
````

> If you're using TypeScript and want type support for `express.Response`, install the types:

```bash
npm install --save-dev @types/express
```

---

## 🔧 Usage

#### 1. TypeScript:

```ts
import express, { Request, Response } from 'express';
import { responseMiddleware } from 'express-response-rest';

const app = express();

app.use(responseMiddleware); // initiate

app.get('/success', (req: Request, res: Response) => {
	res.success({
		message: 'Fetched successfully',
		data: { id: 1, name: 'Hitraa' },
	});
});

app.get('/error', (req: Request, res: Response) => {
	res.badRequest({
		message: 'Invalid input provided',
		errors: { email: 'Email is required' },
	});
});
```

#### 1. JavaScript:

```javascript
const express = require('express');
const { responseMiddleware } = require('express-response-rest');

const app = express();

app.use(responseMiddleware); // initiate

app.get('/success', (req, res) => {
	res.success({
		message: 'Fetched successfully',
		data: { id: 1, name: 'Hitraa' },
	});
});

app.get('/error', (req, res) => {
	res.badRequest({
		message: 'Invalid input provided',
		errors: { email: 'Email is required' },
	});
});
```

> See detailed examples on [usage page](docs/USAGE.md)

---

## 🧱 Available Methods

| Method                      | HTTP Code | Use Case                              |
| --------------------------- | --------- | ------------------------------------- |
| `res.success`               | `200`     | Standard successful response          |
| `res.created`               | `201`     | Resource created successfully         |
| `res.accepted`              | `202`     | Request accepted for async processing |
| `res.noContent`             | `204`     | No content returned (DELETE, etc.)    |
| `res.badRequest`            | `400`     | Invalid request data                  |
| `res.unauthorized`          | `401`     | Unauthenticated request               |
| `res.forbidden`             | `403`     | Access forbidden                      |
| `res.notFound`              | `404`     | Resource not found                    |
| `res.notAcceptable`         | `406`     | Invalid request content format        |
| `res.conflict`              | `409`     | Duplicate or conflict error           |
| `res.gone`                  | `410`     | Resource is no longer available       |
| `res.unsupportedMediaType`  | `415`     | Unsupported Media/Content-Type        |
| `res.unprocessableEntity`   | `422`     | Validation or semantic errors         |
| `res.tooManyRequests`       | `429`     | Rate limiting violation               |
| `res.error`                 | `500`     | Internal server error                 |
| `res.notImplemented`        | `501`     | Functionality is not implemented      |
| `res.serviceUnavailable`    | `503`     | Server maintenance or overload        |
| `res.send`                  | -         | Express native send method            |

---

## 🧾 Response Format

All JSON responses follow this structure:

```javascript
{
  "status": "success" | "error",
  "message": "String message",
  "data": { /* optional data */ },
  "errors": { /* optional errors */ },
  "meta": { /* optional metadata */ },
  "timestamp": "ISO date string"
}
```

---

## ✍️ Type Definitions

```ts
interface ResponseOptions {
  message?: string;
  data?: any;
  meta?: any;
  errors?: any;
  headers?: Record<string, string>;
  statusCode?: number;
}
```

Use `SuccessResponseOptions` or `ErrorResponseOptions` to narrow the type when needed.

---

## 🛡 License

Released under the [MIT License](LICENSE)

---

## 👨‍💻 Author
Made with ❤️ by **Harshal Khairnar**  
Founder, [Hitraa Technologies](https://hitraa.com)  
📧 [harshal@hitraa.com](mailto:harshal@hitraa.com)

---

## 💡 Tip

If you want to return raw text or HTML instead of JSON, use Express' `res.send()` or `res.render()` directly. This library is strictly for JSON-based API responses.
