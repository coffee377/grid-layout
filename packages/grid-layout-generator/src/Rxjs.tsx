import React, { CSSProperties, useEffect, useState } from 'react';
import { from } from 'rxjs';
import { IMenu } from '@/index';
import { toArray } from 'rxjs/operators';
import JSONTree, { JSONTreeProps } from 'react-json-tree';
import { list2tree } from '@/utils/tree';

export interface RxjsProps {
  className?: string;
  style?: CSSProperties;
}

const menus: IMenu[] = [
  { id: '1', pid: '', name: '布局', path: '/', component: 'BaseLayout', b: true, a: 1 },
  { id: '8', pid: '1', name: '首页', path: '/', sort: 1, component: 'Home' },
  { id: '2', pid: '1', name: '主页', path: 'home', sort: 2, component: '' },
  { id: '3', pid: '1', name: '关于', path: 'about', sort: 8, component: 'About' },
  { id: '4', pid: '1', name: '编辑器', path: 'editor', sort: 3, component: 'Editor' },
  { id: '5', pid: '1', name: '仪表板', path: 'dashboard', sort: 4, component: 'DashboardLayout' },
  { id: '6', pid: '5', name: '收入', path: 'invoices', component: 'Invoices' },
  { id: '7', pid: '5', name: '团队', path: 'team', component: 'Team' },
];

const menuList$ = from(menus);
// const squareNumbersList$ = menuList$.pipe(
//   // filter((val) => true),
//   // map((val) => val * val),
// );

const Rxjs: React.FC<RxjsProps> = (props) => {
  const { children } = props;
  const [content, setContent] = useState<Array<any>>([]);

  useEffect(() => {
    const result = list2tree(menus);
    setContent(result);
    // const subscription = menuList$.pipe(toArray()).subscribe((val) => {
    //   // const result: string = JSON.stringify(val, null, '  ');
    //   // console.log(result);
    //   c
    // });

    return () => {
      // subscription.unsubscribe();
    };
  }, []);

  const getLabelStyle = ({ style }, nodeType, expanded) => ({
    style: {
      ...style,
      textTransform: expanded ? 'uppercase' : style.textTransform,
    },
  });

  const getBoolStyle = ({ style }, nodeType) => ({
    style: {
      ...style,
      // border: nodeType === 'Boolean' ? '1px solid #DD3333' : style.border,
      // borderRadius: nodeType === 'Boolean' ? 3 : style.borderRadius,
    },
  });

  const getValueLabelStyle = ({ style }, nodeType, keyPath) => ({
    style: {
      ...style,
      // color: !Number.isNaN(keyPath[0]) && !(parseInt(keyPath, 10) % 2) ? '#33F' : style.color,
    },
  });

  const theme = {
    scheme: 'JSONTree',
    author: 'coffee377',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633',
    value: getBoolStyle,
    valueLabel: getValueLabelStyle,
    nestedNodeLabel: getLabelStyle,
  };

  const getItemString: JSONTreeProps['getItemString'] = (type, data, itemType, itemString) => (
    <span>
      {type} {itemString}
    </span>
  );
  const labelRenderer: JSONTreeProps['labelRenderer'] = ([keyPath], nodeType, expanded, expandable) => (
    <strong>{`${keyPath}:`}</strong>
  );
  const valueRenderer: JSONTreeProps['valueRenderer'] = (displayValue) => <em>{displayValue}</em>;
  return (
    <>
      <h1>RXJS</h1>
      <JSONTree
        data={content}
        theme={theme}
        labelRenderer={labelRenderer}
        valueRenderer={valueRenderer}
        getItemString={getItemString}
        postprocessValue={(v) => v}
      />
      {children}
    </>
  );
};

Rxjs.defaultProps = {};

export default Rxjs;
