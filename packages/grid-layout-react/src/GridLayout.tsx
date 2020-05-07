import React from 'react';
import { omit } from 'lodash';
import { GridData } from 'grid-layout-core';
import Container from './Container';
import Item from './Item';
import { mixinEnhance } from './utils';

/**
 * 包裹组件，仅用于传递数据
 */
export interface GridLayoutProps extends Partial<GridData> {
  /**
   * @description 网格布局配置数据
   */
  data?: GridData;
}

const GridLayout: React.FC<GridLayoutProps> = (props) => {
  const { data, children } = props;

  /* 1.组件属性 */
  const configProps = omit<GridLayoutProps>(props, ['children', 'data']);

  /* 2.属性数据合并 */
  const gridLayoutProps: GridLayoutProps = mixinEnhance(true, configProps, data);
  // todo 使用 Json schema 校验数据 gridLayoutProps => GridData
  console.log(1, gridLayoutProps);

  const itemContent = () => {
    const { item, itemStyle } = gridLayoutProps;
    if (item) {
      return item.map((itemData) => <Item key={itemData.id} data={itemData} style={itemStyle} />);
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
