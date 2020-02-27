import { forIn } from 'Lodash';
import {
  Block,
  Declaration,
  Rule,
  StyleSheet,
  SelectorList,
  Selector,
  ClassSelector,
  IdSelector,
  generate,
} from 'css-tree';
import { CSSProperties } from 'layout-data';
import { CssFn } from 'layout-core/css';
import beautify from 'cssbeautify';
import { ClassNameRule } from './classNameRule';

const classSelector = (name: string) => ({ type: 'ClassSelector', name } as ClassSelector);

const idSelector = (name: string) => ({ type: 'IdSelector', name } as IdSelector);

const selectorList = (selectors: Selector[]) => ({ type: 'SelectorList', children: [...selectors] } as SelectorList);

const style = camelStyle => camelStyle.replace(/([A-Z])/g, '-$1').toLowerCase();

const declaration = (k: string, v: string) =>
  ({ type: 'Declaration', property: style(k), value: { type: 'Raw', value: v } } as Declaration);

const block = (css: CSSProperties) => {
  const children = [];
  forIn(css, (v, k) => {
    children.push(declaration(k, v));
  });
  return { type: 'Block', children } as Block;
};

const rule: (name: string, css: CSSProperties) => Rule = (name, css) => {
  const selectors: Selector[] = [];
  const cs: ClassSelector = classSelector(ClassNameRule.phrase(name).name);
  const selector: Selector = { type: 'Selector', children: [cs] } as Selector;
  selectors.push(selector);
  return { type: 'Rule', prelude: selectorList(selectors), block: block(css) };
};

const ast: (style: Record<string, CSSProperties>) => StyleSheet = style => {
  const children = [];
  forIn(style, (v, k) => {
    children.push(rule(k, v));
  });
  return { type: 'StyleSheet', children } as StyleSheet;
};

const cssCodeText: CssFn = (css, format, opts) => {
  const result = generate(ast(css), { sourceMap: false });
  const { indent = '  ', openBrace = 'end-of-line', autoSemicolon = true } = opts || {};
  const opt = { indent, openbrace: openBrace, autosemicolon: autoSemicolon, ...opts };
  if (format) {
    return beautify(result, opt as any);
  }
  return result;
};

export { cssCodeText };
