"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
require("winston-daily-rotate-file");
const logLevels = [
    'silly',
    'debug',
    'verbose',
    'info',
    'warn',
    'error',
];
const logger = winston_1.default.createLogger({
    level: logLevels.includes(process.env.LOGGER_LOG_LEVEL ?? '')
        ? process.env.LOGGER_LOG_LEVEL
        : 'info',
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp(), winston_1.default.format.splat(), winston_1.default.format.printf(info => {
        return `[${info.timestamp}] ${info.level}: ${info.message}`;
    })),
    transports: [
        new winston_1.default.transports.Console({
            handleExceptions: true,
            handleRejections: true,
        }),
        new winston_1.default.transports.DailyRotateFile({
            filename: 'combined %DATE%',
            datePattern: 'DD-MM-YYYY',
            dirname: process.env.LOGGER_DIRECTORY ?? './logs',
            extension: '.log',
            maxSize: process.env.LOGGER_FILE_SIZE ?? 1024 * 1024 * 100,
            handleExceptions: true,
            handleRejections: true,
            format: winston_1.default.format.uncolorize(),
        }),
    ],
});
exports.default = logger;
