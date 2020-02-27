import { MountFn, CodeTextFn } from 'layout-core/dom';
import formatter from 'html-formatter';
import minDocument from 'min-document';
import createElement from 'virtual-dom/create-element';
import { CSSProperties, GridData, GridType } from 'layout-data';
import { merge, pick, values } from 'lodash';
import VNode from 'virtual-dom/vnode/vnode';
import VText from 'virtual-dom/vnode/vtext';
import { calcStyle, containerClassName, itemClassName } from './helper';
import { ClassNameRule } from './classNameRule';

/**
 * 合并输出样式
 * @param css
 */
const getStyles: (css: Record<string, CSSProperties>) => CSSProperties = css => {
  const v = values<CSSProperties>(css);
  return merge({} as CSSProperties, ...(v as CSSProperties));
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
  const names = classNames.map(value => ClassNameRule.of(gridType, value).key());
  const styles: Record<string, CSSProperties> = pick(css, names);
  if (inline) {
    props.style = getStyles(styles);
  } else {
    props.className = classNames.join(' ');
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
  const css = calcStyle(data);
  const className = containerClassName(data);
  const children = createItems(data, css, inline);
  return createNode(css, 'container', [className], children, inline);
};

const mount: MountFn = (gridData, inline, mountElement) => {
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

const domCodeText: CodeTextFn = (gridData, inline, format) => {
  const result = mount(gridData, inline).toString();
  if (format) {
    return formatter.render(result);
  }
  return result;
};

export { mount, domCodeText };
