var oDiv = document.getElementById('box');

console.log(oDiv.attributes);   
//NamedNodeMap {
// 0: class,
// 1:id,
// 2: style,
// class: class,
// id: id,
// style: style,
// length: 3
// }

// 获取oDiv的id属性
console.log(oDiv.attributes[1]);  //id="box"
// 或者用getAttributeNode
console.log(oDiv.getAttributeNode('id'));  //id="box"
// attributes:元素的属性集合

// 相关方法，获取/设置属性的值 getAttribute()/setAttribute()
// 获取属性值
console.log(oDiv.getAttribute('style'));   //background-color:#d0e4f5

// 修改属性值
oDiv.setAttribute('style','background-color:#d0f5db');

// 获取属性节点的值的方法
// 1. oDiv.getAttributeNode('id').nodeValue
// 2. oDiv.getAttributeNode('id').value
// 3. oDiv.attributes[1].nodeValue
// 4. oDiv.attributes[1].value