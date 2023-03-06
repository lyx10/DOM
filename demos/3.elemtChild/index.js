// 原型上编程，遍历任意一个父元素，找到对应的子元素节点，有数字参数，
// return某个对应的子节点，超出范围，returnundefined，没有数字，return子元素节点的集合

Element.prototype.elemtChild1 = function(number){
  j_children = this.childNodes;
  if(arguments[0] === undefined){
    return loop(1, j_children);
  }else if(0 < number < 11){
    num = parseInt(number, 10);
    return loop(num, j_children);
    
  }else{
    return undefined
  }
  function loop(num, nodes){
    var arr = [];
    for(var i = 0; i < nodes.length; i++){
      var childItem = nodes[i];
      if(childItem.nodeType === num){
        arr.push(childItem);
      }
    }
    return  arr
  }
};

// 伪数组写法
Element.prototype.elemtChild2 = function(number){
  var arg1 = arguments[0],
      j_children = this.childNodes;

  if(arg1 === undefined){
    return loop(1, j_children);
  }else if(0 < number < 11){
    num = parseInt(number, 10);
    return loop(num, j_children);
  }else{
    return undefined
  }

  function loop(num, nodes) {
    function Children() {}
    Children.prototype = {
      "push": Array.prototype.push,
      "splice": Array.prototype.splice
    }

    var temp = new Children;
    temp["length"] = 0;
    for(var i = 0; i < nodes.length; i++){
      var childItem = nodes[i];
      if(childItem.nodeType === num){
        // temp["length"] -> temp.length ->0(最开始)
        temp[temp["length"]] = childItem;
        // 或
        // temp.push(childItem)
        // 每次添加了新属性要跟着增加length，如果前面用的是push方法往对象里添加新属性，就不用手动temp["length"]++;
        temp["length"]++;
      }
    }
    return  temp
  }
}

// 在原型上编程，找出一个元素的第n层父级元素
Element.prototype.elemtAncestors = function(number) {
  var n = arguments[0] || 1,
  _this = this;
  while(n){
    if(_this.parentNode === document && n > 1){
      return null
    }else{
      _this = _this.parentNode;
      n--
      return _this
    }
  }
}