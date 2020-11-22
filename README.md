# User-API

User-API is an API microservice for registration and authentication of users.

## API schema

If something fails routes will response with ```{ "error": "Error Message" }```

### /register  
accepts POST:
```javascript
const newUser = {
    name: 'String',
    password: 'String',
    email: 'Email'
}
```

returns JSON:
```javascript
const user = {
    name: 'String',
    sessionId: 'String'
}
```

### /login

accepts POST:
```javascript
const login = {
    name: 'String',
    password: 'String'
}
```

returns JSON:
```javascript
const user = {
    name: 'String',
    sessionId: 'String'
}
```

### /logout

accepts POST:
```javascript
const user = {
    name: 'String',
    sessionID: 'String'
}
```

returns JSON:
```javascript
const logout = {
    success: 'Boolean'
}
```

### /auth

accepts POST:
```javascript
const user = {
    name: 'String',
    sessionID: 'String'
}
```

returns JSON:
```javascript
const auth = {
    auth: 'Boolean'
}
```

### /update

accepts POST:
```javascript
const user = {
    name: 'String',
    password: 'String',
    email: 'Email',
    sessionID: 'String'
}
```

returns JSON:
```javascript
const update = {
    success: 'Boolean'
}
```

## Dependencies
### production
* polka - Polka is an extremely minimal, highly performant Express.js alternative.
* body-parser - Node.js body parsing middleware.
* lokijs - in-memory nosql database
* yup - Yup is a JavaScript schema builder for value parsing and validation.

### development
* nodemon
* supertest
* jest

## Version History

### 0.2.0
* tests for all api routes

### 0.1.0
* all core features working
* ```register login logout auth update```

### 0.0.1
* first draft of api