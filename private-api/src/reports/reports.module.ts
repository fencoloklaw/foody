import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Reports } from './entities/reports.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { UserFoodsModule } from 'src/user-foods/user-foods.module';
import { FoodsModule } from 'src/foods/foods.module';
import { NutrientsModule } from 'src/nutrients/nutrients.module';
import { FoodNutrientsModule } from 'src/food-nutrients/food-nutrients.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reports]), 
  UsersModule, 
  UserFoodsModule, 
  FoodsModule, 
  NutrientsModule,
  FoodNutrientsModule
],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
