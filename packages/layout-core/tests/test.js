#! /usr/bin/env node
// const VNode = require('virtual-dom/vnode/vnode');
// const VText = require('virtual-dom/vnode/vtext');
// const createElement = require('virtual-dom/create-element');
//
// const data = {
//   "id": "demo1",
//   "name": "Preset1",
//   "container": {
//     "display": "grid",
//     "gridTemplateRows": "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
//     "gridTemplateColumns": "3fr 4fr 3fr",
//     "gridRowGap": "30px",
//     "gridColumnGap": "30px"
//   },
//   "item": [
//     {
//       "id": "1-1-4-1",
//       "rowStart": 1,
//       "columnStart": 1,
//       "rowSpan": 4,
//       "columnSpan": 1
//     },
//     {
//       "id": "5-1-4-1",
//       "rowStart": 5,
//       "columnStart": 1,
//       "rowSpan": 4,
//       "columnSpan": 1
//     },
//     {
//       "id": "1-2-5-1",
//       "rowStart": 1,
//       "columnStart": 2,
//       "rowSpan": 5,
//       "columnSpan": 1
//     },
//     {
//       "id": "6-2-3-1",
//       "rowStart": 6,
//       "columnStart": 2,
//       "rowSpan": 3,
//       "columnSpan": 1
//     },
//     {
//       "id": "1-3-4-1",
//       "rowStart": 1,
//       "columnStart": 3,
//       "rowSpan": 4,
//       "columnSpan": 1
//     },
//     {
//       "id": "5-3-4-1",
//       "rowStart": 5,
//       "columnStart": 3,
//       "rowSpan": 4,
//       "columnSpan": 1
//     }
//   ],
//   "containerStyles": {},
//   "itemStyles": {}
// };
//
// function render(data, inline) {
//   const props = {};
//   const {container, containerStyles} = data;
//   const cStyle = {...container, ...containerStyles};
//   if (inline) {
//     props.style = cStyle
//   } else {
//     props.className = data.container.name || data.name;
//     // 写出外联样式文件
//   }
//   const children = data.item.map(item => {
//     return new VNode('div', {}, [])
//   });
//   // children.push(c);
//
//   return new VNode('div', props, children);
// }
//
// const tree = render(data, true);
// const rootNode = createElement(tree);
// // document.body.appendChild(rootNode);
// console.log(rootNode.toString());

// var h = require('virtual-dom/h');
// var diff = require('virtual-dom/diff');
// var patch = require('virtual-dom/patch');
// var createElement = require('virtual-dom/create-element');
//
// // 1: Create a function that declares what the DOM should look like
// function render(count)  {
//   return h('div', {
//     style: {
//       textAlign: 'center',
//       lineHeight: (100 + count) + 'px',
//       border: '1px solid red',
//       width: (100 + count) + 'px',
//       height: (100 + count) + 'px'
//     }
//   }, [String(count)]);
// }
//
// // 2: Initialise the document
// var count = 0;      // We need some app data. Here we just store a count.
//
// var tree = render(count);               // We need an initial tree
// var rootNode = createElement(tree);
// console.log(rootNode.toString());
console.log("===================== TEST =====================");
const core = require('../lib/index');

const data = {
  "id": "demo1",
  "name": "Preset1",
  "container": {
    // "name": "container",
    "display": "grid",
    "gridTemplateRows": "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    "gridTemplateColumns": "3fr 4fr 3fr",
    "gridRowGap": "30px",
    "gridColumnGap": "30px"
  },
  "item": [
    {
      "id": "1-1-4-1",
      "name": "item1",
      "rowStart": 1,
      "columnStart": 1,
      "rowSpan": 4,
      "columnSpan": 1,
      "zIndex": 0,
      "component": {
        "lib": "d",
        "name": ""
      }
    },
    {
      "id": "5-1-4-1",
      "rowStart": 5,
      "columnStart": 1,
      "rowSpan": 4,
      "columnSpan": 1
    },
    {
      "id": "1-2-5-1",
      "rowStart": 1,
      "columnStart": 2,
      "rowSpan": 5,
      "columnSpan": 1
    },
    {
      "id": "6-2-3-1",
      "rowStart": 6,
      "columnStart": 2,
      "rowSpan": 3,
      "columnSpan": 1
    },
    {
      "id": "1-3-4-1",
      "rowStart": 1,
      "columnStart": 3,
      "rowSpan": 4,
      "columnSpan": 1
    },
    {
      "id": "5-3-4-1",
      "rowStart": 5,
      "columnStart": 3,
      "rowSpan": 4,
      "columnSpan": 1
    }
  ],
  "containerStyle": {},
  "itemStyle": {}
};

const styles = core.style(data);
console.log(styles);
console.log(core.getClassName(styles));
console.log(core.getStyles(styles));
