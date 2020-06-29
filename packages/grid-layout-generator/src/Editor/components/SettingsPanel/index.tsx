import React, { useState } from 'react';
import { Tabs, Tooltip } from 'antd';
import './style';

export interface SettingsPanelProps {}

const { TabPane } = Tabs;

const SettingsPanel: React.FC<SettingsPanelProps> = (props) => {
  const [showKey, setShowKey] = useState<string>('1');

  const handleOnChange = (key) => {
    setShowKey(key);
  };

  return (
    <Tabs className="edit-list-tabs" activeKey={showKey} onChange={handleOnChange}>
      <TabPane key="1" tab="属性">
        <div className="tab-scroll">AAA</div>
      </TabPane>
      <TabPane key="2" tab="样式">
        <div className="tab-scroll">BBB</div>
      </TabPane>
      <TabPane key="3" tab="其它">
        <div className="tab-scroll">CCC</div>
      </TabPane>
    </Tabs>
  );
};

export default SettingsPanel;
