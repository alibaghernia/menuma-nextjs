declare type IResponseType<DataType = {}, ErrorType = string> = {};

declare type AxiosResponseType<T = unknown> = {
  ok: boolean;
  data: T;
};
