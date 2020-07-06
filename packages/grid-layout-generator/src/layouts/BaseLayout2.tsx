import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prefer-stateless-function
class BaseLayout2 extends React.PureComponent<any, any> {
  render() {
    const { children } = this.props;
    return (
      <>
        <h1>根布局 Class</h1>
        <nav>
          <Link to="home">Home</Link> | <Link to="about">About</Link> | <Link to="editor">Editor</Link>|{' '}
          <Link to="dashboard">Dashboard</Link>
        </nav>
        {children}
      </>
    );
  }
}
export default BaseLayout2;
