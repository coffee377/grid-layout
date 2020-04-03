import { GridData } from "../data";
declare type Result<T> = true | T[];
export declare type VerifyFn = (gridData: GridData) => Result<string>;
declare const verify: VerifyFn;
export default verify;
