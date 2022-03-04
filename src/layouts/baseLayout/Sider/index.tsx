import React, { FC, useEffect, useState } from 'react';
import {
  connect,
  Link,
  useLocation,
  Dispatch,
  GlobalState,
  HomeState,
} from 'umi';
import { Menu } from 'antd';
import { queryKeysByPath } from '@/utils/utils';
import styles from '../index.less';
import * as Icons from '@ant-design/icons';
import moment from 'moment';
import TimingPage from '@/components/TimingPage';

const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const { SubMenu, Item } = Menu;

export interface SiderProps {
  global: GlobalState;
  home: HomeState;
  dispatch: Dispatch;
}

const Sider: FC<SiderProps> = props => {
  const { menusData } = props.global;

  const [time, setTime] = useState(moment());
  const location = useLocation();
  const iconEL = (type: string) =>
    React.createElement(Icons && (Icons as any)[type], {
      style: { color: '#000' },
    });

  function renderMenu(data: any = []) {
    const rows = Array.isArray(data) ? data : [];
    return rows.map(row => {
      if (row === undefined) return false;
      const { title, link = '', key, icon, children, ...restState } = row;
      if (children && children.length > 0) {
        const subMenu = renderMenu(children);
        return (
          <SubMenu key={key} title={<span>{title}</span>}>
            {subMenu}
          </SubMenu>
        );
      }
      return (
        <Item key={key} title={title} icon={icon ? iconEL(icon) : ''}>
          <Link to={{ pathname: link, state: { ...restState, key } }}>
            <span>{title}</span>
          </Link>
        </Item>
      );
    });
  }

  useEffect(() => {
    const _t = setInterval(() => {
      setTime(moment());
    }, 1000);
    return () => {
      clearTimeout(_t);
    };
  });
  const { openKey, selectKey } = queryKeysByPath(location.pathname);

  return (
    <>
      <Menu
        selectedKeys={[selectKey || '']}
        defaultOpenKeys={[openKey]}
        mode="inline"
        theme="dark"
        className={styles.progressbar}
      >
        {renderMenu(menusData)}
      </Menu>
      <TimingPage {...props} />
      <div className={styles.timeWrap}>
        <span className={styles.timeSpan}>{time.format('HH:mm')}</span>
        <div className={styles.dateWrap}>
          <span>{time.format('M月D日')}</span>
          <span>{weekdays[time.weekday()]}</span>
        </div>
      </div>
    </>
  );
};

export default connect(
  ({ home, global }: { home: HomeState; global: GlobalState }) => ({
    home,
    global,
  }),
)(Sider);
