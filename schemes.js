const yup = require('yup');

exports.registerSchema = yup.object().shape({
    name: yup.string().min(3).max(20).matches(/^\w+\d*$/g).required(),
    password: yup.string().min(6).required(),
    email: yup.string().email().required()
});