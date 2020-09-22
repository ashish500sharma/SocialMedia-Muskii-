"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostValidators_1 = require("../validators/PostValidators");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const PostController_1 = require("../controllers/PostController");
class PostRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/me', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, PostController_1.PostController.getPostByUser);
        this.router.get('/all', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, PostController_1.PostController.getAllPosts);
        this.router.get('/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, PostValidators_1.PostValidator.getPostById(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PostController_1.PostController.getPostById);
    }
    postRoutes() {
        this.router.post('/add', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, PostValidators_1.PostValidator.addPost(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PostController_1.PostController.addPost);
    }
    patchRoutes() {
        this.router.patch('/edit/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, PostValidators_1.PostValidator.editPost(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PostController_1.PostController.editPost);
    }
    deleteRoutes() {
        this.router.delete('/remove/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, PostValidators_1.PostValidator.removePost(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PostController_1.PostController.removePost);
    }
}
exports.default = new PostRouter().router;
