import { CommonRoutesConfig } from ".";
import { TrendTopicsController } from "../controller/trend-topics.controller";
import { ILoggerService } from "../interfaces/ilogger.service";
import { handleBusinessError } from "../shared/functions";

export class TrendTopicsRoutes extends CommonRoutesConfig {
    constructor(
        protected app: any,
        private controller: TrendTopicsController,
        private logger: ILoggerService
    ) {
        super(app, 'TrendTopicsRoutes');
    }

    public ConfigureRoutes() {
        this.app.route(`/api/trend-topics`)
            .get(async (req, res) => {
                await this.controller
                    .Get(req, res)
                    .catch(err => handleBusinessError(this.logger, 'TrendTopicsRoutes', res, err));
            });
    }
}
