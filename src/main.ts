import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from './shared/pipes';
import { HttpExceptionFilter } from './shared/exceptions';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    // exibir excecoes personalizadas
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(7001);
}
bootstrap();
