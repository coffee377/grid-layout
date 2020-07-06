import React, { CSSProperties, useContext } from 'react';
import { AppContext } from '@/index';

export interface AboutProps {
  className?: string;
  style?: CSSProperties;
}

const About: React.FC<AboutProps> = (props) => {
  const { menus } = useContext(AppContext);
  const { children } = props;
  return (
    <>
      <h1>About</h1>
      {/* <h2>{JSON.stringify(menus)}</h2> */}
      {children}
    </>
  );
};

export default About;
