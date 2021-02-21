export interface ILoggerService {
    LogInfo(message: string, extra: any);
    LogError(message: string, err: any);
    Transports: Array<any>;
}
