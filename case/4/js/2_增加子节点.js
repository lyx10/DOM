// 增加子节点 appendChild
// 在Node.prototype上

// var oDiv = document.createElement('div'),
//     oParagraph = document.createElement('p'),
//     oText = document.createTextNode('ECMAScript'),
//     oComment = document.createComment('这是一条注释');
// oParagraph.innerHTML = "JavaScript";


// document.body.appendChild(oDiv);
// oDiv.appendChild(oParagraph);
// oDiv.appendChild(oText);
// oDiv.appendChild(oComment);

var a = document.getElementsByTagName('a')[0],
    div = document.createElement('div');

div.innerHTML = '<p>我是段落标签</p>';
document.body.appendChild(div);
div.appendChild(a);



// appendChild()可以将DOM树中的元素‘剪切并粘贴’到指定位置
// appendChild();参数是节点/DOM元素，不能放字符串

// var str = '<div><div>'
// appendChild(str)    //会报错 parameter 1 is not of type 'Node'