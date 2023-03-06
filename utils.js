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
    item = children[i];
    if(item.nodeType === 1){
      temp[temp['length']] = item;
      temp['length']++;
    }
  }

  // 循环结束之后判断参数，如果有参数并且是number类型，就返回对应的子元素，
  // 如果参数不对，就返回undefined，如果没传参就返回子元素集合

if(index !== undefined && typeof(index) === 'number'){
    return temp[index];
}
return index === undefined ? temp: temp[index]
}


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


// 4.寻找第n个兄弟元素节点，n为正，找之后，n为父，找之前，为0，找自己
// 要考虑兼容，就要用到nextSibling,这个会弄出其他节点，
// 所以要先遍历判断它的nodeType === 1,如果不等于1，就将elem交给下一位，找到了才算完成一个兄弟元素的查找

Element.prototype.elemSibling = function() {
  var elem = this;
  // 不管n是正还是负,先进循环
  while(n){
    // 再判断n的正负
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

// 5.遍历一个元素下的所有子元素
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

// 6.封装insertAfter方法
Element.prototype.insertAfter = function(tar, origin){
  var elem = origin.nextElementSiBling;

  // 如果要插入的元素后面有兄弟元素，就找到这个兄弟元素，用insertBefore()插在这个兄弟之前，
  if(elem){
    this.insertBefore(tar, elem);
  }else{
    // 如果没有，就用appendChild()
    this.appendChild(tar);
  }
}

// 7.子元素逆序
Element.prototype.elemReverse = function(){
  var children = this.childNodes,
      len = children.length,
      item;
  while(len--){
    item = children[len];
    // 从最后一个开始，将节点一个一个剪切、粘贴到最后面
    this.appendChild(item);
  }
}

// 8.数字时钟
Date.prototype.clock = function(){
  var year = this.getFullYear(),
      month = this.getMonth() + 1,
      date = this.getDate(),
      hours = this.getHours(),
      minutes = this.getMinutes(),
      seconds = this.getSeconds();
  return (year + '-' + setZero(month) + '-' + setZero(date) + ' ' + setZero(hours) + ':' + setZero(minutes) + ':' + setZero(seconds))
  
  function setZero(value){
      return value < 10 ? ('0' + value) :value ;
  }
}

// 9. 倒计时
Date.prototype.countDown = function(endTime,timer){
  var end = new Date(endTime).getTime(),
      current = this.getTime(),
      leftTime = (end - current) / 1000;
      if(leftTime >= 0){
        var day = Math.floor(leftTime / 60 / 60 / 24),
            hours = Math.floor(leftTime / 60 / 60 % 24),
            minutes = Math.floor(leftTime / 60 % 60),
            seconds = Math.floor(leftTime % 60);
      
        return (day + '天' + setZero(hours) + '小时' + setZero(minutes) + '分' + setZero(seconds) + '秒');
  
      }else{
        clearInterval(timer);
        return '0天00小时00分00秒'
      }

  function setZero(value){
    return (value < 10 ? '0' + value : value);
  }
}

// 查看滚动距离
function getScrollOffset(){
  if(window.pageXOffset){
    return {
      letf: window.pageXOffset,
      top: window.pageYOffset
    }
  }else{
    return {
      letf: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}

// 浏览器的可视区域(窗口宽高)

function getViewportSize(){
  // window.innerWidth存在，就没有解析模式问题
  if(window.innerWidth){
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }else{
    // 如果window.innerWidth不存在，就要考虑解析模式问题
    if(document.compatMode === 'BackCompat'){
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
    }else{
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    }
    }
  }
}


// 文档可视区域

function getDocScrollSize(){
  if(document.body.scrollWidth){
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  }else{
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}


// 求元素左上角距离文档内边距的距离
function getElemDocPosition(el) {
  var parent = el.offsetParent,
      offsetLeft = el.offsetLeft,
      offsetTop = el.offsetTop;
  
  while(parent){
    offsetLeft += parent.offsetLeft;
    offsetTop += parent.offsetTop;
    parent = parent.offsetParent;
  }

  return {
    left: offsetLeft,
    top: offsetTop
  }

}


// 获取元素样式属性值

function getStyles(el, prop){
  if(window.getComputedStyle){
    if(prop){
      return window.getComputedStyle(el, null)[prop];
    }else{
      return window.getComputedStyle(el, null);
    }
  }else{
    if(prop){
      return el.currentStyle[prop];
    }else{
      return el.currentStyle;
    }
  }
}

//绑定事件处理函数
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

// 解除绑定
function removeEvent(el, type, fn){
  if(el.addEventListener){
    el.removeEventListener(type, fn, false);
  }else if(el.attachEvent){
    el.dettachEvent('on' + type, function(){
      fn.call(el);
    });
  }else{
    el['on' + type] = null;
  }
} 

// 取消冒泡事件
function cancelBubble(e){
  var e = e || window.event;
  if(e.stopPropagation){
    e.stopPropagation();
  }else{
    e.cancelBubble = true;
  }
}

// 获取鼠标位置相对于文档的距离（包含滚动距离）
function pagePos(el){
  var sLeft = getScrollOffset().letf,
      sTop = getScrollOffset().top,
      cLeft = document.documentElement.clientLeft || 0,
      cTop = document.documentElement.clientTop || 0;

  return {
    x: e.clientX + sLeft - cLeft,
    y: e.clientY + sTop - cTop
  }
}