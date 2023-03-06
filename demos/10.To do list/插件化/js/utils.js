function addEvent(el, type, fn){
  if(el.addEventListener){
    el.addEventListener(type, fn, false);
  }else if(el.attachEvent){
    el.attachEvent('on' + type, function(){
      fn.call(el);
    });
  }else{
    el['on' + type] = fn;
  }
}

// 找子元素
function elemChildren(node){
  var temp = {
    "length": 0,
    "splice": Array.prototype.splice
  },
      len = node.childNodes.length;
  
  for(var i = 0; i < len; i++){
    var childItem = node.childNodes[i];
    if(childItem.nodeType === 1){
      temp[temp.length] = childItem;
      temp.length++;
    }
  }
  return temp;

}

// 找n层父元素
function elemParent(node, n){
  var type = typeof(n);

  if(type === 'undefined'){
    return node.parentNode;
  }else if(type !== 'number' || n <= 0){
    return undefined;
  }

  while(n){
    node = node.parentNode;
    n--;
  }
  return node;
}