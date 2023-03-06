function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};
var getName = function () {
  console.log(4);
};
function getName() {
  console.log(5);
}
console.log(Foo());

// GO = {
// 
// getName() {
//   console.log(5);
// }
// getName = function () {
//   console.log(4);
// };
//   getName = function () {
//   console.log(1);
// };
//   Foo:function Foo() {
//   getName = function () {
//     console.log(1);
//   };
//   return this;
// }
// }

// 数组乱序
sort(function(a, b){
  var random = Math.random();
  return (random - 0.5);
});

// 字符串翻转
function test(str){
  var newArr = str.split('');
  return (newArr.reverse()).jion('');
}

// 数组方法分类，20种数组方法

// 返回多维数组的最大项
var arr = [
  [1, 2, 31, 4, 5, 6],
  [1, 2, 32, 4, 5, 6],
  [1, 2, 3, 4, 15, 6],
  [1, 23, 3, 4, 5, 6],
];

// function maxArr(arr){
//   var item,
//       len = arr.length,
//       newArr;
//   for(var i = 0; i < len; i++){
//     item = arr[i];
    
//     for(var j = 0; j < item.length; j++){
//       var max = item[j];
//       if()
//     }
//   }
// }

Function.prototype.apply.apply(Math.max, null, [1, 2, 3, 4, 5]);
Function.prototype.apply.call(Math.max, null, 1, 2, 3, 4, 5);
Math.max.apply(null,[1, 2, 3, 4, 5]);