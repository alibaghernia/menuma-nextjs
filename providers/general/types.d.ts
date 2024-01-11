import { MessageInstance } from 'antd/lib/message/interface';
import { NotificationInstance } from 'antd/lib/notification/interface';
import { FC, PropsWithChildren } from 'react';

declare type IGeneralContextProps = {};
declare type IGeneralContext = {
  addLoading: (loading_id: string) => void;
  removeLoading: (loading_id: string) => void;
  loadings: string[];
  messageApi: MessageInstance;
  notificationApi: NotificationInstance;
};

declare type IGeneralProvider = FC<PropsWithChildren<IGeneralContextProps>>;
