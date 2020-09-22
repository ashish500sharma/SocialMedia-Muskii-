export declare class UserController {
    static signUp(req: any, res: any, next: any): Promise<void>;
    static verify(req: any, res: any, next: any): Promise<void>;
    static resendVerificationEmail(req: any, res: any, next: any): Promise<void>;
    static userLogin(req: any, res: any, next: any): Promise<void>;
    static updatePassword(req: any, res: any, next: any): Promise<void>;
    static sendResetPasswordEmail(req: any, res: any, next: any): Promise<void>;
    static verifyResetPasswordToken(req: any, res: any, next: any): void;
    static resetPassword(req: any, res: any, next: any): Promise<void>;
    static updateProfilePic(req: any, res: any, next: any): Promise<void>;
}
