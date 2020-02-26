import { GridAreaFn } from 'css-grid-layout/specification';

export const CONTAINER = 'container';
export const ITEM = 'item';
export const SEPARATOR = ':';
export type GridType = 'container' | 'item';

/**
 * 样式名称获取规则
 * @param className
 */
export const classNameRule = (className: string) => className.split(SEPARATOR)[1];

export const calcGridArea: GridAreaFn = itemData => {
  const { gridArea, rowStart, columnStart, rowSpan = 1, columnSpan = 1 } = itemData;
  if (gridArea) {
    return gridArea;
  }
  return `${rowStart} / ${columnStart} / span ${rowSpan} / span ${columnSpan}`;
};
