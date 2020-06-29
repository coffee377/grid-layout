interface Options {
  /**
   * @description 主键字段
   */
  idKey?: string;
  /**
   * @description 数据关联的父级字段
   */
  pidKey?: string;
  /**
   * @description 排序字段
   */
  sortKey?: string;
  /**
   * @description 是否降序排列
   */
  isDesc?: boolean;
}

const list2Tree = (list: [], options: Options = { idKey: 'id', pidKey: 'pid', sortKey: 'sort', isDesc: false }) => {};
