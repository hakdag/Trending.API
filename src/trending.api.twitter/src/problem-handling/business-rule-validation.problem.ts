import { StatusCodes } from "http-status-codes";

export class BusinessRuleValidationProblem {
    constructor(title: string, detail: string, status: StatusCodes) {
        this.title = title;
        this.detail = detail;
        this.status = status;
    }

    public title: string;
    public detail: string;
    public status: StatusCodes;

    static CreateNew(details: string): BusinessRuleValidationProblem {
        const title = 'Business rule validation error';
        return new BusinessRuleValidationProblem(title, details, StatusCodes.CONFLICT);
    }
}
