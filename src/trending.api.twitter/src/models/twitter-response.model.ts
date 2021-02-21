import { TrendTopic } from "./trend-topic.model";

export class TwitterResponse {
    constructor() {
        this.trends = [];
        this.as_of = undefined;
        this.created_at = undefined;
        this.locations = undefined;
    }

    public trends: Array<TrendTopic>;
    public as_of?: Date;
    public created_at?: Date;
    public locations?: Array<{ name: string, woeid: number }>;
}