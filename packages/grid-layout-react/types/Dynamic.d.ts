import React from 'react';
import { ComponentData } from 'grid-layout-core/data';
export interface DynamicProps extends Partial<ComponentData> {
    component?: string;
    props?: any;
}
declare const Dynamic: React.FC<DynamicProps>;
export default Dynamic;
