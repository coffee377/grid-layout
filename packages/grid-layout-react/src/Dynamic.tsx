import React from 'react';
import { ComponentData } from 'grid-layout-core/data';

export interface DynamicProps extends Partial<ComponentData> {
  component?: string;
  props?: any;
}

const Dynamic: React.FC<DynamicProps> = p => {
  const { component, lib, name, props, children } = p;
  let id: string;
  if (component) {
    id = component;
  }

  if (lib) {
    id = lib;
  }
  const core = import('grid-layout-core');
  core.then();
  // const c = require('D:/voc-admin-ui/src/components/GridLayoutGenerator/core/lib.tsx')
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const c = require(id);
  const Lib = c.default || c;
  let Component = Lib;
  if (name) {
    Component = Lib[name];
  }
  if (!Component) {
    return null;
  }
  return <Component {...props}>{children}</Component>;
};

Dynamic.defaultProps = {
  // lib: './lib',
};

export default Dynamic;
