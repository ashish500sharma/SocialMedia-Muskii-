"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const Post_1 = require("../models/Post");
class PostController {
    static addPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.user_id;
            const content = req.body.content;
            const postData = {
                user_id: userId,
                content: content,
                created_at: new Date(),
                updated_at: new Date()
            };
            try {
                const post = yield new Post_1.default(postData).save();
                res.send(post);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getPostByUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.user_id;
            const page = parseInt(req.query.page);
            const perPage = 2;
            let currentPageToken = page;
            let previousPageToken = page === 1 ? null : page - 1;
            let nextPageToken = page + 1;
            let totalPages;
            try {
                const postCount = yield Post_1.default.countDocuments({ user_id: userId });
                totalPages = Math.ceil(postCount / perPage);
                if (totalPages === currentPageToken || totalPages === 0) {
                    nextPageToken = null;
                }
                if (page > totalPages) {
                    throw new Error('No More Posts To Show');
                }
                const post = yield Post_1.default.find({ user_id: userId }, { user_id: 0, __v: 0 }).populate('comments')
                    .limit(perPage).skip((perPage * page) - perPage);
                res.json({
                    post: post,
                    nextPageToken: nextPageToken,
                    totalPage: totalPages,
                    currentPageToken: currentPageToken,
                    previousPageToken: previousPageToken
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page);
            const perPage = 2;
            let currentPageToken = page;
            let previousPageToken = page === 1 ? null : page - 1;
            let nextPageToken = page + 1;
            let totalPages;
            try {
                const postCount = yield Post_1.default.estimatedDocumentCount();
                totalPages = Math.ceil(postCount / perPage);
                if (totalPages === currentPageToken || totalPages === 0) {
                    nextPageToken = null;
                }
                if (page > totalPages) {
                    throw new Error('No More Posts To show');
                }
                const post = yield Post_1.default.find({}, { user_id: 0, __v: 0 }).populate('comments')
                    .limit(perPage).skip((perPage * page) - perPage);
                res.json({
                    post: post,
                    nextPageToken: nextPageToken,
                    totalPage: totalPages,
                    currentPageToken: currentPageToken,
                    previousPageToken: previousPageToken,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getPostById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({
                post: req.post, commentCount: req.post.commentCount
            });
        });
    }
    static editPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = req.body.content;
            const postId = req.post.id;
            try {
                const post = yield Post_1.default.findOneAndUpdate({ _id: postId }, { content: content, updated_at: new Date() }, { new: true }).populate('comments');
                res.send(post);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static removePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = req.post;
            try {
                yield post.remove();
                res.send(post);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.PostController = PostController;
