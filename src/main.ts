import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as swaggerUi from 'swagger-ui-express';

const openApiDoc = {
  openapi: '3.0.0',
  info: {
    title: 'API Peticiones',
    version: '1.0.0',
    description: 'API para consultas de pacientes y peticiones',
  },
  paths: {
    '/patients/by-rut/{rut}': {
      get: {
        summary: 'Busca paciente por RUT y devuelve número de paciente',
        parameters: [
          {
            name: 'rut',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'RUT del paciente',
          },
        ],
        responses: {
          '200': {
            description: 'Número de paciente encontrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { patientNumber: { type: 'number' } },
                },
              },
            },
          },
          '404': { description: 'Paciente no encontrado' },
        },
      },
    },
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.use('/api', swaggerUi.serve, swaggerUi.setup(openApiDoc));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
