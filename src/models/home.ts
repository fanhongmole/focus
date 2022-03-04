import { Effect, Reducer, Subscription } from 'umi';
import { getTodayTodos, completedTodo } from '@/services/home';
import { isResOk } from '@/utils/utils';
import { SingleTodayTodoType } from '@/pages/home/data.d';

export interface HomeState {
  Id: number;
  Duration: number;
  ShowTimingPage: boolean;
  StartTime: number;
  Week: number;
  list: SingleTodayTodoType[];
  total: number;
}

export interface HomeModelType {
  namespace: string;
  state: HomeState;
  effects: {
    getTodayTodos: Effect;
    completedTodo: Effect;
  };
  reducers: {
    save: Reducer<HomeState>;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const HomeModel: HomeModelType = {
  namespace: 'home',
  state: {
    Id: 0,
    Duration: 0,
    ShowTimingPage: false,
    StartTime: Date.now(),
    Week: 0,
    list: [],
    total: 0,
  },
  effects: {
    *getTodayTodos({ payload }, { call, put, select }) {
      // 如果week为0，则更新week。防止计划过程中日期变化。
      const { Week } = yield select((state: any) => state.home);
      const _week = !Week ? payload.week : Week;
      const res = yield call(getTodayTodos, { week: _week });
      if (!isResOk(res)) return;
      const { data, total } = res;
      yield put({
        type: 'save',
        payload: { list: data, total, Week: _week },
      });
    },
    *completedTodo({ payload, callback }, { call, put, select }) {
      const res = yield call(completedTodo, { ...payload });
      const { Week } = yield select((state: any) => state.home);
      if (!isResOk(res)) return;
      const week = new Date().getDay() || 7;
      //如果当前日期和计划开始时日期不同，则初始化，请求时重新获取。
      const _week = Week === week ? Week : 0;
      yield put({
        type: 'save',
        payload: { Id: 0, Week: _week },
      });
      callback && callback(week);
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const week = new Date().getDay() || 7;
        if (pathname === '/home') {
          dispatch({
            type: 'getTodayTodos',
            payload: {
              week,
            },
          });
        }
      });
    },
  },
};

export default HomeModel;
