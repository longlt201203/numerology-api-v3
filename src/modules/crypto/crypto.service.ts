import { Injectable } from "@nestjs/common";
import { Env } from "@utils";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@Injectable()
export class CryptoService {
    generateRandomPassword() {
        const length = 12;
        const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
        const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';
    
        const allCharacters = lowerCase + upperCase + numbers + specialChars;
    
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allCharacters.length);
            password += allCharacters[randomIndex];
        }
    
        return password;
    }
    

    hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    isPasswordMatch(hashedPassword: string, password: string) {
        return bcrypt.compare(password, hashedPassword);
    }

    signJwtToken(id: string) {
        return jwt.sign({}, Env.JWT_SECRET, {
            subject: id,
            issuer: Env.JWT_ISSUER,
            expiresIn: Env.JWT_EXPIRES_IN
        });
    }

    verifyJwtToken(token: string) {
        const data = jwt.verify(token, Env.JWT_SECRET, {
            issuer: Env.JWT_ISSUER
        });
        return typeof data === "string" ? null : data.sub;
    }


}