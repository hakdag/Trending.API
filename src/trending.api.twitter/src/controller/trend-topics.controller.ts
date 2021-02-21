import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
const { OK } = StatusCodes;

import { TrendTopicsService } from "../services";

export class TrendTopicsController {
    constructor(private trendTopicsService: TrendTopicsService) {}

    public async Get(req: Request, res: Response): Promise<void> {
        const response = await this.trendTopicsService.Get();

        res
            .status(OK)
            .json(response.trends);
    }
}