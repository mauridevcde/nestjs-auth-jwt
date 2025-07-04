import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Profile) private readonly userRepository: Repository<User>
  ) { }

  async create(data: CreateProfileDto): Promise<Profile> {

    const user = await this.userRepository.findOne({ where: { id: data.userId } });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const profile = this.profileRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      user: user, // Ahora user está definido
    });

    return this.profileRepository.save(profile);
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
