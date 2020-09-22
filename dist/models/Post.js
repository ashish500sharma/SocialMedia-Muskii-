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
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Comment_1 = require("./Comment");
const postSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId,
        required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    content: { type: String, required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comments'
        }]
});
postSchema.post('remove', ((doc) => __awaiter(void 0, void 0, void 0, function* () {
    for (let id of doc.comments) {
        yield Comment_1.default.findOneAndDelete({ _id: id });
    }
})));
postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});
exports.default = mongoose_1.model('posts', postSchema);
