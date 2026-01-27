import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PatientsModule } from './patients/patients.module';
import { RequestRecordsModule } from './request-records/request-records.module';
import { PatientGeneralInfoModule } from './patient-general-info/patient-general-info.module';

@Module({
  imports: [DatabaseModule, PatientsModule, RequestRecordsModule, PatientGeneralInfoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
