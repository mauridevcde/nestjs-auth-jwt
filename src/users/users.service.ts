import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>
    ) { }

    async create(createUserDto: CreateUserDto) {
        return await this.usersRepository.save(createUserDto)
    }

    async findOneByEmail(email: string) {
        return await this.usersRepository.findOneBy({ email });
    }

}
