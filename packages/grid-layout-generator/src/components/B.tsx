import React from 'react';

const B: React.FC = (props) => {
  const { name } = props;
  return (
    <>
      <div>测试组件B!!!</div>
      <div>name:{name}</div>
    </>
  );
};
B.defaultProps = {
  name: 'B',
};
export default B;
