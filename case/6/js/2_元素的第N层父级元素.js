// 2.遍历一个元素的第N层父级元素，如果未传参，则返回该元素的第一层父级
// 先判断定义一个变量，接收这个元素的父级，然后判断这个元素有没有父级，
// 如果有就循环，每执行一次就将变量的父级交给这个变量，然后n--,
// 进到循环体还要判断一下这个变量的nodeName是不是HTML，如果是就要终止循环，return null
Element.prototype.elemParent = function(n){
  var parent = this.parentNode;
  if(parent){
    while(n && typeof(n) === 'number'){
      if(parent.nodeName === 'HTML'){
        return null;
      }
      parent = parent.parentNode;
      n--
    }
    return parent
  }else{
    return null
  }
}