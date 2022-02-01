import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { OauthType } from "../enum/oauth.types";

export class OauthTypeDto {

    @ApiProperty({
        enum: OauthType
    })
    @IsEnum(OauthType)
    type: OauthType;
    
}