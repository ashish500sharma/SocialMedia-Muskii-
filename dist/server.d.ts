import * as express from 'express';
export declare class Server {
    app: express.Application;
    constructor();
    setConfigurations(): void;
    ConnectMongoDB(): void;
    Configurebodyparser(): void;
    setRoutes(): void;
    error404Handler(): void;
    HandleErrors(): void;
}
