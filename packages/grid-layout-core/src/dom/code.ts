import formatter from 'html-formatter';
import { GridData } from '../data';
import mount from './mount';

/**
 * 创建代码文本
 * @param gridData
 * @param inline
 * @param format
 */
export type CodeTextFn = (gridData: GridData, inline?: boolean, format?: boolean) => string;

const DomCodeText: CodeTextFn = (gridData, inline, format) => {
  const result = mount(gridData, inline).toString();
  if (format) {
    return formatter.render(result);
  }
  return result;
};

export default DomCodeText;
