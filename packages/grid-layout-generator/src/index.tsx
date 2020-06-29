import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, useRoutes, Routes, useNavigate, useLocation, Outlet, Route } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';
import BaseLayout from '@/layouts/BaseLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import loadable from '@loadable/component';
import list2tree from 'list2tree';
import GridLayoutGenerator from './components/GridLayoutGenerator';
import Editor from './Editor';
import store from './redux';
import Home from './pages/Home';
import About from './pages/About';
import Invoices from './pages/dashboard/Invoices';
import Team from './pages/dashboard/Team';
import NotFound from './pages/NotFound';
import AsyncComponent from './Async';

interface IMenu {
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

const partialRoutes: PartialRouteObject[] = [
  {
    path: '/',
    element: (
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'home',
        element: <AsyncComponent page="Home" name="test" />,
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
  { id: '8', pid: '1', name: '首页', path: '/', component: <Home /> },
  { id: '2', pid: '1', name: '主页', path: 'home', component: <AsyncHome name="Test" /> },
  { id: '3', pid: '1', name: '关于', path: 'about', component: <About /> },
  { id: '4', pid: '1', name: '编辑器', path: 'editor', component: <Editor /> },
  {
    id: '5',
    pid: '1',
    name: '仪表板',
    path: 'dashboard',
    component: (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    ),
  },
  { id: '6', pid: '5', name: '收入', path: 'invoices', component: <Invoices /> },
  { id: '7', pid: '5', name: '团队', path: 'team', component: <Team /> },
];

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
  return useRoutes(partialRoutes, basename);
};

const calcRoutes = (menus: IMenu[], rootLayout?: React.ReactNode) => {
  const partialRoutes: PartialRouteObject[] = [];
  const getTreeData = list2tree({
    idKey: 'id',
    parentIdKey: 'pid',
  });
  const data = getTreeData(menus);
  debugger;
  return partialRoutes;
};

AppRoutes.defaultProps = {
  menus: [],
  routes: calcRoutes,
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes basename="" menus={menus} rootLayout={BaseLayout} />
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
