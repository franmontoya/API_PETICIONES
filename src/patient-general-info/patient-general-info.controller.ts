import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { InfoGeneralPacienteService, DatosGeneralesPaciente } from './patient-general-info.service';

@Controller('info-general-paciente')
export class InfoGeneralPacienteController {
  constructor(private readonly infoGeneralPacienteService: InfoGeneralPacienteService) {}

  @Get('por-rut/:rut')
  async obtenerPorRut(@Param('rut') rut: string): Promise<DatosGeneralesPaciente> {
    const patientData = await this.infoGeneralPacienteService.buscarPorRut(rut);
    if (patientData == null) {
      throw new NotFoundException('Paciente no encontrado');
    }
    return patientData;
  }

  @Get('por-numero-paciente/:patientNumber')
  async obtenerPorNumeroPaciente(@Param('patientNumber') patientNumber: string): Promise<DatosGeneralesPaciente> {
    const patientData = await this.infoGeneralPacienteService.buscarPorNumeroPaciente(Number(patientNumber));
    if (patientData == null) {
      throw new NotFoundException('Paciente no encontrado');
    }
    return patientData;
  }

  @Get('por-ficha/:fileNumber')
  async obtenerPorFicha(@Param('fileNumber') fileNumber: string): Promise<DatosGeneralesPaciente> {
    const patientData = await this.infoGeneralPacienteService.buscarPorFicha(Number(fileNumber));
    if (patientData == null) {
      throw new NotFoundException('Paciente no encontrado');
    }
    return patientData;
  }
}
