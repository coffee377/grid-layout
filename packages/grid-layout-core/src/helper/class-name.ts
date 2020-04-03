import { GridData, ItemData } from '../data';

const containerClassName = (data: GridData) => {
  const { name, container } = data;
  return container.name || name;
};

const itemClassName = (itemData: ItemData) => {
  const { name, id } = itemData;
  return name || id;
};

export { containerClassName, itemClassName };
