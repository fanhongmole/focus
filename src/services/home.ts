import request from '@/utils/request';
import { stringify } from 'qs';
import { FormValues } from './data';
import host from '../../config/host.config';

export const getTodayTodos = async (params: FormValues) => {
  const query = stringify({ ...params });
  return request(`${host}/api/todo/today?${query}`);
};

export const completedTodo = async (params: FormValues) => {
  return request(`${host}/api/todo/checked`, {
    method: 'post',
    data: params,
  });
};
