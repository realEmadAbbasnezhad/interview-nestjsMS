export class LoggerDto {
    message: string;
    scope: string;
}

export class LoggerGetDto {
    time_max: string | undefined;
    time_min: string | undefined;
    scope: string | undefined;
}


export class LoggerGetResultDto {
    messages: {
        message: string
        scope: string
        timestamp: string
    }[]
}
