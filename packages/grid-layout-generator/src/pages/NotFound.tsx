import React, { CSSProperties } from 'react';

export interface NotFoundProps {
  className?: string;
  style?: CSSProperties;
}

const NotFound: React.FC<NotFoundProps> = (props) => {
  const { children } = props;
  return (
    <>
      <h1>NotFound</h1>
      {children}
    </>
  );
};

export default NotFound;
