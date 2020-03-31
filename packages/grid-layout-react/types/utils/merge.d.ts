declare type Merge = (...source: object[]) => object;
declare type EnhanceMerge = (arrayReplace: boolean, ...source: object[]) => object;
declare const mixinEnhance: EnhanceMerge;
declare const mixin: Merge;
export { mixinEnhance, mixin };
