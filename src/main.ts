import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApplicationConfiguration } from './application.configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(app.get(ApplicationConfiguration).port());
}
bootstrap();
