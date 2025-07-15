import winston from "winston";
import { NextRequest } from "next/server";

const createLogger = (options?: { debugMode?: boolean }) => {
  const isDebug = options?.debugMode ?? false;

  const logFormat = winston.format.printf(
    ({ level, message, timestamp, stack, ...metadata }) => {
      let log = `${timestamp} [${level}] ${message}`;
      
      if (stack) {
        log += `\n${stack}`;
      }
      
      if (metadata.context && isDebug) {
        log += `\nContext: ${JSON.stringify(metadata.context, null, 2)}`;
      }
      
      return log;
    }
  );

  const logger = winston.createLogger({
    level: isDebug ? 'debug' : 'info',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      logFormat
    ),
    transports: [new winston.transports.Console()],
  });

  const extendedLogger = Object.assign(logger, {
    logRequest: (req: NextRequest) => {
      if (!isDebug) return;
      
      logger.debug(`Request: ${req.method} ${req.nextUrl.pathname}`, {
        context: {
          query: Object.fromEntries(req.nextUrl.searchParams),
          // @ts-ignore
          ip: req.ip || req.headers.get('x-forwarded-for'),
          userAgent: req.headers.get('user-agent'),
        }
      });
    },

    logError: (error: unknown, context: string, req?: NextRequest) => {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const stack = error instanceof Error ? error.stack : undefined;

      logger.error(`[${context}] ${errorMessage}`, {
        stack,
        ...(req && isDebug && {
          request: {
            method: req.method,
            path: req.nextUrl.pathname,
            params: Object.fromEntries(req.nextUrl.searchParams),
          }
        })
      });
    }
  });

  return extendedLogger;
};

const logger = createLogger();

export { logger, createLogger };
