;(function(doc){
/**
 *  获取oList(ul)
 *  获取items
 *  init函数
 *  bindEvent函数
 *  给oList绑定mouseover事件处理函数
 *  写事件处理函数slide 1.获取目标元素
 *  写一个函数，通过tar找到目标元素
 **/

var oList = doc.getElementsByClassName('list')[0],
    oItems = doc.getElementsByClassName('list-item'),
    curIndex = 0;

function init(){
  bindEvent();
}

function bindEvent(){
  // 鼠标移入
  // addEvent(oList, 'mouseover', silde);
  addEvent(oList, 'mouseover', function(){
    addEvent(document, 'mousemove', silde);
  });

  
  // 鼠标移出
  // addEvent(oList, 'mouseout', silde);

  addEvent(oList, 'mouseout', function(){
    removeEvent(document, 'mousemove', silde);
  });
}

init();

function silde(e){
  var e = e || window.event,
      tar = e.target || e.srcElement,
      oParent = getParent(tar, 'li'),
      thisIdx = Array.prototype.indexOf.call(oItems, oParent);

  if(thisIdx !== curIndex){
    oItems[curIndex].className = 'list-item';
    curIndex = thisIdx;
    oItems[curIndex].className += ' active';
  }
}

function getParent(target, elemTag){
  while(target.tagName.toLowerCase() !== elemTag){
    target = target.parentNode;
  }
  return target;
}
})(document);