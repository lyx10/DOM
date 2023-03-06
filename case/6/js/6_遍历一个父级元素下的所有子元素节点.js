// 遍历一个元素下的所有子元素
function getFullChildren(node){
  // 选出所有子节点
  var children = node.childNodes,
      len = children.length,
      item;
  
  // 如果节点存在并且nodeType === 1;就打印这个节点
  if(node && node.nodeType === 1){
    console.log(node);
  }
  // 循环遍历每一个子节点，遇到是元素节点的，就用递归
  for(var i = 0; i < len; i++){
    item = children[i];
    if(item[i].nodeType === 1){
      getFullChildren(item);
    }
  }
}