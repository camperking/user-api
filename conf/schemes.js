const yup = require('yup');

const name = yup.string().min(4).max(20).matches(/^\w+\d*$/g, 'name must contain only a-z, A-Z, 0-9').required();
const password = yup.string().min(6).required();
const email = yup.string().email().required();
const sessionId = yup.string().required();

exports.registerSchema = yup.object().shape({
    name,
    password,
    email
});

exports.loginSchema = yup.object().shape({
    name,
    password
});

exports.logoutSchema = yup.object().shape({
    name,
    sessionId
});

exports.authSchema = yup.object().shape({
    name,
    sessionId
});

exports. updateSchema = yup.object().shape({
    name,
    password,
    email,
    sessionId
});