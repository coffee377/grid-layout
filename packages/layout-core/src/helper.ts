import { GridAreaFn, StyleFn } from 'layout-core/helper';
import { CSSProperties, GridData, ItemData } from 'layout-data';
import { omit } from 'lodash';
import { ITEM } from './const';
import { ClassNameRule } from './classNameRule';

const calcGridArea: GridAreaFn = itemData => {
  const { gridArea, rowStart, columnStart, rowSpan = 1, columnSpan = 1 } = itemData;
  if (gridArea) {
    return gridArea;
  }
  return `${rowStart} / ${columnStart} / span ${rowSpan} / span ${columnSpan}`;
};

export const containerClassName = (data: GridData) => {
  const { name, container } = data;
  return container.name || name;
};

export const itemClassName = (itemData: ItemData) => {
  const { name, id } = itemData;
  return name || id;
};

const calcStyle: StyleFn = gridData => {
  const result: Record<string, CSSProperties> = {};
  // 容器样式
  const { container, containerStyle, item, itemStyle } = gridData;
  const containerStyleName = ClassNameRule.container(containerClassName(gridData)).key();
  result[`${containerStyleName}`] = {
    ...(omit(container, ['name']) as CSSProperties),
    ...containerStyle,
  };
  // 项目公用样式
  const itemCommonStyleName = ClassNameRule.item(ITEM).key();
  result[`${itemCommonStyleName}`] = { ...itemStyle };
  // 项目样式
  item.forEach(value => {
    const { zIndex, justifySelf, alignSelf, style } = value;
    const gridArea = calcGridArea(value);
    const css: CSSProperties = { gridArea };
    if (zIndex) {
      css['zIndex'] = zIndex;
    }
    if (justifySelf) {
      css['justifySelf'] = justifySelf;
    }
    if (alignSelf) {
      css['alignSelf'] = alignSelf;
    }
    const itemStyleName = ClassNameRule.item(itemClassName(value)).key();
    result[`${itemStyleName}`] = { ...css, ...style };
  });
  return result;
};

export { calcGridArea, calcStyle };
