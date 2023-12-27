declare type IResponseType<DataType = {}, ErrorType = string> = {
  ok: boolean;
  message?: string;
  data?: DataType;
  error?: ErrorType;
  code?: number;
};
