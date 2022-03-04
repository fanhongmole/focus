import React from 'react';
import { Button } from 'antd';
import { MinusOutlined, CloseOutlined } from '@ant-design/icons';

const Header = () => {
  // 与Electron通信
  const minWindow = () => {
    window.require && window.require('electron').ipcRenderer.send('min');
  };
  const closeWindow = () => {
    window.require && window.require('electron').ipcRenderer.send('close');
  };

  return (
    <>
      <div></div>
      <div
        style={{
          width: 200,
          textAlign: 'right',
        }}
      >
        <Button type="text" icon={<MinusOutlined />} onClick={minWindow} />
        <Button type="text" icon={<CloseOutlined />} onClick={closeWindow} />
      </div>
    </>
  );
};
export default Header;
