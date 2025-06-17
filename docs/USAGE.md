# 📘 Usage Guide – HttpResponse Helper for Express

This guide provides examples and best practices for using the `HttpResponse` utility in real-world Express.js applications.

---

## 📦 Importing & Initialization

```ts
const express = require('express');
const { responseMiddleware } = require('express-response-rest');
// If using TypeScript, ensure express types are installed

const app = express();

app.use(responseMiddleware); // initiate
```

---

## ✅ Sending a Successful Response

```ts
res.success({
	message: 'User fetched successfully',
	data: { id: 1, name: 'John Doe' },
});
```

### Custom Metadata and Headers

```ts
res.success({
	message: 'List with metadata',
	data: [/* array of items */],
	meta: {
		total: 120,
		page: 2,
		perPage: 10,
	},
	headers: {
		'X-Custom-Header': 'CustomValue',
	},
});
```

---

## ✅ Resource Created (`201 Created`)

```ts
res.created({
	data: { id: 5 },
	message: 'User created successfully',
});
```

---

## 🔃 Async Accepted (`202 Accepted`)

```ts
res.accepted({
	message: 'Job accepted and will process shortly',
});
```

---

## ❌ Handling Errors

### `400 Bad Request`

```ts
res.badRequest({
	message: 'Validation failed',
	errors: {
		email: 'Email is required',
		password: 'Password must be 6+ characters',
	},
});
```

### `401 Unauthorized`

```ts
res.unauthorized({
	message: 'Invalid token or session expired',
});
```

### `403 Forbidden`

```ts
res.forbidden({
	message: 'You do not have access to this resource',
});
```

### `404 Not Found`

```ts
res.notFound({
	message: 'User not found',
});
```

---

## 🚫 Other Error Responses

| Method                             | Use Case                                     |
| ---------------------------------- | -------------------------------------------- |
| `res.conflict`                     | Duplicate or existing data conflict          |
| `res.unprocessableEntity`          | Validation passed structure but failed rules |
| `res.tooManyRequests`              | Rate limit exceeded                          |
| `res.serverError`                  | Generic server-side error                    |
| `res.serviceUnavailable`           | System overload or maintenance               |
| `res.notImplemented`               | Endpoint not yet implemented                 |

---

## 🧾 Empty Response (`204 No Content`)

For DELETE or successful operations with no body.

```ts
res.noContent(res);
```

---

## 📌 Best Practices

* Use `success()` and `error()` for standard 200/500 patterns.
* Use express native `res.status(statusCode).send(data)` if you need full customization.
* Always include meaningful `message` strings.
* Provide structured `errors` in bad requests to assist clients.
* Use `meta` for pagination, performance, or debugging info.

---

## 🔍 Example Controller (TypeScript)

```ts
import { Request, Response } from 'express';

export const getUser = async (req: Request, res: Response) => {
	try {
		const user = await db.findUser(req.params.id);
		if (!user) {
			return res.notFound({ message: 'User not found' });
		}

		res.success({ data: user });
	} catch (err) {
		res.serverError({
			message: 'Unable to fetch user',
			errors: err,
		});
	}
};
```