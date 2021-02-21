export class GraylogSettings {
    public get Ip(): string {
        return process.env.graylog_ip;
    }

    public get Port(): number {
        return +process.env.graylog_port;
    }
}
