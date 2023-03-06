// 3.判断是否存在子元素
// 先查询childNodes,如果有再循环遍历，如果遇到nodeType === 1的，就返回true
Element.prototype.hasChildern = function(){
  var children = this.childNodes,
      len = children.len,
      item;
    for(var i = 0; i < len; i++){
      item = children[i];
      if(item.nodeType === 1){
        return true
      }
    }

    // 如果循环结束都没有返回true，说明没有
    return false
  }
  
