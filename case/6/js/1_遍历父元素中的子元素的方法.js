// 在原型上编程，遍历任意一个父元素，找到对应的子元素节点，
// 有参数-> 某个对应的字节点，
// 有参数但参数不是number类型 -> undefined,没有参数->子元素节点的集合
Element.prototype.elemChildren = function(index){
  // 先将子节点保存下来
  var children = this.childNodes,
      len = children.length,
      temp = {
        "length": 0,
        "splice": Array.prototype.splice
      },
      item;
  
  // 开始循环
  for(var i = 0; i < len; i++){
    // 先缓存每次循环的项，这样可以节约性能
    item = childrn[i];
    if(item.nodeType === 1){
      temp[temp[length]] = item;
      temp[length]++;
    }
  }

  // 循环结束之后判断参数，如果有参数并且是number类型，就返回对应的子元素，
  // 如果参数不对，就返回undefined，如果没传参就返回子元素集合

if(index !== undefined && typeof(index) === 'number'){
    return temp[index];
}
return index === undefined ? temp: temp[index]
}