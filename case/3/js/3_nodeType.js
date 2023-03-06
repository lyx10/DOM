var oDiv = document.getElementsByTagName('div')[0];
console.log(oDiv.nodeType);   //1

// 元素节点的nodeType
var elemmentNode = oDiv.childNodes[3];
console.log(elemmentNode.nodeType);   //1

// 属性节点的nodeType
var attributeNode = oDiv.getAttributeNode('class');
console.log(attributeNode.nodeType);  //2

// 文本节点的nodeType
var textNode = oDiv.firstChild;
console.log(textNode.nodeType);   //3

// 注释节点的nodeType
var commentNode = oDiv.childNodes[1];
console.log(commentNode.nodeType);  //8

// document的nodeType
var doc = document;
console.log(doc.nodeType);  //9

// nodeType是只读属性

// 用childNodes和nodeType封装获取子元素节点的方法
function getChildren(node) {
  var children = node.childNodes,
      len = children.length,
      temp = {
        "length": 0,
        "splice": Array.prototype.splice
      },
      item;
  for(var i = 0; i < len; i++){
    item = children[i];
    if(item.nodeType === 1){
      temp[temp['length']] = item[i];
      temp['length']++;
    }
  }
  return temp;

}