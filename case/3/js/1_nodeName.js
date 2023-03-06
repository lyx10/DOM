var oDiv = document.getElementsByTagName('div')[0];

console.log(oDiv.nodeName);      //DIV

console.log(oDiv.nodeName.toLowerCase());   //div

var str = 'div';
console.log(str.toUpperCase());  //DIV

// toLowerCase() 将字符串里的字母变为小写
// toUpperCase() 将字符串里的字母变为大写

// document节点名称
console.log(document.nodeName);  //#document

// 文本节点名称
var textNode = oDiv.firstChild;
console.log(textNode.nodeName);  //#text

// 注释节点名称
var commentNode = oDiv.childNodes[1];
console.log(commentNode.nodeName);  //#comment

// 元素节点名称
var elementNode = oDiv.childNodes[3];
console.log(elementNode.nodeName);  //H1

// 除元素节点的nodeName是大写的（标签名变成大写）外，其余节点都是#对应的英文
// nodeName 是只读的属性