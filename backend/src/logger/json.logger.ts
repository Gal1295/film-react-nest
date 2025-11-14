import { LoggerService, Injectable } from '@nestjs/common';

export interface LogObject {
  level: string;
  message: any;
  optionalParams?: any[];
  timestamp: string;

  context?: string;
  trace?: string;
}

@Injectable()
export class JsonLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: any,
    context?: string,
    ...optionalParams: any[]
  ): string {
    const logObject: LogObject = {
      level,
      message,
      optionalParams: optionalParams.length > 0 ? optionalParams : undefined,
      timestamp: new Date().toISOString(),
      context,
    };
    return JSON.stringify(logObject);
  }

  log(message: any, context?: string, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, context, ...optionalParams));
  }

  error(
    message: any,
    trace?: string,
    context?: string,
    ...optionalParams: any[]
  ) {
    if (trace && typeof trace === 'string' && !context) {
      console.error(
        this.formatMessage('error', message, context, trace, ...optionalParams),
      );
    } else {
      const logObject: LogObject = {
        level: 'error',
        message,
        trace,
        optionalParams: optionalParams.length > 0 ? optionalParams : undefined,
        timestamp: new Date().toISOString(),
        context,
      };
      console.error(JSON.stringify(logObject));
    }
  }

  warn(message: any, context?: string, ...optionalParams: any[]) {
    console.warn(
      this.formatMessage('warn', message, context, ...optionalParams),
    );
  }

  debug?(message: any, context?: string, ...optionalParams: any[]) {
    console.debug(
      this.formatMessage('debug', message, context, ...optionalParams),
    );
  }

  verbose?(message: any, context?: string, ...optionalParams: any[]) {
    console.log(
      this.formatMessage('verbose', message, context, ...optionalParams),
    );
  }
}
