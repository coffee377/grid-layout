#! /usr/bin/env node
console.log('===================== TEST =====================');
const core = require('../dist/index');

const data = {
  id: 'demo1',
  name: 'demo1',
  container: {
    display: 'grid',
    gridTemplateColumns: '3fr 4fr 3fr',
    gridTemplateRows: 'repeat(8,55px)',
    gridRowGap: '30px',
    gridColumnGap: '30px'
  },
  containerStyle: {
    width: '90vw',
    height: 'calc(100vh - 30px)',
    margin: '30px auto 0'
  },
  item: [
    {
      id: '1-1-4-1',
      "name": "item1",
      columnStart: 1,
      rowStart: 1,
      rowSpan: 4,
      columnSpan: 1,
    },
    {
      id: '5-1-4-1',
      name: "item2",
      rowStart: 5,
      columnStart: 1,
      rowSpan: 4,
      columnSpan: 1
    },
    {
      id: '1-2-5-1',
      name: "item3",
      rowStart: 1,
      columnStart: 2,
      rowSpan: 5,
      columnSpan: 1
    },
    {
      id: '6-2-3-1',
      name: "item4",
      rowStart: 6,
      columnStart: 2,
      rowSpan: 3,
      columnSpan: 1
    },
    {
      id: '1-3-4-1',
      name: "item5",
      rowStart: 1,
      columnStart: 3,
      rowSpan: 4,
      columnSpan: 1
    },
    {
      id: '5-3-4-1',
      name: "item6",
      rowStart: 5,
      columnStart: 3,
      rowSpan: 4,
      columnSpan: 1
    }
  ],
  itemStyle: {
    padding: '5px',
    border: 'solid #0b5d9c 1px',
    borderRadius: '8px'
  }
};


const styles = core.style(data);
console.log(styles);
// console.log(core.getClassName(styles));
// console.log(core.getStyles(styles));
// console.log(core.mount(data));
const str = core.create(data, false, true);
const css = core.css(styles,true);
console.log(str);
console.log(css);
// // console.log(str.substring(0,180));
// const fs = require("fs");
//
// // 1.打开文件, 没有就创建, 以什么样的形式来打开文件 w:写 r:读
// let fd = fs.openSync('1.txt', 'w');
//
// // 2.写入文件,如果要写入文件必须要用 w 方式打开
// const formatter = require('html-formatter');
// const result = formatter.render(str);
// console.log(result);
// fs.writeFileSync(fd, result);
//
// // 3.关闭文件资源
// fs.closeSync(fd);

console.log('===================== TEST =====================');
