import { WatcherClient } from "./client";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export class WatcherService extends WatcherClient {
    constructor() {
        super(baseUrl)
    }
  }