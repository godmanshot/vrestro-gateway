import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class RegisterDto {

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @MinLength(3)
    first_name: string;

    @ApiProperty()
    @MinLength(6)
    password: string;
    
}