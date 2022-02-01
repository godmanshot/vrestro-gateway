import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailMustBeVerifiedException extends HttpException {
    constructor() {
      super({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Email address must be verified',
        error: 'Forbidden',
        reason: 10001,
      }, HttpStatus.FORBIDDEN);
    }
  }