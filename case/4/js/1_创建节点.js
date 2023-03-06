// 创建 document.createElement()
// 在Document.prototype上
// Element.prototype上没有

// 创建元素节点
var oDiv = document.createElement('div');
// 此时oDiv对象已创建好，放在内存中，并没有挂到DOM树上

document.body.appendChild(oDiv);
// 把oDiv元素放到body里，此时创建的div元素才挂到了DOM树上

// 创建文本节点
var oText = document.createTextNode('我是创建出来的文本节点');
oDiv.appendChild(oText);
// 将文本放入标签中

// 创建注释节点
var oComment = document.createComment('我是注释');
oDiv.appendChild(oComment);