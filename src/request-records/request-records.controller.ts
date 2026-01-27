import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { RegistrosSolicitudesService, RegistroSolicitud } from './request-records.service';

@Controller('registros-solicitudes')
export class RegistrosSolicitudesController {
  constructor(private readonly registrosSolicitudesService: RegistrosSolicitudesService) {}

  @Get('por-paciente/:patientNumber')
  async obtenerPorPaciente(
    @Param('patientNumber') patientNumber: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<RegistroSolicitud[]> {
    const records = await this.registrosSolicitudesService.buscarPorPaciente(patientNumber, startDate, endDate);
    if (records == null) {
      throw new NotFoundException('No se encontraron registros para este paciente');
    }
    return records;
  }

  @Get('por-cirujano/:surgeonRut')
  async obtenerPorCirujano(
    @Param('surgeonRut') surgeonRut: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<RegistroSolicitud[]> {
    const records = await this.registrosSolicitudesService.buscarPorCirujano(surgeonRut, startDate, endDate);
    if (records == null) {
      throw new NotFoundException('No se encontraron registros para este cirujano');
    }
    return records;
  }

  @Get('por-prestacion/:procedureCode')
  async obtenerPorPrestacion(
    @Param('procedureCode') procedureCode: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<RegistroSolicitud[]> {
    const records = await this.registrosSolicitudesService.buscarPorPrestacion(procedureCode, startDate, endDate);
    if (records == null) {
      throw new NotFoundException('No se encontraron registros para esta prestación');
    }
    return records;
  }
}
