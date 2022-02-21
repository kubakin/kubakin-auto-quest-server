import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env);
  const port = +process.env.PORT || 3000;
  const host = '0.0.0.0';
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port, host, ()=>console.log(`Started on port ${process.env.PORT}!`));
}
bootstrap();
