import { GridData } from '../data';

type Result<T> = true | T[];

export type VerifyFn = (gridData: GridData) => Result<string>;

const verify: VerifyFn = gridData => true;

export default verify;
