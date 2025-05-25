
import { WatcherClient } from "./client";

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export class WatcherService extends WatcherClient {
    constructor() {
        super(baseUrl)
    }
}
