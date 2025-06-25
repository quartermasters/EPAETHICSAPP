interface LogLevel {
  ERROR: 'error';
  WARN: 'warn';
  INFO: 'info';
  DEBUG: 'debug';
}

const LOG_LEVELS: LogLevel = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

class Logger {
  private isDevelopment: boolean;
  private logLevel: string;

  constructor() {
    this.isDevelopment = __DEV__;
    this.logLevel = this.isDevelopment ? 'debug' : 'error';
  }

  private shouldLog(level: string): boolean {
    const levels = ['error', 'warn', 'info', 'debug'];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    
    return messageLevelIndex <= currentLevelIndex;
  }

  private formatMessage(level: string, message: string, ...args: any[]): string {
    const timestamp = new Date().toISOString();
    const formattedArgs = args.length > 0 ? JSON.stringify(args) : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message} ${formattedArgs}`;
  }

  private log(level: string, message: string, ...args: any[]): void {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, message, ...args);

    switch (level) {
      case LOG_LEVELS.ERROR:
        console.error(formattedMessage);
        break;
      case LOG_LEVELS.WARN:
        console.warn(formattedMessage);
        break;
      case LOG_LEVELS.INFO:
        console.info(formattedMessage);
        break;
      case LOG_LEVELS.DEBUG:
        console.log(formattedMessage);
        break;
      default:
        console.log(formattedMessage);
    }

    // In production, you might want to send logs to a remote service
    if (!this.isDevelopment && level === LOG_LEVELS.ERROR) {
      this.sendToRemoteLogger(level, message, args);
    }
  }

  private async sendToRemoteLogger(level: string, message: string, args: any[]): Promise<void> {
    try {
      // Implementation for remote logging service
      // This could be Sentry, LogRocket, or custom analytics
      console.log('Would send to remote logger:', { level, message, args });
    } catch (error) {
      console.error('Failed to send log to remote service:', error);
    }
  }

  error(message: string, ...args: any[]): void {
    this.log(LOG_LEVELS.ERROR, message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.log(LOG_LEVELS.WARN, message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.log(LOG_LEVELS.INFO, message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    this.log(LOG_LEVELS.DEBUG, message, ...args);
  }

  // Utility methods for common logging scenarios
  apiCall(method: string, url: string, data?: any): void {
    this.debug(`API ${method.toUpperCase()}: ${url}`, data);
  }

  apiResponse(method: string, url: string, status: number, data?: any): void {
    const level = status >= 400 ? LOG_LEVELS.ERROR : LOG_LEVELS.DEBUG;
    this.log(level, `API ${method.toUpperCase()} ${status}: ${url}`, data);
  }

  userAction(action: string, details?: any): void {
    this.info(`User action: ${action}`, details);
  }

  performance(operation: string, duration: number): void {
    this.debug(`Performance: ${operation} took ${duration}ms`);
  }

  navigation(from: string, to: string): void {
    this.debug(`Navigation: ${from} -> ${to}`);
  }

  auth(action: string, userId?: string): void {
    this.info(`Auth: ${action}`, userId ? { userId } : undefined);
  }

  error_boundary(error: Error, errorInfo?: any): void {
    this.error('Error boundary caught:', { 
      message: error.message, 
      stack: error.stack, 
      errorInfo 
    });
  }
}

export const logger = new Logger();
export default logger;