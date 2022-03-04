import {
  CloseOutlined,
  LeftOutlined,
  MinusOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC } from 'react';
import Countdown from 'react-countdown';
import { Dispatch, HomeState } from 'umi';
import styles from './index.less';

interface TimingPageProps {
  dispatch: Dispatch;
  home: HomeState;
}

const padTime = (_: number) => String(_).padStart(2, '0');

const TimingPage: FC<TimingPageProps> = ({ dispatch, home }) => {
  const { Id, Duration, StartTime, ShowTimingPage } = home;

  // 与Electron通信
  const minWindow = () => {
    window.require && window.require('electron').ipcRenderer.send('min');
  };
  const closeWindow = () => {
    window.require && window.require('electron').ipcRenderer.send('close');
  };

  const onCompleted = () => {
    if (Id) {
      dispatch({
        type: 'home/completedTodo',
        payload: {
          id: Id,
          duration: Duration,
        },
        callback: initData,
      });
    }
  };

  const initData = (week: number) => {
    if (window.location.pathname === '/home') {
      dispatch({
        type: 'home/getTodayTodos',
        payload: {
          week,
        },
      });
    }
  };

  const setShowTimingPage = (value: boolean) => {
    dispatch({
      type: 'home/save',
      payload: {
        ShowTimingPage: value,
      },
    });
  };

  const countdownRenderer = ({
    hours,
    minutes,
    seconds,
    completed,
  }: {
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      return (
        <div className={styles.countCompleted}>时间到了，去休息一下吧!</div>
      );
    } else {
      return (
        <div className={styles.countDown}>
          <div className={styles.countTime}>{padTime(hours)}</div>
          <div className={styles.countTime}>{padTime(minutes)}</div>
          <div className={styles.countTime}>{padTime(seconds)}</div>
        </div>
      );
    }
  };

  const miniCountdownRenderer = ({
    hours,
    minutes,
    seconds,
    completed,
  }: {
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      return <div className={styles.miniCount}>00:00:00</div>;
    } else {
      return (
        <div className={styles.miniCount}>
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </div>
      );
    }
  };
  return (
    <>
      <div
        className={`${styles.timingPage} ${
          ShowTimingPage ? styles.showTimingPage : ''
        }`}
      >
        <div className={styles.timingHeader}>
          <div>
            <Button
              onClick={() => setShowTimingPage(false)}
              type="text"
              icon={<LeftOutlined style={{ fontSize: 20, color: '#e7e7e7' }} />}
            />
          </div>
          <div
            style={{
              width: 200,
              textAlign: 'right',
            }}
          >
            <Button
              onClick={minWindow}
              type="text"
              icon={<MinusOutlined style={{ color: '#e7e7e7' }} />}
            />
            <Button
              onClick={closeWindow}
              type="text"
              icon={<CloseOutlined style={{ color: '#e7e7e7' }} />}
            />
          </div>
        </div>
        <div className={styles.countWrap}>
          <Countdown
            key={Id}
            date={StartTime + 4 * 1000 * 1}
            renderer={countdownRenderer}
            // onComplete={onCompleted}
          />
        </div>
      </div>

      {Id ? (
        <div
          className={`${styles.fixCountWrap} ${
            ShowTimingPage ? '' : styles.showMiniCount
          }`}
        >
          <Countdown
            key={Id}
            date={StartTime + 4 * 1000 * 1}
            renderer={miniCountdownRenderer}
            onComplete={onCompleted}
          />
          <Button
            onClick={() => setShowTimingPage(true)}
            type="text"
            icon={<RightOutlined style={{ fontSize: 16 }} />}
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default TimingPage;
