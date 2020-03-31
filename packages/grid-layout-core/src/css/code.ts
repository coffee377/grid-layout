import { forIn, merge } from 'lodash';
import { Block, Declaration, Rule, StyleSheet, SelectorList, Selector, ClassSelector, generate, List } from 'css-tree';
import beautify from 'cssbeautify';
import { CSSProperties, GridData } from '../data';
import { ClassNameRule } from '../rule';
import { calcStyle } from '../helper';

interface Options {
  /**
   * A string used for the indentation of the declaration (default is 4
   * spaces).
   */
  indent?: string;
  /**
   * Defines the placement of open curly brace, either end-of-line (default)
   * or separate-line
   */
  openbrace?: 'end-of-line' | 'separate-line';

  /**
   * Always inserts a semicolon after the last ruleset(default is false)
   */
  autosemicolon?: boolean;
}

type CssFn = (data: Record<string, CSSProperties> | GridData, format?: boolean, formatOpts?: Options) => string;

const classSelector = (name: string) => ({ type: 'ClassSelector', name } as ClassSelector);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const idSelector = (name: string) => ({ type: 'IdSelector', name } as IdSelector);

const selectorList = (selectors: Selector[]) => {
  const children = new List<Selector>().fromArray(selectors);
  return { type: 'SelectorList', children } as SelectorList;
};

const style = camelStyle => camelStyle.replace(/([A-Z])/g, '-$1').toLowerCase();

const declaration = (k: string, v: string) =>
  ({ type: 'Declaration', property: style(k), value: { type: 'Raw', value: v } } as Declaration);

const block = (css: CSSProperties) => {
  const children = new List<Declaration>();
  forIn(css, (v, k) => {
    children.push(declaration(k, v as string));
  });
  return { type: 'Block', children } as Block;
};

const rule: (name: string, css: CSSProperties) => Rule = (name, css) => {
  const selectors: Selector[] = [];
  const cs: ClassSelector = classSelector(ClassNameRule.phrase(name).name);
  const children = new List<ClassSelector>();
  children.push(cs);
  const selector: Selector = { type: 'Selector', children } as Selector;
  selectors.push(selector);
  return { type: 'Rule', prelude: selectorList(selectors), block: block(css) };
};

const ast: (style: Record<string, CSSProperties>) => StyleSheet = style => {
  const children = new List<Rule>();
  forIn(style, (v, k) => {
    children.push(rule(k, v));
  });
  return { type: 'StyleSheet', children } as StyleSheet;
};

const isGridData = (props: any): props is GridData =>
  props.id &&
  typeof props.id === 'string' &&
  props.name &&
  typeof props.name === 'string' &&
  props.container &&
  typeof props.container === 'object';

const CssCodeText: CssFn = (data, format, opts) => {
  let css: Record<string, CSSProperties> = data as Record<string, CSSProperties>;
  if (isGridData(data)) {
    css = calcStyle(data);
  }

  const result = generate(ast(css), { sourceMap: false });
  if (format) {
    const { indent, openBrace, autoSemicolon } = merge(
      {},
      { indent: '  ', openBrace: 'end-of-line', autoSemicolon: true },
      opts,
    );
    const opt = { indent, openbrace: openBrace, autosemicolon: autoSemicolon };
    return beautify(result, opt as any);
  }
  return result;
};

export default CssCodeText;
