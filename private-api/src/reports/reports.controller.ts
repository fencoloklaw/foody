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
import { FoodNutrientsService } from 'src/food-nutrients/food-nutrients.service';
import { FoodsService } from './../foods/foods.service';
import { NutrientsService } from './../nutrients/nutrients.service';
import { UserFoodsService } from './../user-foods/user-foods.service';
import { UsersService } from './../users/users.service';
import { ReportsService } from './reports.service';
  
  @Controller('users/:userId/reports')
  export class ReportsController {
    constructor(public reportsService: ReportsService,
                private readonly usersService: UsersService,
                private readonly userFoodsService: UserFoodsService,
                private readonly foodsService: FoodsService,
                private readonly nutrientsService: NutrientsService,
                private readonly foodNutrientsService: FoodNutrientsService,
              ) {}

    @Get('most-consumed-nutrient')
    mostConsumedNutrient(@Param('userId') userId: number) {
      var result = {
        id: 0,
        name: "",
        unitName: "",
        weeklyAmount: 0
      }
      this.userFoodsService.findFoods(userId)
      .then((userFoods) => {
        var largestWeeklyTotal = 0;
        var largestNutrientId = 0;
        userFoods.forEach(foods => {
          var foodId = foods.foodId;
          var servingsPerWeek = foods.servingsPerWeek;
          this.foodNutrientsService.foodNutrients(foodId)
          .then((foodNutrients) => {
              foodNutrients.forEach(fn => {
              var nutrientId = fn.nutrientId;
              var amountPerServing = fn.amountPerServing;
              var weeklyTotal = amountPerServing * servingsPerWeek;
              if (weeklyTotal > largestWeeklyTotal) {
                largestWeeklyTotal = weeklyTotal;
                largestNutrientId = nutrientId;
                this.nutrientsService.findOne(largestNutrientId).then((res) => {
                  result.id = largestNutrientId;
                  result.name = res.name;
                  result.unitName = res.unitName;
                  result.weeklyAmount = largestWeeklyTotal;
                });
              }
            });
          });
        });
      });
      return result;
    }
  }