import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import { BusinessRuleValidationProblem } from '../problem-handling/business-rule-validation.problem';
import { ILoggerService } from '../interfaces/ilogger.service';

export const handleBusinessError = (logger: ILoggerService, source: string, res: Response, err: any) => {
    if (err instanceof BusinessRuleValidationProblem) {
        logger.LogError(`[${source}] Server error: ${err.detail}`, null);
        res
            .status(err.status)
            .json(err);
    } else {
        logger.LogError(`[${source}] Server error: ${err.message}`, null);
        const message = process.env.env === 'dev'
            ? err.message
            : 'Internal server error';
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(message);
    }
};
