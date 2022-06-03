import { ResponseCode } from '../enums/response-code';

export interface SuccessResponse {
  responseCode: ResponseCode;
  responseMsg: string;
}
