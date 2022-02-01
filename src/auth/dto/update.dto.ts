import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateDto {

    @ApiProperty({ required: false })
    @IsOptional()
    first_name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    last_name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    birth_date: Date;

}