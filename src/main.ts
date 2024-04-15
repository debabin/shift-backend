import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

import { OtpsModule } from './modules/otps';
import { UsersModule } from './modules/users';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: { origin: '*' }
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  );

  app.use('/live', (_req, res) => {
    res.json({ status: true });
  });

  const apiConfig = new DocumentBuilder()
    .setTitle('shift backend 🔥')
    .setDescription('Апи для выполнения индивидуальных заданий')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    })
    .build();

  const document = SwaggerModule.createDocument(app, apiConfig);
  SwaggerModule.setup('api', app, document);

  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('hbs');

  const testerConfig = new DocumentBuilder()
    .setTitle('shift backend 🧪')
    .setDescription('Апи для тестирования')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    })
    .build();

  const testerDocument = SwaggerModule.createDocument(app, testerConfig, {
    include: [OtpsModule, UsersModule]
  });
  SwaggerModule.setup('tester', app, testerDocument);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
