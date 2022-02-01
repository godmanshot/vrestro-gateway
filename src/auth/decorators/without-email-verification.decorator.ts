import { SetMetadata } from "@nestjs/common";

export const WithoutEmailVerification = () => SetMetadata('email-verification', false);