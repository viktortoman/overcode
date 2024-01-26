import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {BadRequestException, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors) => {
                const result = errors.map((error) => ({
                    property: error.property,
                    message: error.constraints[Object.keys(error.constraints)[0]],
                }));
                return new BadRequestException(result);
            },
            stopAtFirstError: true,
        }),
    );

    await app.listen(3000);

    // show all routes
    const server = app.getHttpServer();
    const router = server._events.request._router;
    const availableRoutes: [] = router.stack
        .map((layer) => {
            if (layer.route) {
                return {
                    route: {
                        path: layer.route.path,
                        method: layer.route.stack[0].method,
                    },
                };
            }
        })
        .filter((item) => item !== undefined);
    console.log(availableRoutes);
}

bootstrap();
