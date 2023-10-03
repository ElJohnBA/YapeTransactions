import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { Account } from 'src/accounts/entities/account.entity';
import { Transaction } from 'src/accounts/entities/transaction.entity';

export default registerAs(
    'orm.config',
    ():   TypeOrmModuleOptions => ({
        type:'mysql',
        host:process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Transaction, Account],
        synchronize: true
    })
);
