import { Controller, Get, Inject, Param, Query, Redirect } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { OauthGetAccessTokenDto } from './dto/oauth-get-access-token.dto';
import { OauthLoginByAccessTokenDto } from './dto/oauth-login-by-access-token.dto';
import { OauthTypeDto } from './dto/oauth-type.dto';

@ApiTags('oauth')
@Controller('oauth')
export class OauthController {

    constructor(
        @Inject('AUTH_SERVICE') private authClient: ClientProxy,
    ) {}

    @Get('/:type/auth-code')
    @Redirect()
    async authCode(@Param() type: OauthTypeDto) {
        const url = await lastValueFrom(this.authClient.send({ cmd: 'oauth.getAuthUrl' }, {
            type: type.type,
        }));
        return { url: url };
    }

    @Get('/:type/access-token')
    accessToken(@Param() type: OauthTypeDto, @Query() data: OauthGetAccessTokenDto) {
        return this.authClient.send({ cmd: 'oauth.getAccessToken' }, {
            type: type.type,
            code: data.code,
        });
    }

    @Get(':type/login-by-access-code')
    loginByAccessCode(@Param() type: OauthTypeDto, @Query() data: OauthLoginByAccessTokenDto) {
        return this.authClient.send({ cmd: 'oauth.loginByAccessToken' }, {
            type: type.type,
            access_token: data.access_token,
        });
    }
}
