// 1.在原型上编程，判断元素有没有子元素节点

Element.prototype.hasChildElemt = function() {
    var child = this.childNodes,
        len = child.length,
        item;
    for(var i = 0; i < len; i++){
      item = child[i]
      if(item.nodeType === 1){
        return true
      }
    }
    return false
  }
  


// 2.在原型上编程，寻找兄弟元素节点，参数n,为正，找之后的第n个，参数n为负，找之前的第n个，参数n为0，找自己
Element.prototype.elementSlibling = function(n) {
  var slibing = this;
  while(n){
    if(n > 0){
      slibing = slibing.nextElementSibling;
      n--;
    }else if(n < 0){
      slibing = slibing.previousElementSibling;
      n++;
    }
  }
  return slibing;
}

Element.prototype.elemSlibling = function() {
  var elem = this;
  while(n){
    if(n > 0){
      // 
      // for(elem = elem.nextSibling; elem && elem.nodeType !== 1; elem = elem.nextSibling);
      elem = elem.nextSibling;
      while(elem && elem.nodeType !== 1){
        elem = elem.nextSibling;
      }
      n--
    }else if(n < 0){
      elem = elem.previousSibling;
      while(elem && elem.nodeType !== 1){
        elem = elem.previousSibling;
      }
      n++;
    } 
  }
  return elem;
}