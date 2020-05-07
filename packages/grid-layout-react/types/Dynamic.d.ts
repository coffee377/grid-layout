import React from 'react';
import { ComponentData } from 'grid-layout-core';
export interface DynamicProps extends Partial<ComponentData> {
    component?: string;
}
declare const Dynamic: React.FC<DynamicProps>;
export default Dynamic;
