import React, { CSSProperties } from 'react';
import { omit } from 'lodash';
import { ContainerData, WithFalse } from 'grid-layout-core/data';
import { mixinEnhance } from './utils';

export interface ContainerStyle extends CSSProperties {}

export interface ContainerProps extends Partial<ContainerData> {
  /**
   * @description 数据配置
   * @default false
   */
  data?: WithFalse<ContainerData>;
  /**
   * @description 内联样式配置优先
   * @default true
   */
  stylePreferred?: boolean;
  /**
   * @description 外联样式名称
   */
  className?: string;
  /**
   * @description 内联样式
   */
  style?: ContainerStyle;
}

const Container: React.FC<ContainerProps> = props => {
  const { data, stylePreferred, children, className, style } = props;

  /**
   * 组件属性
   */
  const configProps = omit<ContainerProps>(props, ['children', 'data', 'dataPreferred', 'className', 'style']);

  const styles: CSSProperties = stylePreferred
    ? mixinEnhance(true, configProps, data as object, style) // 组件属性 < 配置文件 < 内联样式
    : mixinEnhance(true, style, configProps, data as object); // 内联样式 < 组件属性 < 配置文件

  return (
    <div className={className} style={styles}>
      {children}
    </div>
  );
};

Container.defaultProps = {
  display: 'grid',
  gridRowGap: 0,
  gridColumnGap: 0,
  data: false,
  stylePreferred: false,
};

Container.displayName = 'CssGridContainer';

export default Container;
