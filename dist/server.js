"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const mongoose = require("mongoose");
const env_1 = require("./environments/env");
const UserRouter_1 = require("./routers/UserRouter");
const bodyParser = require("body-parser");
const PostRouter_1 = require("./routers/PostRouter");
const CommentRouter_1 = require("./routers/CommentRouter");
const Jobs_1 = require("./jobs/Jobs");
class Server {
    constructor() {
        this.app = express();
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.HandleErrors();
    }
    setConfigurations() {
        this.ConnectMongoDB();
        this.Configurebodyparser();
        Jobs_1.Jobs.runRequiredjobs();
    }
    ConnectMongoDB() {
        const database_url = env_1.getEnvironment().db_url;
        mongoose.connect(database_url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
            console.log('mongodb is connected');
        });
    }
    Configurebodyparser() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
    setRoutes() {
        this.app.use('/src/uploads', express.static('src/uploads'));
        this.app.use('/api/user', UserRouter_1.default);
        this.app.use('/api/post', PostRouter_1.default);
        this.app.use('/api/comment', CommentRouter_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not Found',
                Status_code: 404,
            });
        });
    }
    HandleErrors() {
        this.app.use((error, req, res, next) => {
            const errorstatus = req.errorStatus || 500;
            res.status(errorstatus).json({
                message: error.message || 'Something Went Wrong. Please try Again!',
                status_code: errorstatus,
            });
        });
    }
}
exports.Server = Server;
