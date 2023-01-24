import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { Advertisement } from './entities/advertisement.entity';

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectRepository(Advertisement)    
    private advertisementRepository: Repository<Advertisement>
  ){}
  
  async create(createAdvertisementDto: CreateAdvertisementDto) {
    return await this.advertisementRepository.save(createAdvertisementDto);
  }

  async findAll() {
    return await this.advertisementRepository.createQueryBuilder("advertisement").getMany();
  }

  async findOne(id: number) {
    return await this.advertisementRepository.createQueryBuilder("advertisement")
    .where(`advertisement.id =${id}`).getOne();

  }

  async update(id: number, updateAdvertisementDto: UpdateAdvertisementDto) {
    return await this.advertisementRepository.update(+id, updateAdvertisementDto);
  }

  async remove(id: number) {
    return await this.advertisementRepository.delete(id);
  }
}
