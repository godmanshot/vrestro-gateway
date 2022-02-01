import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'AUTH_SERVICE',
            useFactory: (configService: ConfigService) => {
                return ClientProxyFactory.create({
                transport: Transport.RMQ,
                options: {
                    urls: [configService.get<string>('RABBITMQ_URL')],
                    queue: 'auth',
                    queueOptions: {
                    durable: true,
                    },
                }
                });
            },
            inject: [ConfigService]
        },

        {
            provide: 'USERS_SERVICE',
            useFactory: (configService: ConfigService) => {
                return ClientProxyFactory.create({
                transport: Transport.RMQ,
                options: {
                    urls: [configService.get<string>('RABBITMQ_URL')],
                    queue: 'users',
                    queueOptions: {
                    durable: true,
                    },
                }
                });
            },
            inject: [ConfigService]
        },
    ],
    exports: [
        'AUTH_SERVICE',
        'USERS_SERVICE',
    ]
})
export class MicroservicesModule {}
