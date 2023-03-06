var oUl = document.getElementById('list'),
    // 创建文档片段，该片段存在于内存中，但不会在dom中出现
    oFrag = document.createDocumentFragment();
// 前面加o是为了有意地让人知道这是一个对象，o代表object(DOM对象)
for(var i = 0; i < 10000; i++){
  var oLi = document.createElement('li');
  oLi.innerHTML = '这是第' + i + '个项目';
  oLi.className = 'list-item';
  // 先把一个个li放到文档片段中，这样可以在最后一次性把全部li元素添加到ul,因为如果每次添加一个li到ul,浏览器要不断去计算li应该放到文档的位置
  oFrag.appendChild(oLi);
}
oUl.appendChild(oFrag);

// DocumentFragment 节点 存在于内存中，不在DOM树上，将它插入到文档中，不会引起页面的回流，不会引起这个对象的位置几何计算
