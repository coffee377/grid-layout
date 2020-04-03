import { CSSProperties, GridData } from "../data";
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
declare type CssFn = (data: Record<string, CSSProperties> | GridData, format?: boolean, formatOpts?: Options) => string;
declare const CssCodeText: CssFn;
export default CssCodeText;
