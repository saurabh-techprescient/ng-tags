import { ResponseCode } from '../enums/response-code';

export interface ErrorResponse {
  errorCode: ResponseCode;
  errorMsg: string;
}
