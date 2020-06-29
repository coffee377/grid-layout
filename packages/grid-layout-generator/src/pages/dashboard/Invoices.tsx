import React, { CSSProperties } from 'react';

export interface InvoicesProps {
  className?: string;
  style?: CSSProperties;
}

const Invoices: React.FC<InvoicesProps> = (props) => {
  const { children } = props;
  return (
    <>
      <h1>Invoices Home</h1>
      {children}
    </>
  );
};

export default Invoices;
