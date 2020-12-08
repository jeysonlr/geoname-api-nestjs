import { GeonameModule } from './geoname/geoname.module';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from './shared/pipes';
import { HttpExceptionFilter } from './shared/exceptions';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    // exibir excecoes personalizadas
    app.useGlobalFilters(new HttpExceptionFilter());

    // gerar documentacão
    const options = new DocumentBuilder()
        .setTitle('Project Geoname')
        .setDescription('The API description')
        .setVersion('1.0.0')
        .addTag('geoname')
        .setContact(
            'Jeyson Luiz Romualdo',
            'https://www.linkedin.com/in/jeyson-luiz-romualdo-86992995',
            'jeysonlr@gmail.com')
        .build();
    const document = SwaggerModule.createDocument(app, options, {
        include: [GeonameModule],
    });
    SwaggerModule.setup('documentation', app, document);

    await app.listen(7001);
}
bootstrap();
