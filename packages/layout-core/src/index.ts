import VNode from 'virtual-dom/vnode/vnode';
import VText from 'virtual-dom/vnode/vtext';
import createElement from 'virtual-dom/create-element';
import { CSSProperties, GridData, ItemData } from 'css-grid-layout';
import { GridAreaFn, MountFn, CreateFn, StyleFn, CssFn } from 'css-grid-layout/specification';
import { keys, merge, values, pick, omit } from 'lodash';
import formatter from 'html-formatter';
import minDocument from 'min-document';

const CONTAINER = 'container';
const ITEM = 'item';
const SEPARATOR = ':';
type GridType = 'container' | 'item';

/**
 * 样式名称获取规则
 * @param className
 */
const classNameRule = (className: string) => className.split(SEPARATOR)[1];

/**
 * 获取样式类名
 * @param css
 */
const getClassName: (css: Record<string, CSSProperties>) => string = css =>
  keys(css)
    .map(name => classNameRule(name))
    .join(' ');

/**
 * 合并输出样式
 * @param css
 */
const getStyles: (css: Record<string, CSSProperties>) => CSSProperties = css => {
  const v = values<CSSProperties>(css);
  return merge({} as CSSProperties, ...(v as CSSProperties));
};

const containerClassName = (data: GridData) => {
  const { name, container } = data;
  return container.name || name;
};

const itemClassName = (itemData: ItemData) => {
  const { name, id } = itemData;
  return name || id;
};

const calcGridArea: GridAreaFn = itemData => {
  const { gridArea, rowStart, columnStart, rowSpan = 1, columnSpan = 1 } = itemData;
  if (gridArea) {
    return gridArea;
  }
  return `${rowStart} / ${columnStart} / span ${rowSpan} / span ${columnSpan}`;
};

const style: StyleFn = (gridData: GridData) => {
  const result: Record<string, CSSProperties> = {};
  // 容器样式
  const { container, containerStyle, item, itemStyle } = gridData;
  const containerStyleName = containerClassName(gridData);
  result[`${CONTAINER}${SEPARATOR}${containerStyleName}`] = {
    ...(omit(container, ['name']) as CSSProperties),
    ...containerStyle,
  };
  // 项目公用样式
  result[`${ITEM}${SEPARATOR}${ITEM}`] = { ...itemStyle };
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
    const itemStyleName = itemClassName(value);
    result[`${ITEM}${SEPARATOR}${itemStyleName}`] = { ...css, ...style };
  });
  return result;
};

/**
 * 创建节点
 * @param css
 * @param gridType
 * @param classNames
 * @param children
 * @param inline
 */
const createNode = (
  css: Record<string, CSSProperties>,
  gridType: GridType,
  classNames: string[],
  children: any[] = [],
  inline?: boolean,
) => {
  const props: any = {};
  const names = classNames.map(value => {
    if (!value.includes(SEPARATOR)) {
      return `${gridType}${SEPARATOR}${value}`;
    }
    return value;
  });
  const styles: Record<string, CSSProperties> = pick(css, names);
  if (inline) {
    props.style = getStyles(styles);
  } else {
    props.className = getClassName(styles);
  }
  return new VNode('div', props, children);
};

const createItems = (data: GridData, css: Record<string, CSSProperties>, inline?: boolean) => {
  const itemData = data.item || [];
  return itemData.map(item => {
    const { component, className } = item;

    const classNames: string[] = ['item', itemClassName(item)];
    if (className) {
      classNames.push(className);
    }

    let children = [];
    if (component && typeof component === 'string') {
      children = [new VText(String(component))];
    }
    return createNode(css, 'item', classNames, children, inline);
  });
};

const render = (data: GridData, inline?: boolean) => {
  const css = style(data);
  const className = containerClassName(data);
  const children = createItems(data, css, inline);
  return createNode(css, 'container', [className], children, inline);
};

const mount: MountFn = (gridData, inline = false, mountElement) => {
  const nodeTree = render(gridData, inline);
  const isDocument = mountElement && mountElement instanceof Document;
  const isElement = mountElement && mountElement instanceof Element;
  const doc: Document = isDocument ? (mountElement as Document) : minDocument;
  const e: Element = createElement(nodeTree, { document: doc, warn: true });
  if (isElement) {
    // eslint-disable-next-line no-param-reassign
     (mountElement as Element).innerHTML = e.toString();
}
  if (isDocument) {
    (mountElement as Document).body.appendChild(e);
  }
  return e;
};

const create: CreateFn = (gridData, inline = false, format = false) => {
  const result = mount(gridData, inline).toString();
  if (format) {
    return formatter.render(result);
  }
  return result;
};

const css: CssFn = styles => '';

export { calcGridArea, style, mount, create, css };
