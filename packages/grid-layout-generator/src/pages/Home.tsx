import React from 'react';

export interface HomeProps {
  name?: string;
}

const Home: React.FC<HomeProps> = (props) => {
  const { name, children } = props;
  return (
    <>
      <h1>Home {name} 2</h1>
      {children}
    </>
  );
};

Home.defaultProps = {
  name: 'Demo',
};

export default Home;
