//

import {BadRequestException, INestApplication, ValidationPipe} from "@nestjs/common";
import {ExceptionDto} from "@gateway/providers/exception/exception.dto";
import {HttpExceptionsFilter} from "@gateway/providers/exception/exeption.filter";

export async function setupValidatorAndExceptions(app: INestApplication) {
    app.useGlobalPipes(new ValidationPipe({
        exceptionFactory: (errors) => {
            throw new BadRequestException({validationErrors: errors, message: ""} as ExceptionDto)
        }
    }));
    app.useGlobalFilters(new HttpExceptionsFilter());
}