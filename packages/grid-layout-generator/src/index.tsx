import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Outlet, useRoutes } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';
import BaseLayout from '@/layouts/BaseLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import loadable from '@loadable/component';
import { list2tree } from '@/utils/tree';
import BaseLayout2 from '@/layouts/BaseLayout2';
import Editor from './Editor';
import store from './redux';
import Home from './pages/Home';
import About from './pages/About';
import Invoices from './pages/dashboard/Invoices';
import Team from './pages/dashboard/Team';
import NotFound from './pages/NotFound';
import Dynamic from './Dynamic';

export interface IMenu {
  /**
   * @description 菜单ID
   */
  id: string;
  /**
   *  @description 菜单父ID
   */
  pid?: string;
  /**
   * @description 菜单名称
   */
  name: string;
  /**
   * @description 菜单路径,当前路径字符串，完整路径依赖上层路径
   */
  path: string;
  /**
   * @description 菜单图标
   */
  icon?: string;
  /**
   * @description 使用组件
   * 组件 src/components 目录下组件名称，如 @components/A
   * 布局 src/pages 目录下布局名称，如 @pages/BaseLayout
   * 页面 src/pages 目录下页面名称，如 @pages/About
   */
  component?: string | React.ReactNode;
  /**
   * @description 描述组件是否是布局组件
   * @default 非叶子节点 true, 叶子节点 false
   */
  layout?: boolean;
  /**
   * @description 排序 值越小，越靠前
   * @default 0
   */
  sort?: number;
  /**
   * @description 菜单完整路径数组
   */
  paths?: string[];
  /**
   * @description 页面权限
   */
  authority?: {
    ADD: boolean;
    DELETE: boolean;
    UPDATE: boolean;
    QUERY: boolean;
    [action: string]: boolean;
  };
  /**
   * @description 其他配置项
   */
  [key: string]: any;
}

/**
 * @description 路由信息
 */
type IRoutes = ((menus: IMenu[], rootLayout?: React.ReactNode) => PartialRouteObject[]) | PartialRouteObject[];

export interface AppRoutesProps {
  /**
   * @description 应用的基础路径
   */
  basename?: string;
  /**
   * @description 菜单
   */
  menus?: IMenu[];
  /**
   * @description 路由
   */
  routes?: IRoutes;
  /**
   * @description 根布局组件
   */
  rootLayout?: React.ReactNode;
}

interface ElementOptions<P = {}> {
  /**
   * @description 是否布局组件
   * @default false
   */
  layout?: boolean;
  /**
   * @description 组件属性
   */
  props?: P;
}

type ElementFn = (component: string | React.Component | React.FC, opts?: ElementOptions) => React.ReactNode;

interface LayoutProps {
  layout?: React.Component | React.FunctionComponent;
}
/**
 * 路由布局包装器
 * @param props
 * @constructor
 */
const Layout: React.FC<LayoutProps> = (props) => {
  const { layout: LayoutWrapper } = props;
  if (LayoutWrapper) {
    return (
      <LayoutWrapper>
        <Outlet />
      </LayoutWrapper>
    );
  }
  return <Outlet />;
};

/**
 * 创建路由元素
 * @param component
 * @param opts
 */
const createElement: ElementFn = (component, opts = { layout: false }) => {
  const { layout } = opts;
  const isReactElement = component['$$typeof']
    ? Symbol.keyFor(component['$$typeof'] as Symbol) === 'react.element'
    : false;
  if (component) {
    if (typeof component === 'string') {
      if (layout) {
        return (
          <Dynamic layout={component}>
            <Outlet />
          </Dynamic>
        );
      }
      return <Dynamic page="Home" name="Test Home Q" />;
    }
    debugger;
    if (layout) {
      // const C: React.ReactElement = component as React.ReactElement;

      // const t = component['$$typeof'] as Symbol;
      // console.log('console.log(typeof symbol1);', t.toString());
      // const e = isReactElement === t;
      debugger;
      // const a =
      const T = component['type'];
      debugger;
      return (
        <T>
          <Outlet />
        </T>
      );
      // return <LayoutWrapper Layout={false}>{component}</LayoutWrapper>;
    }
    return component;
  }
  return null;
};

const partialRoutes: PartialRouteObject[] = [
  {
    path: '/',
    element: createElement(<BaseLayout2 />, { layout: true }),
    children: [
      {
        path: '/',
        element: createElement(<Home />),
      },
      {
        path: 'home',
        element: createElement('Home'),
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'editor',
        element: <Editor />,
      },
      {
        path: 'dashboard',
        element: (
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        ),
        children: [
          { path: '/', element: <Invoices /> },
          { path: 'invoices', element: <Invoices /> },
          { path: 'team', element: <Team /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];

const AsyncHome = loadable((props) => import(/* webpackChunkName: "home" */ `@/pages/About`));

const menus: IMenu[] = [
  {
    id: '1',
    pid: '',
    name: '布局',
    path: '/',
    component: (
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    ),
  },
  { id: '8', pid: '1', name: '首页', path: '/', sort: 1, component: <Home /> },
  { id: '2', pid: '1', name: '主页', path: 'home', sort: 2, component: <AsyncHome name="Test" /> },
  { id: '3', pid: '1', name: '关于', path: 'about', sort: 8, component: <About /> },
  { id: '4', pid: '1', name: '编辑器', path: 'editor', sort: 3, component: <Editor /> },
  {
    id: '5',
    pid: '1',
    name: '仪表板',
    path: 'dashboard',
    sort: 4,
    component: (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    ),
  },
  { id: '6', pid: '5', name: '收入', path: 'invoices', component: <Invoices /> },
  { id: '7', pid: '5', name: '团队', path: 'team', component: <Team /> },
];
interface AppContextValue {
  menus?: IMenu[];
}
export const AppContext = React.createContext<AppContextValue>({});

const AppRoutes: React.FC<AppRoutesProps> = (props) => {
  const { basename, menus, routes, rootLayout } = props;
  let partialRoutes: PartialRouteObject[] = [];
  if (typeof routes === 'function') {
    /* 1. 如果 routes 是函数，则根据菜单，根布局组件获取路由数组 */
    partialRoutes = routes(menus, rootLayout);
  } else if (Array.isArray(routes)) {
    /* 2. 如果 routes 路由数组，则直接返回  */
    partialRoutes = routes;
  }
  /* 3. 由 API 生成路由信息 */
  const r: React.ReactElement = useRoutes(partialRoutes, basename);
  return r;
};

const calcRoutes = (menus: IMenu[], rootLayout?: React.ReactNode) => {
  const partialRoutes: PartialRouteObject[] = menus.map((menu) => {
    return { id: menu.id, pid: menu.pid, path: menu.path, element: 'menu.component' };
  });
  const idKey: string = 'id';
  const pidKey: string = 'pid';
  const sortKey: string = 'sort';
  const isDesc: boolean = false;
  debugger;
  // const partialRoutes: PartialRouteObject[] = [];
  const treeData = list2tree(menus, { idKey, pidKey, sortKey, isDesc });
  // 继续转换
  // treeData.forEach((item) => {
  //   partialRoutes.push({ path: '', element: '', children: [] });
  // });
  return treeData;
};

AppRoutes.defaultProps = {
  menus: [],
  routes: calcRoutes,
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContext.Provider value={{ menus }}>
          <AppRoutes basename="" menus={menus} routes={partialRoutes} rootLayout={BaseLayout} />
        </AppContext.Provider>
      </BrowserRouter>
    </Provider>
    // <Rxjs />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
