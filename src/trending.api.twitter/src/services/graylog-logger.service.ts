import { ILoggerService } from "../interfaces/ilogger.service";
import { GraylogSettings } from "../models";

var winston = require('winston');
// dont remove the following line
var winstonTCPGraylog = require('winston-tcp-graylog');

export class GrayLoggerService implements ILoggerService {
    constructor(private graylogSettings: GraylogSettings) {
        const options = this.getOptions();
        this.buildLogger(options);
    }

    private logger;

    private getOptions() {
        return {
            gelfPro: {
                adapterName: 'tcp',
                adapterOptions: {
                    host: this.graylogSettings.Ip,
                    port: this.graylogSettings.Port
                }
            }
        };
    }

    private buildLogger(options) {
        const wGraylog = new winston.transports.TcpGraylog(options);
        const wConsole = new winston.transports.Console();
        this.Transports = [wGraylog, wConsole];

        wGraylog
            .on('error', err => {
                // internal WinstonTcpGraylog problems
                console.error(' !wtg:error: ', err)
            })
            .on('send', (msg, res) => {
                // only WinstonTcpGraylog "logging"
                console.info(msg.full_message)
            })
            .on('skip', warn => {
                // only WinstonTcpGraylog "skiping"
                console.warn(' !wtg:skip: ', warn)
            });

        this.logger = new winston.createLogger({
            transports: this.Transports
        });

        this.logger
            .on('error', err => {
                // internal winston problems
                console.error(' !error: ', err)
            })
            .on('logging', (transport, level, msg, meta) => {
                // each winston transports
                console.info(' !logging: ', transport.name, level, msg, meta)
            });
    }

    public Transports;

    public LogInfo(message: string, extra: any = null) {
        if (extra) {
            this.logger.info(message, extra);
        } else {
            this.logger.info(message);
        }
    }

    public LogError(message: string, err = null) {
        if (err) {
            this.logger.error(message, err);
        } else {
            this.logger.error(message);
        }
    }
}
