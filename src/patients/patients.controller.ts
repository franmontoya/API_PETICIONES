import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PatientsService, DatosPaciente } from './patients.service';

@Controller('pacientes')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get('por-rut/:rut')
  async obtenerPorRut(@Param('rut') rut: string): Promise<DatosPaciente> {
    const patientData = await this.patientsService.buscarPorRut(rut);
    if (patientData == null) {
      throw new NotFoundException('Paciente no encontrado');
    }
    return patientData;
  }

  @Get('por-ficha/:fileNumber')
  async obtenerPorFicha(@Param('fileNumber') fileNumber: string): Promise<DatosPaciente> {
    const patientData = await this.patientsService.buscarPorFicha(fileNumber);
    if (patientData == null) {
      throw new NotFoundException('Paciente no encontrado');
    }
    return patientData;
  }
}
