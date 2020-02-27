declare module 'layout-core' {
  export * from 'layout-core/helper';
  export * from 'layout-core/dom';
  export * from 'layout-core/css';
  export * from 'layout-core/validator';
}

declare module 'layout-core/helper' {
  // eslint-disable-next-line import/no-duplicates
  import { CSSProperties, GridData, ItemData } from 'layout-data';

  export * from 'layout-core/helper/name-rule';

  /**
   * @description 计算网格项目所在区域
   * @param itemData
   */
  export type GridAreaFn = (itemData: ItemData) => string;

  export const calcGridArea: GridAreaFn;

  /**
   * 样式记录
   * @param gridData
   */
  export type StyleFn = (gridData: GridData) => Record<string, CSSProperties>;

  export const calcStyle: StyleFn;
}

declare module 'layout-core/helper/name-rule' {
  // eslint-disable-next-line import/no-duplicates
  import { GridType } from 'layout-data';

  export { GridType };

  export class ClassNameRule {
    readonly type: GridType;

    readonly name: string;

    readonly separator: string;

    key: () => string;

    static of: (type: GridType, name: string, separator: string) => ClassNameRule;

    static container: (name: string) => ClassNameRule;

    static item: (name: string) => ClassNameRule;
  }
}

declare module 'layout-core/dom' {
  // eslint-disable-next-line import/no-duplicates
  import { GridData } from 'layout-data';

  /**
   * 生成或挂载 dom 元素
   * @param gridData
   * @param inline
   * @param mountElement
   */

  export type MountFn = (gridData: GridData, inline?: boolean, mountElement?: HTMLElement | Document) => Element;

  export const mount: MountFn;

  /**
   * 创建代码文本
   * @param gridData
   * @param inline
   * @param format
   */
  export type CodeTextFn = (gridData: GridData, inline?: boolean, format?: boolean) => string;

  export const domCodeText: CodeTextFn;
}

declare module 'layout-core/css' {
  // eslint-disable-next-line import/no-duplicates
  import { CSSProperties } from 'layout-data';

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

  export type CssFn = (styles: Record<string, CSSProperties>, format?: boolean, formatOpts?: Options) => string;

  export const cssCodeText: CssFn;
}

declare module 'layout-core/validator' {
  // eslint-disable-next-line import/no-duplicates
  import { GridData } from 'layout-data';

  type Result<T> = true | T[];

  export type VerifyFn = (gridData: GridData) => Result<string>;

  export const verify: VerifyFn;
}
