function A(name) {
  this.name = name;
  this.show = function () {
    console.log(this.name);
  };
  this.show1 = () => {
    console.log(this.name);
  };
  this.show2 = function (){
    console.log(name);
  }
}

var a = new A("张三");
var b = {...a, name: "李四"};

// a = {
//   name: "张三",
//   show:  function () {
//     console.log(this.name);
//   },
//   show1: () => {
//     console.log(this.name);
//   },
//   show2: function (){
//     console.log(name);
//   }
// }

// b = {
//   name: "李四",
//   show:  function () {
//     console.log(this.name);
//   },
//   show1: () => {
//     console.log(this.name);
//   },
//   show2: function (){
//     console.log(name);
//   }
// }

console.log(b);

a.show();
b.show();
b.show1();
b.show2();


// 与offset尺寸有关的属性和方法

// offsetParent
// offsetWidth
// 1. 当前元素在水平所占用的空间的宽度
// 2. 滚动条不影响offset尺寸
// offsetLeft
// 

// offset尺寸

// client尺寸

// scroll尺寸

// 跳到指定位置
// 1. 锚点
// 2. scrollTo
// 3. scrollBy
// scrollTop = '100'