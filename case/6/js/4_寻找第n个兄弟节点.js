// 寻找第n个兄弟元素节点，n为正，找之后，n为父，找之前，为0，找自己
// 不考虑兼容性，用nextElementSibling和previousElementSibling()
Element.prototype.elemSibling = function() {
  var elem = this;
  // 先进while循环
  // 只要n不是0都为true
  while(n){
    if(n > 0){
      // 将elem.nextElementSibling交给elem,这样就能判断下一个
      elem = elem.nextElementSibling;
      n--;
    }else if(n < 0){
      elem = elem.previousElementSibling;
      n++;
    }
  }

  // 不用另外判断为0的情况，没进入循环就是为0，就等于它自己
  return elem;

}

// 要考虑兼容，就要用到nextSibling,这个会弄出其他节点，
// 所以要先遍历判断它的nodeType === 1,如果不等于1，就将elem交给下一位，找到了才算完成一个兄弟元素的查找

Element.prototype.elemSibling = function() {
  var elem = this;
  // 同样的，不管n是正还是负,先进循环
  while(n){
    // 要兵分两路了
    if(n > 0){
      // 不管是不是元素节点，先将兄弟节点交给elem
      elem = elem.nextSibling;
      // 用while循环找兄弟元素节点
      // 如果它有下一个兄弟节点，并且这个兄弟不是元素，就要继续找
      while(elem && elem.nodeType !== 1){
        elem = elem.nextSibling;
      }
      n--;
    }else if(n < 0){
      elem = elem.previousSibling;
      // 如果它有上一个兄弟节点，并且这个兄弟不是元素，就要继续找
      while(elem && elem.nodeType !== 1){
        elem = elem.previousSibling
      }
      n++
    }
  }
  return elem;
}
