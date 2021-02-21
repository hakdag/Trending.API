import axios from "axios";
import { TwitterResponse, TwitterSettings } from "../models";

export class TrendTopicsService {
    constructor(private twitterSettings: TwitterSettings) {}

    public async Get(): Promise<TwitterResponse> {
        const config = {
            headers: { Authorization: `Bearer ${this.twitterSettings.Token!}` }
        };
        const response = await axios.get(this.twitterSettings.TrendsUrl!, config);
        console.log(response.data);
        
        return response.data[0];
    }
}