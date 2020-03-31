import minDocument from 'min-document';
import createElement from 'virtual-dom/create-element';
import { GridData } from '../data';
import render from './render';

/**
 * 生成或挂载 dom 元素
 * @param gridData
 * @param inline
 * @param mountElement
 */
export type MountFn = (gridData: GridData, inline?: boolean, mountElement?: HTMLElement | Document) => Element;

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

export default mount;
