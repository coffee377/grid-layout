import React from 'react';
import { Link } from 'react-router-dom';

const DashboardLayout: React.FC = (props) => {
  const { children } = props;
  return (
    <>
      <div>这是布局</div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="invoices">Invoices</Link> <Link to="team">Team</Link>
      </nav>
      <hr />
      {children}
    </>
  );
};

export default DashboardLayout;
