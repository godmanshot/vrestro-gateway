import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class OauthGetAccessTokenDto {

    @ApiProperty()
    @IsNotEmpty()
    code: string;

}