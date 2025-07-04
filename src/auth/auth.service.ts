import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from "bcryptjs"
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from 'src/profile/profile.service';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';
import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly dataSource: DataSource // Cambiamos Connection por DataSource

    ) { }

    async register({ password, email, name, firstName, lastName, age }: RegisterDto) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();


        try {
            // 1. Verificar si el usuario ya existe
            const existingUser = await queryRunner.manager.findOne(User, {
                where: { email }
            });

            if (existingUser) {
                throw new BadRequestException("Email already exists");
            }

            // 2. Hashear la contraseña
            const hashedPassword = await bcryptjs.hash(password, 10);

            // 3. Crear y guardar el usuario con su perfil
            const user = new User();
            user.name = name;
            user.email = email;
            user.password = hashedPassword;

            const profile = new Profile();
            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.age = age;

            user.profile = profile;

            // Guardamos el usuario (el perfil se guardará por cascade)
            await queryRunner.manager.save(User, user);

            await queryRunner.commitTransaction();

            return {
                message: "User and profile created successfully",
                userId: user.id,
                profileId: profile.id
            };
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async login({ email, password }: LoginDto) {
        const user = await this.usersService.findOneByEmailWithPassword(email);

        if (!user) {
            throw new UnauthorizedException("Invalid email");
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid password");
        }

        const payload = { email: user.email, role: user.role };

        const token = await this.jwtService.signAsync(payload);

        return {
            token: token,
            email: user.email,
        };
    }

}
