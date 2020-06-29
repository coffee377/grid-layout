import React from 'react';
import './style.less';
import { Popconfirm, Tooltip } from 'antd';
// import { CodeOutlined, EyeOutlined } from '@ant-design/icons/lib';

export interface MenuProps {
  name: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: Function;
  tooltip?: React.ReactNode;
}

export interface NavBarProps {
  className?: string;
  menus?: MenuProps[];
}

const NavBar: React.FC<NavBarProps> = (props) => {
  const { className, menus } = props;

  const menuChild = menus.map((item, index) => {
    let children = (
      <Tooltip title={item.name}>
        <a onClick={item.tooltip ? null : item.onClick} disabled={!item.onClick}>
          {item.icon || item.name}
        </a>
      </Tooltip>
    );
    if (item.tooltip) {
      children = (
        <Popconfirm
          title={item.tooltip}
          onConfirm={item.onClick}
          // okText={<FormattedMessage id="app.common.ok" />}
          // cancelText={<FormattedMessage id="app.common.cancel" />}
          overlayStyle={{ width: 320 }}>
          {children}
        </Popconfirm>
      );
    }
    return <li key={index.toString()}>{children}</li>;
  });
  return (
    <div className={className}>
      <a>
        <div className="logo">
          <img src="https://gw.alipayobjects.com/zos/rmsportal/SVDdpZEbAlWBFuRGIIIL.svg" alt="logo" />
        </div>
      </a>
      <ul className="menu">{menuChild}</ul>
    </div>
  );
};

NavBar.defaultProps = {
  className: 'edit-nav',
  menus: [
    {
      name: '预览',
      // icon: <EyeOutlined />,
      onClick: () => {},
    },
    {
      name: '代码',
      // icon: <CodeOutlined />,
      onClick: () => {},
    },
  ],
};

export default NavBar;
