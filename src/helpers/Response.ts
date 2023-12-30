export class BaseResponse {
    public status: number;
    public message: string | null = null;
    constructor(status: number) {
        this.status = status
    }
    public setMessage(messgae: string) {
        this.message = messgae;
    }
}

export class SuccessResponse extends BaseResponse {
    public data: any;
    constructor(status: number, message: string, data: any) {
        super(status)
        this.data = data
        this.setMessage(message)
    }
}

export class ErrorResponse extends BaseResponse {
    constructor(status: number, message: string) {
        super(status)
        this.setMessage(message)
    }
}