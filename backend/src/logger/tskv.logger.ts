// src/logger/tskv.logger.ts
import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatMessage(level: string, message: any, context?: string, ...optionalParams: any[]): string {
    // Простой объект для TSKV
    const logEntry: Record<string, string> = {
      time: new Date().toISOString(), // time как строка
      level: level.toString(),        // level как строка
      message: typeof message === 'object' ? JSON.stringify(message) : message.toString(), // message как строка
    };

    if (context) {
      logEntry.context = context.toString();
    }

    if (optionalParams.length > 0) {
      // optionalParams как одна строка (например, JSON)
      logEntry.optionalParams = JSON.stringify(optionalParams);
    }

    // Собираем строку TSKV: key1=value1\tkey2=value2\t...\n
    return Object.entries(logEntry)
      .map(([key, value]) => `${key}=${value}`)
      .join('\t') + '\n';
  }

  log(message: any, context?: string, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('log', message, context, ...optionalParams));
  }

  error(message: any, trace?: string, context?: string, ...optionalParams: any[]) {
    const logEntry: Record<string, string> = {
      time: new Date().toISOString(),
      level: 'error',
      message: typeof message === 'object' ? JSON.stringify(message) : message.toString(),
    };

    if (context) {
      logEntry.context = context.toString();
    }
    if (trace) {
      logEntry.trace = trace.toString(); // Добавляем трейс
    }
    if (optionalParams.length > 0) {
      logEntry.optionalParams = JSON.stringify(optionalParams);
    }

    const logLine = Object.entries(logEntry)
      .map(([key, value]) => `${key}=${value}`)
      .join('\t') + '\n';

    process.stderr.write(logLine); // Используем stderr для ошибок
  }

  warn(message: any, context?: string, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('warn', message, context, ...optionalParams));
  }

  debug?(message: any, context?: string, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('debug', message, context, ...optionalParams));
  }

  verbose?(message: any, context?: string, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('verbose', message, context, ...optionalParams));
  }
}
