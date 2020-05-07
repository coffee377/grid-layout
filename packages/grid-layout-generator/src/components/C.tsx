import React from 'react';

const C: React.FC = (props) => {
  const { name } = props;
  return (
    <>
      <div>测试组件C!!!</div>
      <div>name:{name}</div>
    </>
  );
};
C.defaultProps = {
  name: 'C',
};
export default C;
