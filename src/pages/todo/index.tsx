import React, { useState, FC } from 'react';
import {
  Button,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import ColorType from '@/components/ColorType';
import { duration2Time } from '@/utils/utils';
import styles from './index.less';
import { connect, Dispatch, HomeState, TodoState } from 'umi';
import { SingleTodoType } from './data.d';

interface TodoPageProps {
  dispatch: Dispatch;
  home: HomeState;
  todo: TodoState;
}

const weekOptions = [
  {
    value: '1',
    label: '周一',
  },
  {
    value: '2',
    label: '周二',
  },
  {
    value: '3',
    label: '周三',
  },
  {
    value: '4',
    label: '周四',
  },
  {
    value: '5',
    label: '周五',
  },
  {
    value: '6',
    label: '周六',
  },
  {
    value: '7',
    label: '周日',
  },
];

const Todolist: FC<TodoPageProps> = ({ todo, home, dispatch }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [color, setColor] = useState('red');
  const [week, setWeek] = useState(['1', '2', '3', '4', '5']);
  const [duration, setDuration] = useState(60);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const fillModal = (item: SingleTodoType) => {
    if (item.id === home.Id) return message.info('计划进行中，无法编辑');
    setId(item.id);
    setName(item.name);
    setColor(item.color);
    setDuration(item.duration);
    setWeek(item.week);
    showModal();
  };

  const handleOk = () => {
    if (!name) {
      message.info('请填写计划描述');
    } else if (!color) {
      message.info('请选择颜色');
    } else if (!week.length) {
      message.info('请选择时间');
    } else if (!duration) {
      message.info('请设置时长');
    } else {
      if (id) {
        dispatch({
          type: 'todo/putTodo',
          payload: {
            id,
            params: {
              name,
              color,
              week,
              duration,
            },
          },
          callback: () => {
            message.success('修改成功');
            handleCancel();
          },
        });
      } else {
        dispatch({
          type: 'todo/addTodo',
          payload: {
            name,
            color,
            week,
            duration,
          },
          callback: () => {
            message.success('添加成功');
            handleCancel();
          },
        });
      }
    }
  };

  const handleCancel = () => {
    initData();
    setIsModalVisible(false);
  };

  const initData = () => {
    setId(0);
    setName('');
    setColor('red');
    setWeek(['1', '2', '3', '4', '5']);
    setDuration(60);
  };

  const deleteTodo = (id: number) => {
    if (id === home.Id) return message.info('计划进行中，无法删除');
    dispatch({
      type: 'todo/delTodo',
      payload: {
        id,
      },
      callback: () => {
        message.success('删除成功');
      },
    });
  };

  const handleChange = (value: string[]) => {
    setWeek([...value].sort());
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '标记颜色',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: '时间长度',
      dataIndex: 'duration',
      key: 'duration',
      render: (_: any, { duration }: SingleTodoType) => (
        <span>{duration2Time(duration)}</span>
      ),
    },
    {
      title: '时间',
      key: 'week',
      dataIndex: 'week',
      render: (tags: string[]) => (
        <>
          {tags.map(tag => {
            const option = weekOptions.find(item => item.value === tag);
            return <Tag key={tag}>{option && option.label}</Tag>;
          })}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: SingleTodoType) => (
        <Space size="middle">
          <a onClick={() => fillModal(record)}>编辑</a>
          <Popconfirm
            title="确认要删除吗?"
            onConfirm={() => deleteTodo(record.id)}
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>计划</h1>
      <>
        <Button onClick={showModal}>添加计划</Button>
        <div className="mrgT20"></div>
        <Table
          columns={columns}
          dataSource={todo.list}
          pagination={false}
          scroll={{ y: 400 }}
          rowKey="id"
        />

        <Modal
          title="添加计划"
          visible={isModalVisible}
          width={530}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className={styles.modalWrap}>
            <div className={styles.colorSelector}>
              <ColorType
                color="red"
                selected={color === 'red' || false}
                onClick={() => setColor('red')}
              />
              <ColorType
                color="blue"
                selected={color === 'blue' || false}
                onClick={() => setColor('blue')}
              />
              <ColorType
                color="yellow"
                selected={color === 'yellow' || false}
                onClick={() => setColor('yellow')}
              />
              <ColorType
                color="green"
                selected={color === 'green' || false}
                onClick={() => setColor('green')}
              />
            </div>

            <Input
              placeholder="描述"
              size="large"
              onChange={e => setName(e.target.value)}
              bordered={false}
              value={name}
            />
            <Select
              mode="tags"
              allowClear
              placeholder="时间"
              size="large"
              onChange={handleChange}
              value={week}
              bordered={false}
            >
              {weekOptions.map(item => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
            <div className={styles.timePicker}>
              <Select
                value={parseInt(String(duration / 60))}
                onChange={value => setDuration((duration % 60) + value * 60)}
                bordered={false}
                showArrow={false}
                size="large"
              >
                <Select.Option value={0}>00</Select.Option>
                <Select.Option value={1}>01</Select.Option>
                <Select.Option value={2}>02</Select.Option>
                <Select.Option value={3}>03</Select.Option>
                <Select.Option value={4}>04</Select.Option>
              </Select>
              :
              <Select
                value={duration % 60}
                onChange={value =>
                  setDuration(duration - (duration % 60) + value)
                }
                bordered={false}
                showArrow={false}
                size="large"
              >
                <Select.Option value={0}>00</Select.Option>
                <Select.Option value={15}>15</Select.Option>
                <Select.Option value={30}>30</Select.Option>
                <Select.Option value={45}>45</Select.Option>
              </Select>
            </div>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default connect(
  ({ todo, home }: { todo: TodoState; home: HomeState }) => ({
    todo,
    home,
  }),
)(Todolist);
