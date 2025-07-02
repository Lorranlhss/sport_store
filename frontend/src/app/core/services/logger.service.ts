import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3
}

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    private logLevel: LogLevel = environment.production ? LogLevel.ERROR : LogLevel.DEBUG;

    error(message: string, ...args: any[]): void {
        if (this.logLevel >= LogLevel.ERROR) {
            console.error(`[ERROR] ${message}`, ...args);
        }
    }

    warn(message: string, ...args: any[]): void {
        if (this.logLevel >= LogLevel.WARN) {
            console.warn(`[WARN] ${message}`, ...args);
        }
    }

    info(message: string, ...args: any[]): void {
        if (this.logLevel >= LogLevel.INFO) {
            console.info(`[INFO] ${message}`, ...args);
        }
    }

    debug(message: string, ...args: any[]): void {
        if (this.logLevel >= LogLevel.DEBUG) {
            console.log(`[DEBUG] ${message}`, ...args);
        }
    }

    setLogLevel(level: LogLevel): void {
        this.logLevel = level;
    }
}