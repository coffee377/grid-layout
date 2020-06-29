import React, { useState } from 'react';
import './style';
import NavBar from './components/NavBar';
import SettingsPanel from './components/SettingsPanel';
import SideMenu from './components/SideMenu';
import Iframe from './components/Iframe';

const Editor: React.FC = (props) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="edit-wrapper" key="2">
      <div className="edit-left-view">
        <NavBar {...props} />
        <div className="edit-content-wrapper">
          <SideMenu {...props} />
          <div className="edit-stage-wrapper">
            {/* <EditInfluence {...this.props} /> */}
            <Iframe className="edit-preview" />
            {/* <EditStageController {...this.props} /> */}
          </div>
        </div>
      </div>
      <div className="edit-right-view">
        <SettingsPanel {...props} />
      </div>
    </div>
  );
};

export default Editor;
