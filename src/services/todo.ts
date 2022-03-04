import request from '@/utils/request';
import { stringify } from 'qs';
import { FormValues } from './data';
import host from '../../config/host.config';


export const getTodoList = async (params: FormValues) => {
  const query = stringify({ ...params });
  return request(`${host}/api/todo/list?${query}`);
};

export const addTodo = async (params: FormValues) => {
  return request(`${host}/api/todo`, {
    method: 'post',
    data: params,
  });
};

export const putTodo = async ({
  id,
  params,
}: {
  id: number;
  params: FormValues;
}) => {
  return request(`${host}/api/todo/${id}`, {
    method: 'put',
    data: params,
  });
};

export const delTodo = async ({ id }: { id: number }) => {
  return request(`${host}/api/todo/${id}`, {
    method: 'delete',
  });
};
