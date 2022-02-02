import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    HttpCode,
    Query,
  } from '@nestjs/common';
import { PaginationHelper } from 'libs/pagination-helper';
import { FoodNutrientsService } from './food-nutrients.service';
  
  @Controller('foods/:foodId/food-nutrients')
  export class FoodNutrientsController {
    constructor(
                private readonly foodNutrientsService: FoodNutrientsService,
              ) {}

  @Get()
  foodNutrients(
    @Param('foodId') foodId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const { skip, take } = PaginationHelper.getSkipTake(page, limit);
    return this.foodNutrientsService.foodNutrients(foodId, skip, take);
  }
}
  