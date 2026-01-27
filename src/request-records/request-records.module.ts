import { Module } from '@nestjs/common';
import { RegistrosSolicitudesService } from './request-records.service';
import { RegistrosSolicitudesController } from './request-records.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RegistrosSolicitudesController],
  providers: [RegistrosSolicitudesService],
})
export class RegistrosSolicitudesModule {}
