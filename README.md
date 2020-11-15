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
    _id: 'ObjectID',
    name: 'String',
    email: 'Email',
    sessionId: 'String'
}
```

### /login

accepts POST:
```javascript
const user = {
    name: 'String',
    password: 'String'
}
```

returns JSON:
```javascript
const user = {
    _id: 'ObjectID',
    name: 'String',
    email: 'Email',
    sessionId: 'String'
}
```

### /logout

accepts POST:
```javascript
const user = {
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

* polka - smaller and faster than expressjs
* lokijs - in memory nosql database