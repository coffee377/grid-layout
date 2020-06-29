import React from 'react';
import { Link } from 'react-router-dom';

const BaseLayout: React.FC = (props) => {
  const { children } = props;
  return (
    <>
      <h1>根布局</h1>
      <nav>
        <Link to="home">Home</Link> | <Link to="about">About</Link> | <Link to="editor">Editor</Link>|{' '}
        <Link to="dashboard">Dashboard</Link>
      </nav>
      {children}
    </>
  );
};

export default BaseLayout;
