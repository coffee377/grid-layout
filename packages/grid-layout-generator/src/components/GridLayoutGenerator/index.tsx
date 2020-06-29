import React, {useEffect} from 'react';
import Grid from 'grid-layout-react';
import { GridData } from 'grid-layout-core';
import classNames from 'classnames';
import { style as styles} from './style';

const demo: GridData = {
  id: 'demo1',
  name: 'demo1',
  container: {
    display: 'grid',
    gridTemplateColumns: '3fr 4fr 3fr',
    gridTemplateRows: 'repeat(8,55px)',
    gridRowGap: '30px',
    gridColumnGap: '30px',
  },
  containerStyle: {
    width: '90vw',
    height: 'calc(100vh - 30px)',
    margin: '30px auto 0',
  },
  item: [
    {
      id: '1-1-4-1',
      name: 'item1',
      columnStart: 1,
      rowStart: 1,
      rowSpan: 4,
      columnSpan: 1,
      content: '测试1',
    },
    {
      id: '5-1-4-1',
      name: 'item2',
      rowStart: 5,
      columnStart: 1,
      rowSpan: 4,
      columnSpan: 1,
      component: 'A',
    },
    {
      id: '1-2-5-1',
      name: 'item3',
      rowStart: 1,
      columnStart: 2,
      rowSpan: 5,
      columnSpan: 1,
      component: {
        lib: 'antd',
        name: 'Button',
        props: {
          type: 'danger',
        },
      },
    },
    {
      id: '6-2-3-1',
      name: 'item4',
      rowStart: 6,
      columnStart: 2,
      rowSpan: 3,
      columnSpan: 1,
      component: {
        name: '@components/C',
        props: {
          name: 'ABBA',
        },
      },
    },
    {
      id: '1-3-4-1',
      name: 'item5',
      rowStart: 1,
      columnStart: 3,
      rowSpan: 4,
      columnSpan: 1,
      component: '@components/C',
    },
    {
      id: '5-3-4-1',
      name: 'item6',
      rowStart: 5,
      columnStart: 3,
      rowSpan: 4,
      columnSpan: 1,
      component: 'A',
    },
  ],
  itemStyle: {
    padding: '5px',
    border: 'dashed #0b5d9c 1px',
    borderRadius: '8px',
  },
} as GridData;

export interface GridLayoutProps {}

const GridLayoutGenerator: React.FC<GridLayoutProps> = (props) => {
  const bodyClass = (show: boolean) => {
    document.body.className = classNames({ [styles.body]: show, [styles.background]: show });
  };

  useEffect(() => {
    bodyClass(true);
    return () => {
      bodyClass(false);
    };
  }, []);

  return (
    <>
      <Grid data={demo} />
    </>
  );
};

export default GridLayoutGenerator;
