export interface Enviornment {
    db_url: string;
    jwt_secret_key: string;
}
export declare function getEnvironment(): Enviornment;
