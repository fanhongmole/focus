import { GlobalState } from './global';
import { HomeState } from './home';
import { TodoState } from './todo';

export { GlobalState, HomeState, TodoState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    todo: boolean;
    home: boolean;
  };
}

export interface Route {
  routes?: Route[];
}

export interface MenusDate {
  title: string;
  link: string;
  key: string;
  icon: string;
  children: any;
}
