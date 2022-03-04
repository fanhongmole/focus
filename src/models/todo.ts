import { Effect, Reducer, Subscription } from 'umi';
import { getTodoList, addTodo, putTodo, delTodo } from '@/services/todo';
import { isResOk } from '@/utils/utils';
import { SingleTodoType } from '@/pages/todo/data.d';

export interface TodoState {
  list: SingleTodoType[];
  total: number;
  skip: number;
  limit: number;
}

export interface TodoModelType {
  namespace: string;
  state: TodoState;
  effects: {
    getTodoList: Effect;
    addTodo: Effect;
    putTodo: Effect;
    delTodo: Effect;
  };
  reducers: {
    save: Reducer<TodoState>;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const TodoModel: TodoModelType = {
  namespace: 'todo',
  state: {
    list: [],
    total: 0,
    skip: 0,
    limit: 10,
  },
  effects: {
    *getTodoList({ payload }, { call, put }) {
      const res = yield call(getTodoList, { ...payload });
      if (!isResOk(res)) return;
      const { data, total } = res;
      yield put({
        type: 'save',
        payload: { list: data, total },
      });
    },
    *addTodo({ payload, callback }, { call, put, select }) {
      const res = yield call(addTodo, { ...payload });
      if (!isResOk(res)) return;
      callback && callback();
      const { skip, limit } = yield select((state: any) => state.todo);
      yield put({
        type: 'getTodoList',
        payload: { skip, limit, filter: JSON.stringify({}) },
      });
    },
    *putTodo({ payload, callback }, { call, put, select }) {
      const res = yield call(putTodo, { ...payload });
      if (!isResOk(res)) return;
      callback && callback();
      const { skip, limit } = yield select((state: any) => state.todo);
      yield put({
        type: 'getTodoList',
        payload: { skip, limit, filter: JSON.stringify({}) },
      });
    },
    *delTodo({ payload, callback }, { call, put, select }) {
      const res = yield call(delTodo, { ...payload });
      if (!isResOk(res)) return;
      callback && callback();
      const { skip, limit } = yield select((state: any) => state.todo);
      yield put({
        type: 'getTodoList',
        payload: { skip, limit, filter: JSON.stringify({}) },
      });
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
        if (pathname === '/todo') {
          dispatch({
            type: 'getTodoList',
            payload: {
              skip: 0,
              limit: 10,
              filter: JSON.stringify({}),
            },
          });
        }
      });
    },
  },
};

export default TodoModel;
