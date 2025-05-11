import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
      origin: '*',
      methods: "GET,POST,HEAD,PUT,DELETE,PATCH",
      allowedHeaders: "Content-type, Authorization"
  })
  await app.listen(3000);
}
bootstrap();
