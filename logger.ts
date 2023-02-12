import winston from 'winston';
import 'winston-daily-rotate-file';

const logLevels: string[] = [
    'silly',
    'debug',
    'verbose',
    'info',
    'warn',
    'error',
];

const logger = winston.createLogger({
    level: logLevels.includes(process.env.LOGGER_LOG_LEVEL ?? '')
        ? process.env.LOGGER_LOG_LEVEL
        : 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.splat(),
        winston.format.printf(info => {
            return `[${info.timestamp}] ${info.level}: ${info.message}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
            handleRejections: true,
        }),
        new winston.transports.DailyRotateFile({
            filename: 'combined %DATE%',
            datePattern: 'DD-MM-YYYY',
            dirname: process.env.LOGGER_DIRECTORY ?? './logs',
            extension: '.log',
            maxSize: process.env.LOGGER_FILE_SIZE ?? 1024 * 1024 * 100,
            handleExceptions: true,
            handleRejections: true,
            format: winston.format.uncolorize(),
        }),
    ],
});

export default logger;
