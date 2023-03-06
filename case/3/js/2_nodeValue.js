// 文本节点、属性节点、注释节点有nodeValue属性

var oDiv = document.getElementsByTagName('div')[0];

// 文本节点的节点值
var textNode = oDiv.firstChild;
console.log(textNode.nodeValue);
// '
// 文本节点text
//  '

// 注释节点的节点值
var commentNode = oDiv.childNodes[1];
console.log(commentNode.nodeValue);  //注释君

// 属性节点的节点值

var attributeNode = oDiv.getAttributeNode('style');
console.log(attributeNode.nodeValue);   //background-color:#d0e4f5
console.log(attributeNode.value);       //background-color:#d0e4f5

// 元素节点有没有nodeValue属性呢(无)
var elementNode = oDiv.childNodes[3];
console.log(elementNode.nodeValue);    //null

// nodeValue属性可读可写
textNode.nodeValue = '我是修改后的文本节点';

commentNode.nodeValue = '我是修改后的注释君';
console.log(commentNode.nodeValue);  //我是修改后的注释君

attributeNode.nodeValue = 'background-color:#d0f5d0';
console.log(attributeNode.nodeValue);  //background-color:#d0f5d0
