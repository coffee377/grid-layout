#! /usr/bin/env node
console.log('===================== TEST =====================');
const core = require('../dist/index');

const data = {
  id: 'demo1',
  name: 'demo1',
  container: {
    name: 'test',
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
      name: "item1a",
      className: 'coffee',
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


const styles = core.calcStyle(data);
console.log(styles);
const str = core.domCodeText(data, false, true);
const css = core.cssCodeText(styles,true);
console.log(str);
console.log(css);

console.log('===================== TEST =====================');
