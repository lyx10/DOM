// 构造函数原型属性
Person.prototype = {
  age: 18
}

// 构造函数
function Person() {
  this.name = '张三';
}

// 实例化构造函数
var p1 = new Person();

console.log(p1.name);  //'张三'
console.log(p1.age);   //18

// 构造函数构造出来的所有对象都继承于构造函数的原型属性
// p1可以直接继承构造函数上原型属性的所有方法和属性

// 对象中的__proto__存放的是原型

// 对象中的__proto__里面也存放了__proto__(原型的原型)，直到Object.prototype的时候终止，这一系列沿着__proto__找到相应原型的链条，叫原型链。

// 所有构造函数都是有原型属性的，无论是自定义还是系统定义的
// 所有的构造函数命名都是以大驼峰命名，首字母大写

// document.getElementById()等方法不在document对象里，它是继承过来的

// document的构造函数是谁？HTMLDocument
console.log(document.__proto__);   //HTMLDocument.prototype
console.log(document.__proto__.constructor);   //ƒ HTMLDocument() { [native code] }

// HTMLDocument的构造函数是谁？Document
console.log(HTMLDocument.__proto__);   //Document.prototype
console.log(HTMLDocument.__proto__.constructor);   //ƒ Function() { [native code] }

// 总结：
console.log(document.__proto__ === HTMLDocument.prototype);  //true
console.log(HTMLDocument.prototype.__proto__ === Document.prototype);  //true

// document 构造函数 -> HTMLDocument
// HTMLDocument 构造函数 -> Document

// 原型上编程
HTMLDocument.prototype.say = function() {
  console.log('Hello HTMLDocument');
}
Document.prototype.said = function() {
  console.log('Hello Document');
}

document.say();   //Hello HTMLDocument
document.said();  //Hello Document

// document是HTMLDocument的实例对象，它的原型链可以访问Document.里面的属性和方法。

// DOM结构树
// Node = {
//   Document :{
//     XMLDocument,
//     HTMLDocument
//   },
//   CharacterData: {
//     Text,
//     Comment
//   },
//   Element: {
//     XMLElement,
//     HTMLElement: {
//       HTMLHeadElement,
//       HTMLBodyElement,
//       HTMLTitleElement,
//       HTMLParagraphElement,
//       HTMLInputElement,
//       HTMLTableElement
//        ...
//     }
//   },
//   Attributes
// }

Text.prototype.aaa = 'aaa';
CharacterData.prototype.bbb = 'bbb';
var oDiv = document.getElementById('box');
var text = oDiv.childNodes[0];
console.log(text);   //"文本节点text"
console.log(text.aaa, text.bbb);   //aaa bbb

Element.prototype.aaa = 'aaa';
HTMLElement.prototype.bbb = 'bbb';
HTMLDivElement.prototype.ccc = 'ccc';

var div = document.getElementsByTagName('div')[0];
var p = document.getElementsByTagName('p')[0];

console.log(div.ccc);  //ccc 
// div是由HTMLDivElement构造出来的，继承于HTMLDivElement.prototype
console.log(div.bbb);  //bbb
console.log(div.aaa);  //aaa

console.log(p.aaa);    //aaa
console.log(p.bbb);    //bbb
console.log(p.ccc);    //undefined
// p是由HTMLParagraphElement构造出来的，不继承于HTMLDivElement.prototype

// a标签的跳转事件：它不是DOM事件，a标签的跳转，调用的是BOM的window.open()或window.locationHref()方法

console.log(document.__proto__);  //HTMLDocument.prototype
console.log(document.__proto__.__proto__);  //Document.prototype
console.log(document.__proto__.__proto__.__proto__);  //Node.prototype
console.log(document.__proto__.__proto__.__proto__.__proto__);  //EventTarget.prototype
console.log(document.__proto__.__proto__.__proto__.__proto__.__proto__);  //Object.prototype

console.log(Object.prototype.toString.call(div));  //[object HTMLDivElement]

// DOM操作深入

// 1.getElementById() 
// 在Document.prototype上
// Element.prototype/HTMLElement.prototype 没有

// 2.getElementsByName()
// 在Document.prototype上
// Element.prototype/HTMLElement.prototype 没有

// 3.
// getElementsByTagName()
// getElementsByClassName()
// querySelector()
// querySelectorAll()
// Document.prototype 和 Element.prototype上都有

// var oPragraph = div.getElementsByTagName('p')[0];
// console.log(oPragraph);

// 可以用div.getElementsByTagName('p')[0]; 选div里面的第一个p元素

// *
var all = document.getElementsByTagName('*');  //选出文档中的全部标签，包括html和script标签
console.log(all);
// head body 2种方法
var oBody = document.body;
var oHead = document.head;
console.log(oBody);  //<body>...</body>
console.log(document.body === document.getElementsByTagName('body')[0]); 
// true

console.log(oHead);  //<head>...</head>
console.log(document.head === document.getElementsByTagName('head')[0]);
// true

console.log(document.title);  //课时3 document.title选出的是title元素的文本

console.log(document.getElementsByTagName('title')[0]);