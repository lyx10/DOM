window.onload = function(){
  init();
}

function init(){
  initMenu();
}

var initMenu = (function(){
  // 获取元素wrap,main,main-item, sub, sub-item
  var oWrap = document.getElementsByClassName('wrap')[0],
      oMainMenu = oWrap.getElementsByClassName('main')[0],
      oMainItems = oMainMenu.getElementsByClassName('main-item'),
      menuLen = oMainItems.length,
      oSub = oWrap.getElementsByClassName('sub')[0],
      oSubItem = oSub.getElementsByClassName('sub-item'),
      isInSub = false,
      isFirst = true,
      t = null,
      mousePos = [],
      menuItem;

  // 绑定事件处理函数相关
  (function bindEvent(){
    for(var i = 0; i < menuLen; i++){
      menuItem = oMainItems[i];
      addEvent(menuItem, 'mouseenter', mainMenuMouseenter);
    }

    addEvent(oWrap, 'mouseleave', mouseOut);

    addEvent(oSub, 'mouseenter', function(){
      isInSub = true;
    });

    addEvent(oSub, 'mouseleave', function(){
      isInSub = false;
    });

    addEvent(oMainMenu, 'mouseenter', function(){
      addEvent(document, 'mousemove', mouseMove);
    });

    addEvent(oMainMenu, 'mouseleave', mainMenuMouseOut)

  })();

  function mainMenuMouseenter(ev){
    // 先获取鼠标所在
    var e = ev || window.event,
        tar = e.target || e.srcElement,
        tarEle = getTargetElem(tar, 'li'),
        posLen = mousePos.length,
        curPos = mousePos[posLen - 1] || {x: 0, y: 0},
        lastPos = mousePos[posLen - 3] || {x: 0, y: 0},
        toDelay = doTimeout(curPos, lastPos),
        thisIdx = [].indexOf.call(oMainItems, tarEle),
        timer = null;

    oSub.className = 'sub';

    if(t){
      clearTimeout(t);
    }

    // console.log(toDelay, curPos);
    if(isFirst){
      addActive(thisIdx);
      isFirst = false;
    }else{
      if(toDelay){
        t = setTimeout(function(){
          if(isInSub){
            return;
          }else{
            addActive(thisIdx);
            clearTimeout(t);
          }
        }, 300);
      }else{
        timer = setTimeout(function(){
          addActive(thisIdx);
          clearTimeout(timer);
        }, 50)
        
      }
    }
  }

  function addActive(index){
    removeAllActive();
    oMainItems[index].className += ' active';
    oSubItem[index].className += ' active';
  }

  function removeAllActive(){
    var mItem,
        sItem;
    for(var i = 0; i < menuLen; i++){
      mItem = oMainItems[i];
      sItem = oSubItem[i];
      mItem.className = 'main-item';
      sItem.className = 'sub-item';
    }
  }

  function mouseOut(){
    oSub.className += ' hide';
    removeAllActive();
  }

  function mainMenuMouseOut(ev){
    removeEvent(document, 'mousemove', mouseMove);
  }

  function mouseMove(ev){
    var e = ev || window.event;
    mousePos.push(pagePos(e));
    if(mousePos.length > 3){
      mousePos.shift();
    }

    // console.log(mousePos);
  }

  function doTimeout(curPos, lastPos){
    var TL = {
      x: getStyle(oWrap, 'margin-left') + getStyle(oWrap, 'width'),
      y: getStyle(oWrap, 'margin-top')
    },
        BL = {
          x: getStyle(oWrap, 'margin-left') + getStyle(oWrap, 'width'),
          y: getStyle(oWrap, 'margin-top') + getStyle(oWrap, 'height')
        };

   return pointInTriangle({
    curPos: curPos,
    lastPos: lastPos,
    topLeft: TL,
    bottomLeft: BL
    })
  }
});