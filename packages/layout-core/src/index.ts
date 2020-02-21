import VNode from 'virtual-dom/vnode/vnode';
import VText from 'virtual-dom/vnode/vtext';
import createElement from 'virtual-dom/create-element';
// @ts-ignore
import {GridData, CSSProperties, GridArea, Mount, Create, Style} from "css-grid-layout/specification"
import {keys, merge, values, pick, omit} from 'lodash';

const CONTAINER = 'container';
const ITEM = 'item';
const SEPARATOR = ":";
type GridType = 'container' | 'item'

/**
 * 样式名称获取规则
 * @param className
 */
const classNameRule = (className: string) => className.split(SEPARATOR)[1];

/**
 * 获取样式类名
 * @param css
 */
export const getClassName: (css: Record<string, CSSProperties>) => string = (css) => {
  return keys(css).map(name => {
    return classNameRule(name);
  }).join(" ");
};

/**
 * 合并输出样式
 * @param css
 */
export const getStyles: (css: Record<string, CSSProperties>) => CSSProperties = (css) => {
  return merge({}, ...values(css))
};

export const style: Style = (gridData: GridData) => {
  const result: Record<string, CSSProperties> = {};
  // 容器样式
  const {name, container, containerStyle, item, itemStyle} = gridData;
  result[`${CONTAINER}${SEPARATOR}${container.name || name}`] = {...omit(container, ['name']), ...containerStyle};
  // 项目公用样式
  result[`${ITEM}${SEPARATOR}${ITEM}`] = {...itemStyle};
  // 项目样式
  item.forEach(value => {
    const {id, name, zIndex, justifySelf, alignSelf, style} = value;
    const gridArea = calcGridArea(value);
    let css: CSSProperties = {gridArea};
    if (zIndex) {
      css["zIndex"] = zIndex
    }
    if (justifySelf) {
      css["justifySelf"] = justifySelf
    }
    if (alignSelf) {
      css["alignSelf"] = alignSelf
    }
    result[`${ITEM}${SEPARATOR}${name || id}`] = {...css, ...style};
  });
  return result
};

/**
 * 创建节点
 * @param css
 * @param gridType
 * @param classNames
 * @param children
 * @param inline
 */
const createNode = (css: Record<string, CSSProperties>, gridType: GridType, classNames: string[], children: any[] = [], inline?: boolean) => {
  const props: any = {};
  const names = classNames.map(value => {
    if (!value.includes(SEPARATOR)) {
      return `${gridType}${SEPARATOR}${value}`
    }
    return value
  });
  const styles = pick(names);
  if (inline) {
    props.style = getStyles(styles);
  } else {
    props.className = getClassName(styles);
  }
  return new VNode('div', props, children)
};

const createItems = (data: GridData, inline?: boolean) => {
  const itemData = data.item || [];
  const {itemStyle} = data;
  return itemData.map(item => {
    const {component} = item;
    // const className = `item ${name}`;
    let children = [];
    if (component && typeof component === 'string') {
      children = [new VText(String(children))]
    }
    return createNode({...itemStyle}, 'item', ['item', item.name || item.id], children, inline)
  })
};

const render = (data: GridData, inline?: boolean) => {
  const children = createItems(data, inline);
  const css = {};
  return createNode(css, 'container', [''], children, inline)
};

export const calcGridArea: GridArea = (itemData) => {
  const {gridArea, rowStart, columnStart, rowSpan = 1, columnSpan = 1} = itemData;
  if (gridArea) {
    return gridArea;
  }
  return `${rowStart} / ${columnStart} / span ${rowSpan} / span ${columnSpan}`;
};

export const mount: Mount = (gridData, inline = false, document) => {
  const nodeTree = render(gridData);
  return createElement(nodeTree, {document})
};

export const create: Create = (gridData, inline = false, format = false) => {
  const result = mount(gridData, inline).toString();
  if (format) {
    // 格式代码返回
  }
  return result;
};
