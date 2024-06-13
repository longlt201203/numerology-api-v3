import { ApiProperty } from "@nestjs/swagger";
import { CallbackMode, OAuthProvider } from "@utils";
import { IsEnum } from "class-validator";

export class GetLoginUriQuery {
    @ApiProperty({ enum: OAuthProvider })
    @IsEnum(OAuthProvider)
    provider: OAuthProvider;

    @ApiProperty({ enum: CallbackMode })
    @IsEnum(CallbackMode)
    callbackMode: CallbackMode;
}