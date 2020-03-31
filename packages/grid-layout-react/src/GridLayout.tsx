import React from 'react';
import { omit } from 'lodash';
import { GridData } from 'grid-layout-core/data';
import Container from './Container';
import Item from './Item';
import { mixinEnhance } from './utils';

/**
 * 包裹组件，仅用于传递数据
 */
export interface GridLayoutProps extends Partial<GridData> {
  // /**
  //  * @description 网格布局ID
  //  */
  // id?: string;
  // /**
  //  * @deprecated
  //  * @description 网格布局预设名称
  //  */
  // preset?: string;
  /**
   * @description 网格布局配置数据
   */
  data?: GridData;
}

const GridLayout: React.FC<GridLayoutProps> = props => {
  const { data, children } = props;

  /* 1.组件属性 */
  const configProps = omit<GridLayoutProps>(props, ['children', 'data']);

  /* 2.获取配置数据 */
  // const init = () => {
  //   dispatch({
  //     type: `${namespace}/init`,
  //     payload: { id, preset },
  //   });
  // };
  // if (id || preset) {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   useEffect(init, [id, preset]);
  // }

  /* 3.属性合并 */
  const gridLayoutProps: GridLayoutProps = mixinEnhance(true, configProps, data);
  // todo 使用 Json schema 校验数据 gridLayoutProps => GridData
  console.log(1, gridLayoutProps);

  const itemContent = () => {
    const { item, itemStyle } = gridLayoutProps;
    if (item) {
      return item.map(itemData => <Item key={itemData.id} data={itemData} style={itemStyle} />);
    }
    return null;
  };

  const containerContent = () => {
    const { container, containerStyle } = gridLayoutProps;
    if (container) {
      return (
        <Container data={container} style={containerStyle}>
          {itemContent()}
        </Container>
      );
    }
    return children;
  };

  return <>{containerContent()}</>;
};

GridLayout.defaultProps = {};

GridLayout.displayName = 'CssGridLayout';

export default GridLayout;
