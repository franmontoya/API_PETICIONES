import { Module } from '@nestjs/common';
import { InfoGeneralPacienteService } from './patient-general-info.service';
import { InfoGeneralPacienteController } from './patient-general-info.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InfoGeneralPacienteController],
  providers: [InfoGeneralPacienteService],
})
export class InfoGeneralPacienteModule {}
