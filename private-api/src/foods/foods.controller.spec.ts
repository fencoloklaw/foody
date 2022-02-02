import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { of } from 'rxjs';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Food } from './entities/food.entity';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('FoodsController', () => {
  let controller: FoodsController;
  let service: FoodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodsController],
      providers: [
        FoodsService,
        { provide: getRepositoryToken(Food), useClass: mockRepository },
      ],
    }).compile();

    controller = module.get<FoodsController>(FoodsController);
    service = module.get<FoodsService>(FoodsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should call service', () => { 
      const expectedResult = new Food();
      const mySpy = jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);
      expect(controller.findOne(1)).resolves.toEqual(expectedResult);
      expect(mySpy).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should call service', () => { 
      const expectedResult = new Food();
      const mySpy = jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      expect(controller.create(1)).resolves.toEqual(expectedResult);
      expect(mySpy).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should call service', () => { 
      const expectedResult = new Array<Food>();
      const mySpy = jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);
      expect(controller.findAll("", 1, 2)).resolves.toEqual(expectedResult);
      expect(mySpy).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should call service', () => { 
      const expectedResult = new Food();
      const mySpy = jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
      expect(controller.update(1, new UpdateFoodDto())).resolves.toEqual(expectedResult);
      expect(mySpy).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should call service', () => { 
      const mySpy = jest.spyOn(service, 'remove').mockImplementation();
      controller.remove(1);
      expect(mySpy).toHaveBeenCalled();
    });
  });
});
