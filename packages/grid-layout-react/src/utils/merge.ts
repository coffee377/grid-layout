import { isArray, merge, mergeWith } from 'lodash';

type Merge = (...source: object[]) => object;
type EnhanceMerge = (arrayReplace: boolean, ...source: object[]) => object;

const customizer = (objValue, srcValue) => {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  return undefined;
};

const mixinEnhance: EnhanceMerge = (replace, ...source) => {
  let array: boolean = false;
  source.forEach(value => {
    array = Array.isArray(value);
  });

  if (array) {
    return replace ? merge([], ...source) : mergeWith([], ...source, customizer);
  }
  return replace ? merge({}, ...source) : mergeWith({}, ...source, customizer);
};

const mixin: Merge = (...source) => mixinEnhance(false, ...source);

export { mixinEnhance, mixin };
