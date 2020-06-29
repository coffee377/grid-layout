import React, { CSSProperties } from 'react';

export interface TeamProps {
  className?: string;
  style?: CSSProperties;
}

const Team: React.FC<TeamProps> = (props) => {
  const { children } = props;
  return (
    <>
      <h1>Team</h1>
      {children}
    </>
  );
};

export default Team;
