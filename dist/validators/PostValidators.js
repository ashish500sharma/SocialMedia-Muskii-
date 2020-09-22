"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidator = void 0;
const express_validator_1 = require("express-validator");
const Post_1 = require("../models/Post");
class PostValidator {
    static addPost() {
        return [express_validator_1.body('content', 'Content is Required').isString()];
    }
    static getPostById() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Post_1.default.findOne({ _id: id }, { user_id: 0, __v: 0 }).populate('comments').then((post) => {
                    if (post) {
                        req.post = post;
                        return true;
                    }
                    else {
                        throw new Error('No Post is there ');
                    }
                });
            })];
    }
    static editPost() {
        return [express_validator_1.body('content', 'Content is required').isString(),
            express_validator_1.param('id').custom((id, { req }) => {
                return Post_1.default.findOne({ _id: id }).then((post) => {
                    if (post) {
                        req.post = post;
                        return true;
                    }
                    else {
                        throw new Error('No Post is there ');
                    }
                });
            })
        ];
    }
    static removePost() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Post_1.default.findOne({ _id: id }, { user_id: 0, __v: 0 }).then((post) => {
                    if (post) {
                        req.post = post;
                        return true;
                    }
                    else {
                        throw new Error('No Post is there ');
                    }
                });
            })];
    }
}
exports.PostValidator = PostValidator;
