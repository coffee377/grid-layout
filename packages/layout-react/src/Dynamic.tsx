import React from 'react';
import { ComponentData } from 'layout-data';

export interface DynamicProps extends Partial<ComponentData> {
  component?: string;
  props?: any;
}

const Dynamic: React.FC<DynamicProps> = p => {
  const { component, lib, name, props, children } = p;
  if (component) {
    return 'ABC';
  }
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const c = require('D:/voc-admin-ui/src/components/GridLayoutGenerator/core/lib.tsx');
  const Lib = c.default;
  if (!name) {
    return null;
  }
  const Component = Lib[name];
  if (!Component) {
    return null;
  }
  return <Component {...props}>{children}</Component>;
};

Dynamic.defaultProps = {
  // lib: './lib',
};

export default Dynamic;
