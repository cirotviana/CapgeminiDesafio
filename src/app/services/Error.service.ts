export class ErrorService {
    status: number;
    error: Error;
    constructor(response: any) {
        this.error = new Error(response.message)
        this.status = response.status
    }
}
