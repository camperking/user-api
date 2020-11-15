# User-API

User-API is an API microservice for registration and authentication of users.

## API schema

If something fails routes will response with ```{ "error": "Error Message" }```

### /register  
accepts POST:
```javascript
const user = {
    name: 'String',
    password: 'String',
    email: 'Email'
}
```

returns JSON:
```javascript
const user = {
    name: 'String',
    email: 'Email',
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

* polka - Polka is an extremely minimal, highly performant Express.js alternative.
* body-parser - Node.js body parsing middleware.
* lokijs - in-memory nosql database
* yup - Yup is a JavaScript schema builder for value parsing and validation.