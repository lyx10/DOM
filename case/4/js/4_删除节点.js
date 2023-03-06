// 删除子节点  parent.removeChild(childNode)
// 在Node.prototype上

// var div = document.getElementsByTagName('div')[0],
//     p = div.getElementsByTagName('p')[0];


// div.removeChild(p);
// 返回值是移除的元素节点，这个方法只是将节点从DOM树上‘摘’下来，并没有从内存中删除。

// 删除节点 node.remove()
// 在Element.prototype上
var a = document.getElementsByTagName('a')[0],
    aText = a.childNodes[0];
aText.remove();
// 返回值是undefined，移除div节点，不但DOM树上不存在了，内存中也没有了。