import React from 'react';
import { omit } from 'lodash';
import classNames from 'classnames';
import { ItemData, WithFalse, CSSProperties, calcGridArea } from 'grid-layout-core';
import { mixinEnhance } from './utils';
import Dynamic from './Dynamic';

export interface ItemStyle extends CSSProperties {}

export interface ItemProps extends Partial<ItemData> {
  /**
   * @description 项目内容中心化
   * @default true
   */
  centralized?: boolean;
  /**
   * @description ZIndex 基础值
   */
  baseZIndex?: number;
  /**
   * @description 数据配置
   * @default false
   */
  data?: WithFalse<ItemData>;
  /**
   * @description 项目内容
   */
  content?: React.ReactNode;
  /**
   * @description 网格项外联样式名称
   */
  className?: string;
  /**
   * @description 网格项内联样式
   */
  style?: ItemStyle;
}

const Item: React.FC<ItemProps> = props => {
  const { centralized, baseZIndex, data, children } = props;

  /**
   * 组件属性
   */
  const configProps: ItemProps = omit<ItemProps>(props, ['children', 'centralized', 'baseZIndex', 'data']) as ItemProps;

  /**
   * 属性合并
   */
  const itemProps: ItemProps = mixinEnhance(true, configProps, data as object);

  const itemContent = () => {
    const { component, content } = itemProps;
    if (component && typeof component === 'string') {
      return <Dynamic component={component} />;
    }
    if (component && typeof component === 'object') {
      return <Dynamic {...component} />;
    }
    if (content) {
      return content;
    }
    return children;
  };

  const { className, zIndex, style } = itemProps;

  const centralizedStyle = () => {
    let s: CSSProperties = {};
    if (centralized) {
      s = { display: 'flex', alignItems: 'center', justifyContent: 'center' };
    }
    return s;
  };

  return (
    <div
      className={classNames(className)}
      style={{
        zIndex: baseZIndex + (zIndex || 0),
        ...centralizedStyle(),
        ...style,
        gridArea: calcGridArea(itemProps as ItemData),
      }}>
      {itemContent()}
    </div>
  );
};

Item.defaultProps = {
  centralized: true,
  baseZIndex: 1000,
  rowStart: 1,
  columnStart: 1,
  rowSpan: 1,
  columnSpan: 1,
};

Item.displayName = 'CssGridItem';

export default Item;
