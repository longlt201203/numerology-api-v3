import { Account } from "@entities";
import { ProfileDto } from "./profile.dto";

export class AuthenticateResponseDto {
    profile: ProfileDto;
    accessToken: string;

    static from(account: Account, accessToken: string): AuthenticateResponseDto {
        return {
            profile: ProfileDto.fromAccount(account),
            accessToken: accessToken
        }
    }
}