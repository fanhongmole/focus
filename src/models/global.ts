import menusSource from '../../config/router.config';
import { MenusDate } from './connect.d';

export interface GlobalState {
  menusData: MenusDate[];
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalState;
  effects: {};
  reducers: {};
  subscriptions: {};
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    menusData: menusSource,
  },
  effects: {},
  reducers: {},
  subscriptions: {},
};

export default GlobalModel;
