import React from 'react';
import loadable, { Options } from '@loadable/component';
import { omit } from 'lodash';

export interface AsyncProps<P = any> {
  /**
   * @description src/layout 目录下布局组件名称
   */
  layout?: string;
  /**
   * @description src/pages 目录下页面组件名称
   */
  page?: string;
  /**
   * @description 异步组件配置
   */
  options?: Options<P>;
}

const AsyncComponent: React.FC<AsyncProps> = (props) => {
  const { layout, page, options } = props;
  let C: React.ReactNode;
  let path: string = page;
  if (layout) {
    // debugger;
    /* 1. 约定目录 layouts */
    if (layout.match(/^@\/layouts\//)) {
      path = page.replace(/^@\/layouts\//, '');
    }
    C = loadable(() => import(`@/layouts/${path}`), options);
  } else if (page) {
    // debugger;
    /* 1. 约定目录 pages */
    if (page.match(/^@\/pages\//)) {
      path = page.replace(/^@\/pages\//, '');
    }
    C = loadable(() => import(`@/pages/${path}`), options);
  } else {
    return null;
  }

  /* 3. 组件属性 */
  const componentsProps = omit(props, ['layout', 'page', 'options','children']);

  return <C {...componentsProps} />;
};

AsyncComponent.defaultProps = {
  options: {
    fallback: null,
    ssr: false,
  },
};

export default AsyncComponent;
