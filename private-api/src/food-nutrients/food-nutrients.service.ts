import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodNutrient } from './entities/food-nutrient.entity';

@Injectable()
export class FoodNutrientsService {
  constructor(
    @InjectRepository(FoodNutrient) 
    private foodNutrientRepository: Repository<FoodNutrient>,
  ) {}

  foodNutrients(foodId: number, skip = 0, take = 25) {
    return this.foodNutrientRepository.find({
      where: { foodId },
      skip,
      take,
    });
  }
}
