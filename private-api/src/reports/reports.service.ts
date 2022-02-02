import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reports } from './entities/reports.entity';

@Injectable()
export class ReportsService {
  reports: Reports;
  constructor(
    @InjectRepository(Reports) private reportsRepository: Repository<Reports>,
  ) {
    this.reports = reportsRepository.create({
      id: 0,
      name: "",
      unitName: "",
      weeklyAmount: 0
    })
  }

  getReports() {
    return this.reports;
  }

  setNutrientId(id: number) {
    this.reports.id = id;
  }

  setWeeklyAmount(weeklyAmount: number) {
    this.reports.weeklyAmount = weeklyAmount;
  }

  setName(name: string) {
    this.reports.name = name;
  }

  setUnitName(unitName: string) {
    this.reports.unitName = unitName;
  }


}
