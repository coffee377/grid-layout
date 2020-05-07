import React from 'react';

const A: React.FC = (props) => {
  const { name } = props;
  return (
    <>
      <div>测试组件A!!!</div>
      <div>name:{name}</div>
    </>
  );
};
A.defaultProps = {
  name: 'A',
};
export default A;
