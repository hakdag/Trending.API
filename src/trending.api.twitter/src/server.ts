require('dotenv').config();

var app = require('express')();
var http = require('http').Server(app);
const cors = require("cors");
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { GrayLoggerService, TrendTopicsService } from "./services";
import { GraylogSettings, TwitterSettings } from './models';
import { CommonRoutesConfig, TrendTopicsRoutes } from './routes';
import { TrendTopicsController } from './controller/trend-topics.controller';

/* Graylog setup */
const graylogSettings = new GraylogSettings();
const logger = new GrayLoggerService(graylogSettings); // singleton
logger.LogInfo("Logging started.", null);
/* Graylog setup */

/* cors setup */
app.use(
    cors({
        origin: function (_, callback) {
            return callback(null, true);
        },
        methods: "GET, POST, PUT",
        optionsSuccessStatus: 200,
        credentials: true,
    })
);
/* cors setup end */

// here we are configuring the expressWinston logging middleware,
// which will automatically log all HTTP requests handled by Express.js
app.use(expressWinston.logger({
    transports: logger.Transports,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

/* Routes setup */
const twitterSettings = <TwitterSettings>{ TrendsUrl: process.env.Twitter_API_URL, Token: process.env.Twitter_API_Token };
const service = new TrendTopicsService(twitterSettings);
const routes: Array<CommonRoutesConfig> = [
    new TrendTopicsRoutes(
        app,
        new TrendTopicsController(service),
        logger
    )
];
/* Routes setup end */

// here we are configuring the expressWinston error-logging middleware,
// which doesn't *handle* errors per se, but does *log* them
app.use(expressWinston.errorLogger({
    transports: logger.Transports,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

http.listen(process.env.port, function () {
    logger.LogInfo(`listening on *: ${process.env.port}`, null);
});
