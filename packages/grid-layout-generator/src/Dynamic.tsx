import React from 'react';
import loadable, { Options } from '@loadable/component';
import { omit } from 'lodash';

export interface DynamicProps<P = any> {
  /**
   * @description @/{path} 目录下组件名称
   */
  path?: string;
  /**
   * @description @/components 目录下组件名称
   */
  component?: string;
  /**
   * @description @/layouts 目录下布局组件名称
   */
  layout?: string;
  /**
   * @description @/pages 目录下页面组件名称
   */
  page?: string;
  /**
   * @description 异步组件配置
   */
  options?: Options<P>;
  [key: string]: any;
}

const Dynamic: React.FC<DynamicProps> = (props) => {
  const { path, component, layout, page, options, children } = props;
  let C: React.ReactNode;
  let realPath: string;
  if (path) {
    /* 约定目录 {path} */
    if (path.match(/^@\//)) {
      realPath = path.replace(/^@\//, '');
    } else {
      realPath = path;
    }
    C = loadable(() => import(`@/${realPath}`), options);
  } else if (component) {
    /* 约定目录 {path} */
    if (component.match(/^@\/components\//)) {
      realPath = component.replace(/^@\/components\//, '');
    } else {
      realPath = path;
    }
    C = loadable(() => import(`@/${realPath}`), options);
  } else if (layout) {
    /* 约定目录 layouts */
    if (layout.match(/^@\/layouts\//)) {
      realPath = layout.replace(/^@\/layouts\//, '');
    } else {
      realPath = layout;
    }
    C = loadable(() => import(`@/layouts/${realPath}`), options);
  } else if (page) {
    /* 约定目录 pages */
    if (page.match(/^@\/pages\//)) {
      realPath = page.replace(/^@\/pages\//, '');
    } else {
      realPath = page;
    }
    C = loadable(() => import(`@/pages/${realPath}`), options);
  } else {
    return null;
  }

  /* 3. 组件属性 */
  const componentsProps = omit(props, ['path', 'component', 'layout', 'page', 'options', 'children']);
  return <C {...componentsProps}>{children}</C>;
};

Dynamic.defaultProps = {
  options: {
    fallback: <>loading.....</>,
    ssr: false,
  },
};

export default Dynamic;
