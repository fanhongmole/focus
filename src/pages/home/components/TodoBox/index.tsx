import React, { FC } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Empty, Modal } from 'antd';
import styles from './index.less';
import ColorType from '@/components/ColorType';
import { duration2Time } from '@/utils/utils';
import { Dispatch, HomeState } from 'umi';

interface TodoBoxProps {
  dispatch: Dispatch;
  home: HomeState;
}

const TodoBox: FC<TodoBoxProps> = ({ dispatch, home }) => {
  const { Id, list } = home;

  const startTiming = (id: number, duration: number) => {
    dispatch({
      type: 'home/save',
      payload: {
        Id: id,
        Duration: duration,
        ShowTimingPage: true,
        ShowMiniCount: true,
        StartTime: Date.now(),
      },
    });
  };

  const checkLocked = (id: number, duration: number) => {
    if (Id === id) {
      dispatch({
        type: 'home/save',
        payload: {
          ShowTimingPage: true,
        },
      });
    } else if (Id) {
      Modal.confirm({
        content: '当前有计划进行中，确定要开始这个计划吗?',
        onOk: () => startTiming(id, duration),
      });
    } else {
      startTiming(id, duration);
    }
  };

  return (
    <div className="mrgT20">
      <div className={styles.listWrap}>
        {list.length ? (
          list.map(item => (
            <div
              key={item.id}
              className={`${styles.todoItem} ${
                item.checked ? styles.checkedItem : ''
              } `}
            >
              <div className={styles.todoLeft}>
                <ColorType
                  color={item.color}
                  selected={item.checked}
                  onClick={() => {}}
                />
                <div className={styles.todoName}>{item.name}</div>
              </div>
              <div className="mrgR20">{duration2Time(item.duration)}</div>
              <div className={styles.todoAction}>
                {!item.checked && (
                  <>
                    <Button
                      shape="circle"
                      onClick={() => checkLocked(item.id, item.duration)}
                      icon={<CaretRightOutlined />}
                      size={'large'}
                    />
                    {/* <Button
                    shape="circle"
                    icon={<EditOutlined />}
                    size={'large'}
                  />
                  <Button
                    shape="circle"
                    icon={<DeleteOutlined />}
                    size={'large'}
                  /> */}
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <>
            <div
              style={{
                marginTop: 120,
              }}
            ></div>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="还没有计划，去添加一个吧！"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TodoBox;
