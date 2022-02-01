import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class OauthLoginByAccessTokenDto {

    @ApiProperty()
    @IsNotEmpty()
    access_token: string;

}