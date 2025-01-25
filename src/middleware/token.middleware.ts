import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: string | JwtPayload;
}

const tokenMiddleware: RequestHandler | any = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized: Missing or invalid token",
        });
    }

    const tokenValue = token.split(" ")[1];

    try {
        const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET || "default_secret");
        req.user = decodedToken; // Add the decoded token to the request object
        next();
    } catch (error) {
        console.error("JWT Error:", error);
        return res.status(401).json({
            message: "Unauthorized: Invalid token",
        });
    }
};

export default tokenMiddleware;
