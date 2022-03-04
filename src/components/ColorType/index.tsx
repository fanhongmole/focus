import React from 'react';
import styles from './index.less';
import { CheckOutlined } from '@ant-design/icons';

const ColorType = (props: {
  color: string;
  selected: boolean;
  onClick(): void;
}) => (
  <div
    className={styles.colorType}
    onClick={() => props.onClick()}
    style={{
      background: props.color,
    }}
  >
    {props.selected ? (
      <CheckOutlined style={{ fontSize: 22, color: '#fff' }} />
    ) : (
      ''
    )}
  </div>
);

export default ColorType;
