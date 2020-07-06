import { from, of } from 'rxjs';
import { filter, groupBy, map, mergeMap, switchMap, toArray } from 'rxjs/operators';

export interface TreeOptions {
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
  /**
   * @description 根节点 pidKey 字段值
   */
  root?: string;
}

const DefaultTreeOptions: TreeOptions = {
  idKey: 'id',
  pidKey: 'pid',
  sortKey: 'sort',
  isDesc: false,
  root: undefined,
};

type Node = Exclude<Record<string, any>, 'children'>;

const list2tree: <T = Node>(list: T[], opts?: TreeOptions) => (T & { children?: T[] })[] = (
  list,
  opts = DefaultTreeOptions,
) => {
  const { idKey, pidKey, sortKey, isDesc, root } = opts;
  // debugger;
  let result = [];

  /* 获取根节点 */
  const rootNode$ = from(list)
    .pipe(
      filter((node) => {
        debugger;
        if (root) {
          return root.toLowerCase() === String(node[pidKey]).toLowerCase();
        }
        return !node[pidKey];
      }),
    )
    .pipe(toArray());

  rootNode$.subscribe(
    (value) => {
      // debugger;
      // value.map((node) => ({ ...node, children: [] }));
      console.log('rootNode$', value);
      result = value;
    },
    (error) => {
      console.log(error);
    },
    () => {
      console.log('rootNode complete');
    },
  );

  const parent$ = from(list)
    .pipe(
      groupBy(
        (menu) => menu[pidKey],
        (menu) => menu,
      ),
    )
    .pipe(
      mergeMap((group$) => {
        return group$
          .pipe(toArray())
          .pipe(
            map((m) =>
              m.sort((a, b) => {
                /* 降序排序 */
                if (isDesc) {
                  return (b[sortKey] || 100) - (a[sortKey] || 100);
                }
                return (a[sortKey] || 100) - (b[sortKey] || 100);
              }),
            ),
          )
          .pipe(switchMap((v) => of({ [group$.key]: v })))
          .pipe
          // scan((acc, v, i) => {
          //   debugger;
          //   return acc + v;
          // }),
          ();
      }),
    )
    .pipe();

  parent$.subscribe(
    (value) => {
      // debugger;
      // value.map((node) => ({ ...node, children: [] }));
      console.log(value);
    },
    (error) => {
      console.log(error);
    },
    () => {
      console.log('parent complete');
    },
  );

  return result;
};

export { list2tree };
