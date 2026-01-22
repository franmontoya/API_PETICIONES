import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get('by-rut/:rut')
  async getByRut(@Param('rut') rut: string) {
    const patientNumber = await this.patientsService.findByRut(rut);
    if (patientNumber == null) {
      throw new NotFoundException('Paciente no encontrado');
    }
    return { patientNumber };
  }
}
