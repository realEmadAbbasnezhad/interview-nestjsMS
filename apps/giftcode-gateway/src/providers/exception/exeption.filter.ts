import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';
import {Request, Response} from 'express';
import {ExceptionDto, FinalExceptionDto} from '@gateway/providers/exception/exception.dto';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse = exception instanceof HttpException
            ? exception.getResponse()
            : {message: (exception as Error).message};

        const errorResponse: ExceptionDto = {
            validationErrors: exceptionResponse['validationErrors'],
            message: exceptionResponse['message'] || 'Internal server error',
        };

        let message: string | { [key: string]: string } = errorResponse.message;
        if (errorResponse.validationErrors) {
            let errors: { [key: string]: string } = {}
            errorResponse.validationErrors.forEach((i) => {
                errors[i.property] = i.toString();
            });
            message = errors;
        }

        response.status(status).json({
            message: message,
            timestamp: new Date().toISOString(),
            path: request.url,
        } as FinalExceptionDto);
    }
}