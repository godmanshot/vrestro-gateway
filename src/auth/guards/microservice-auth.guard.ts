import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { lastValueFrom, timeout } from 'rxjs';
import { EmailMustBeVerifiedException } from '../exceptions/email-must-be-verified.exception';
import { SetMetadata } from '@nestjs/common';

@Injectable()
export class MicroserviceAuthGuard implements CanActivate {

  constructor(
    @Inject('AUTH_SERVICE') private authService: ClientProxy,
    private reflector: Reflector,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ) {

    let token = context.switchToHttp().getRequest<Request>().query.token;

    if(token === undefined || token === '') {
      token = (context.switchToHttp().getRequest<Request>().header('Authorization') ?? '').replace('Bearer ', '');

      if(token === undefined || token === '') {
        throw new UnauthorizedException("Unauthorized");
      }
    }

    const authResponse = await lastValueFrom(this.authService.send({ cmd: 'auth.verify' }, { token }).pipe(timeout(10000)));

    if(!authResponse) {
      throw new UnauthorizedException("Unauthorized");
    }
    
    context.switchToHttp().getRequest().user = authResponse;

    const need_email_verification = this.reflector.getAllAndOverride<boolean>('email-verification', [
      context.getHandler(),
      context.getClass(),
    ]);

    const is_verified = authResponse.email_confirmed_at != undefined;
    if((need_email_verification === undefined || need_email_verification === true) && !is_verified) {
      throw new EmailMustBeVerifiedException();
    }

    return true;

  }
}

export const WithoutEmailVerification = () => SetMetadata('email-verification', false);