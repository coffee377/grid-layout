import React, { ComponentType, useEffect, useState } from 'react';
import { ComponentData } from 'grid-layout-core';

export interface DynamicProps extends Partial<ComponentData> {
  component?: string;
}

interface DynamicState {
  loading?: boolean;
  lib?: boolean;
  result?: ComponentType<any>;
  error?: string;
}
const Dynamic: React.FC<DynamicProps> = (props) => {
  const { component, lib, name, props: componentProps } = props;
  const [state, setState] = useState<DynamicState>({ lib: lib !== undefined });

  const getComponentName = () => {
    const componentName: string = component || name;
    if (/@components\/.*/.test(componentName)) {
      return componentName.replace(/@components\//, '');
    }
    return componentName;
  };

  useEffect(() => {
    /* 导入组件库 */
    if (lib && name) {
      import('antd')
        .then((mod) => {
          setState({ loading: true, result: mod['default'] ? mod['default'][name] : mod[name] });
        })
        .catch((err) => {
          setState({ error: err.toString() });
        });
    }
    /* 导入本地组件 */
    if (!lib && (component || name)) {
      // eslint-disable-next-line no-lonely-if
      if (getComponentName()) {
        import(`@components/${getComponentName()}`)
          .then((mod) => {
            setState({ loading: true, result: mod.default ? mod.default : mod });
          })
          .catch((err) => {
            setState({ error: err.toString() });
          });
      }
    }
  }, []);

  if (state.error) {
    return state.error;
  }

  const C = state.result;
  return C ? <C {...componentProps} /> : null;
};

Dynamic.defaultProps = {};

export default Dynamic;
