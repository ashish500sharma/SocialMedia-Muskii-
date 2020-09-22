"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const CommentValidators_1 = require("../validators/CommentValidators");
const CommentController_1 = require("../controllers/CommentController");
class CommentRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
    }
    postRoutes() {
        this.router.post('/add/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, CommentValidators_1.CommentValidator.addComment(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CommentController_1.CommentController.addComment);
    }
    patchRoutes() {
        this.router.patch('/edit/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, CommentValidators_1.CommentValidator.editComment(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CommentController_1.CommentController.editComment);
    }
    deleteRoutes() {
        this.router.delete('/remove/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, CommentValidators_1.CommentValidator.removeComment(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CommentController_1.CommentController.removeComment);
    }
}
exports.default = new CommentRouter().router;
