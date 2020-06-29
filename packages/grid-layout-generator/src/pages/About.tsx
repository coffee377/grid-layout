import React, { CSSProperties } from 'react';

export interface AboutProps {
  className?: string;
  style?: CSSProperties;
}

const About: React.FC<AboutProps> = (props) => {
  const { children } = props;
  return (
    <>
      <h1>About</h1>
      {children}
    </>
  );
};

export default About;
