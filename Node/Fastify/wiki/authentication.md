### **Authentication Guide**

This guide provides an overview of authentication concepts for web applications, with an emphasis on token-based authentication methods, such as JWT. 

## **1. Basic Concepts**

### 1.1 What is Authentication?
Authentication is the process of verifying the identity of a user, device, or system. It often involves validating credentials like a username and password. 

### 1.2 What is Authorization?
Authorization is a security measure used to determine user/client privileges or access levels related to system resources, including computer programs, files, services, data and application features. While authentication verifies the user’s identity, authorization verifies what they have access to.

## **2. Mechanisms of Authentication**

### 2.1 Cookie-Based Authentication
Traditionally, web applications have used cookie-based authentication. When the user logs in, the server creates a session and sends a cookie with a session ID to the user's browser. The browser includes the cookie with each subsequent request, and the server uses the session ID to look up the session data, which can include the user's identity.

### 2.2 Token-Based Authentication
Token-based authentication is stateless. Instead of storing session data on the server, the server generates a token (often a JSON Web Token, or JWT) that contains all the data it needs to identify the user. The client stores this token and includes it in each request. The server validates the token and uses its data to identify the user.

## **3. JSON Web Tokens**

### 3.1 What is a JWT?
A JSON Web Token (JWT) is a JSON object that is defined in RFC 7519 as a safe way to represent a set of information between two parties. The token is composed of a header, a payload, and a signature. 

```typescript
import jwt from 'jsonwebtoken';

// sign with default (HMAC SHA256)
var jwtToken = jwt.sign({ data: 'foobar' }, 'secret', { expiresIn: '1h' });

console.log(jwtToken);
```

## **4. User Registration and Login**

When a user registers or logs in, the server should verify their credentials (e.g., compare the password hash with a stored hash) and return an access token and refresh token. The access token can be used for authentication in subsequent requests until it expires, while the refresh token can be used to obtain a new access token once the old one expires. 

```typescript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // check if user exists in DB
  const user = await User.findOne({ username });

  if (!user) return res.status(400).send({ message: 'User not found' });

  // compare passwords
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send({ message: 'Invalid password' });

  // create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});
```

## **5. Authenticating Requests**

Each request that requires authentication should include the access token. The server can use middleware to verify the token and extract the user's identity.

```typescript
const jwt = require('jsonwebtoken');

// middleware for validating JWT
function authenticateToken(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
   

 req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}

// Using the middleware in routes
app.get('/protected-route', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});
```

## **6. Refreshing Access Tokens**

When the access token expires, the client can send a request to a refresh endpoint, including the refresh token. The server should verify the refresh token, create a new access token, and return it to the client.

```typescript
app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});
```

## **7. Logout**

When a user logs out, the server can remove their refresh token from the list of valid refresh tokens. This means the user will not be able to get a new access token and will have to log in again.

```typescript
app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token);
  res.sendStatus(204);
});
```

## **8. Storing Passwords**

Passwords should never be stored in plaintext. Instead, use a cryptographic hash function to generate a hash of the password, and store this hash. When a user logs in, hash the password they provide and compare it to the stored hash.

```typescript
import bcrypt from 'bcrypt';

// Hashing a password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);

// Comparing a password
const validPass = await bcrypt.compare(req.body.password, user.password);
```

## **9. Secure Token Management**

Access tokens should be short-lived to minimize the damage that could be done if one is stolen. Refresh tokens should be stored securely on the server and invalidated when the user logs out or after a long period of inactivity. If a refresh token is stolen, it can be used to gain access tokens indefinitely, unless it is invalidated.

## **10. Cross-Origin Resource Sharing (CORS)**

CORS is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin.

```typescript
const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:3000', // replace this with your application's domain
    credentials: true,
  })
);
```

## **11. OAuth 2.0**

OAuth 2.0 is a protocol that allows a user to grant limited access to their resources on one site, to another site, without having to expose their credentials.

## **12. Two-Factor Authentication**

Two-factor authentication (2FA) is a method of establishing access to an online account or computer system that requires the user to provide two different types of information.

## **13. Distributed Systems Authentication**

In a distributed system, authentication protocols can be more complex. Solutions like OAuth 2.0, SAML, and OpenID Connect allow you to centralize your authentication server and have it issue tokens that can be verified by your other servers. 

Remember, Authentication is an essential part of any meaningful application. It is important to keep up-to-date with the latest practices and libraries to keep

 your application secure. This guide has provided an introduction to web authentication, but there are many more topics and nuances to explore. 

## **Useful Resources**

1. [MDN Web Docs - HTTP Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
2. [JWT Official Site](https://jwt.io/)
3. [bcrypt - npm](https://www.npmjs.com/package/bcrypt)
4. [The OAuth 2.0 Authorization Framework (RFC6749)](https://datatracker.ietf.org/doc/html/rfc6749)
5. [Learn OAuth 2.0 - Theory and Hands On](https://www.youtube.com/watch?v=996OiexHze0)
6. [Passport.js - Simple, unobtrusive authentication for Node.js](http://www.passportjs.org/)