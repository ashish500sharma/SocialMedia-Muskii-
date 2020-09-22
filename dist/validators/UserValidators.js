"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidators = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../models/User");
class UserValidators {
    static signUp() {
        return [express_validator_1.body('email', 'email is required').isEmail().custom((email) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        throw new Error('User already exists');
                    }
                    else {
                        return true;
                    }
                });
            }),
            express_validator_1.body('password', 'password is required').isAlphanumeric().
                isLength({ min: 8, max: 20 }).withMessage('password can be 8 to 20 charaters only'),
            express_validator_1.body('username', 'username is required').isString()];
    }
    static verifyUser() {
        return [express_validator_1.body('verification_token', 'Verification is required').isNumeric()];
    }
    static updatePassword() {
        return [express_validator_1.body('password', 'password is required').isAlphanumeric(),
            express_validator_1.body('confirm_password', 'Confirm password is required').isAlphanumeric(),
            express_validator_1.body('new_password', 'New password is required').isAlphanumeric()
                .custom((newPassword, { req }) => {
                if (newPassword === req.body.confirm_password) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error('Password and Confirm Password does not Matched');
                }
            })];
    }
    static userLogin() {
        return [express_validator_1.query('email', 'Email is Required').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('USER DOES NOT EXIST');
                    }
                });
            }),
            express_validator_1.query('password', 'password is Required').isAlphanumeric()];
    }
    static sendResetPasswordEmail() {
        return [express_validator_1.query('email', 'Email is Required').isEmail()
                .custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then((user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('Email does not exist');
                    }
                });
            })];
    }
    static verifyResetPasswordToken() {
        return [express_validator_1.query('reset_password_token', 'Reset Password Token Is Required').isNumeric()
                .custom((token, { req }) => {
                return User_1.default.findOne({ reset_password_token: token,
                    reset_password_token_time: { $gt: Date.now() } })
                    .then((user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('Token Does not Exist! Please request Again');
                    }
                });
            })];
    }
    static resetPassword() {
        return [express_validator_1.body('email', 'email is required').isEmail()
                .custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('USER DOES NOT EXIST');
                    }
                });
            }),
            express_validator_1.body('new_password', 'New Password is required').isAlphanumeric().custom((newPassword, { req }) => {
                if (newPassword === req.body.confirm_password) {
                    return true;
                }
                else {
                    throw new Error('Confirm Password and New Password Should be Matched');
                }
            }),
            express_validator_1.body('confirm_password', 'Confirm Password is required').isAlphanumeric(),
            express_validator_1.body('reset_password_token', 'Reset Password Token is Required').isNumeric()
                .custom((token, { req }) => {
                if (Number(req.user.reset_password_token) === Number(token)) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error('Reset Password Token is Invalid , Try again');
                }
            })
        ];
    }
    static updateProfilePic() {
        return [express_validator_1.body('profile_pic').custom((profilePic, { req }) => {
                if (req.file) {
                    return true;
                }
                else {
                    throw new Error('File not Uploaded');
                }
            })];
    }
}
exports.UserValidators = UserValidators;
