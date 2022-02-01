import { BadRequestException, Controller, Get, Inject, Query, Redirect, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroUser } from 'src/auth/decorators/micro-user.decorator';
import { MicroserviceAuthGuard } from 'src/auth/guards/microservice-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateDto } from './dto/update.dto';
import { SendVerifyEmailDto } from './dto/send-verify-email.dto';
import { EmailVerificationDto } from './dto/email-verification.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WithoutEmailVerification } from './decorators/without-email-verification.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE') private authClient: ClientProxy,
        @Inject('USERS_SERVICE') private usersClient: ClientProxy,
    ) {}

    @Get('/register')
    register(@Query() data: RegisterDto) {
        return this.authClient.send({ cmd: 'auth.register' }, {
            login: data.email,
            email: data.email,
            first_name: data.first_name,
            password: data.password
        });
    }

    @Get('/login')
    login(@Query() data: LoginDto) {
        return this.authClient.send({ cmd: 'auth.login' }, {
            login: data.email,
            password: data.password,
        });
    }

    @Get('/verification/send-verify-email')
    sendVerifyEmail(@Query() data: SendVerifyEmailDto) {
        return this.usersClient.send({ cmd: 'users.sendEmailVerificationCode' }, {
            email: data.email
        });
    }

    @Get('/verification/email')
    emailVerification(@Query() data: EmailVerificationDto) {
        return this.usersClient.send({ cmd: 'users.emailVerification' }, {
            email: data.email,
            verification_code: data.verification_code,
        });
    }

    @ApiBearerAuth()
    @Get('/update')
    @UseGuards(MicroserviceAuthGuard)
    update(@Query() data: UpdateDto, @MicroUser() user) {
        return this.usersClient.send({ cmd: 'users.update' }, {
            login: user.login,
            first_name: data.first_name,
            last_name: data.last_name,
            birth_date: data.birth_date,
        });
    }

    @ApiBearerAuth()
    @Get('/account')
    @UseGuards(MicroserviceAuthGuard)
    @WithoutEmailVerification()
    account(@MicroUser() user) {
        return this.usersClient.send({ cmd: 'users.findByLogin' }, {
            login: user.login
        });
    }
}
