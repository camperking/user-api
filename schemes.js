const yup = require('yup');

const name = yup.string().min(3).max(20).matches(/^\w+\d*$/g).required();
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