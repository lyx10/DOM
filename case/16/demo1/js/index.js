window.onload = function(){
  init();
}

function init(){
  initMenu();
}

var initMenu = (function(){
  /**
   * 获取main-list
   * 获取main-item
   * 获取main-item.length
   * 获取sub
   * 获取sub-item
   */
  var oMenu = document.getElementsByClassName('menu-wrap')[0],
      oMenuItems = oMenu.getElementsByClassName('main-item'),
      menuLen = oMenuItems.length,
      oSub = oMenu.getElementsByClassName('sub')[0],
      oSubItems = oSub.getElementsByClassName('sub-item'),
      menuItem,
      isInSub = false,
      isFirst = true,
      t = null,
      mousePoses = [];

  bindEvent();

  function bindEvent(){
    // 1. 给每个menu-item绑定mouseenter事件处理函数
    for(var i = 0; i < menuLen; i++){
      menuItem = oMenuItems[i];
      addEvent(menuItem, 'mouseenter', menuItemMouseEnter);
    }
  
    addEvent(oSub, 'mouseenter', function(){
      isInSub = true;
    });
  
    addEvent(oSub, 'mouseleave', function(){
      isInSub = false;
    });
  
    addEvent(oMenu, 'mouseenter', function(){
      addEvent(document, 'mousemove', mouseMove);
    });
  
    // 给oMenu绑定鼠标离开事件处理函数
    addEvent(oMenu, 'mouseleave', menuMouseOut);
  }


  // 2. 鼠标移入menu-item的事件处理函数
  function menuItemMouseEnter(e){
    /**
     * 1.找menu-item的索引
     * 2.设置单独的激活样式（先全部移除，再单独添加，添加激活样式可以封装成一个函数，全部移除也可以封装成一个函数）
     */
    var e = e || window.event,
        tar = e.target || e.srcElement,
        thisIdx = Array.prototype.indexOf.call(oMenuItems, tar),
        posesLen = mousePoses.length,
        curPos = mousePoses[posesLen - 1] || {x: 0, y: 0},
        lastPos = mousePoses[posesLen - 3] || {x: 0, y: 0},
        toDelay = doTimeout(curPos, lastPos);
    
    // console.log(toDelay);   
    oSub.className = 'sub';
        
    if(t){
      clearTimeout(t);
    }

    if(isFirst){
      addActive(thisIdx);
      isFirst = false;  
    }else{
      if(toDelay){
        t = setTimeout(function(){
          if(isInSub){
            return;
          }
          addActive(thisIdx);
          clearTimeout(t);
        }, 300); 
      }else{
        addActive(thisIdx);
      }
    }

  }
  // 3.
  function addActive(index){
    removeAllActive();

    oMenuItems[index].className += ' active';
    oSubItems[index].className += ' active';
  }

  // 4.
  function removeAllActive(){
    var mItem,
        sItem;

    for(var i = 0; i < menuLen; i++){
      mItem = oMenuItems[i];
      sItem = oSubItems[i];
              
      mItem.className = 'main-item'; 
      sItem.className = 'sub-item';
    }
  }

  function mouseMove(e){
    var e = e || window.event;
    
    mousePoses.push(pagePos(e));
    if(mousePoses.length >= 4){
      mousePoses.shift();
    }
  }

  // 鼠标离开oMenu的事件处理函数
  function menuMouseOut(){
    /**
     * 隐藏sub
     * 清除定时器，防止鼠标移出菜单还继续给menu-item设置激活样式
     * 清除全部激活样式
     * 解除mousemove事件绑定
     */
    oSub.className += ' hide';
    clearTimeout(t);
    removeAllActive();
    removeEvent(document, 'mousemove', mouseMove);
  }

  function doTimeout(curPos, lastPos){
    // 主菜单右上顶点
    // x:margin-left + 菜单宽度
    // y:margin-top 

    var TL = {
          x: parseInt(getStyle(oMenu, 'margin-left')) + parseInt(getStyle(oMenu, 'width')),
          y: parseInt(getStyle(oMenu, 'margin-top'))
    },
        // 主菜单右上顶点
        BL = {
          x: parseInt(getStyle(oMenu, 'margin-left')) + parseInt(getStyle(oMenu, 'width')),
          y: parseInt(getStyle(oMenu, 'margin-top')) + parseInt(getStyle(oMenu, 'height'))
        }
    return pointInTriangle({
      curPos: curPos,
      lastPos: lastPos,
      topLeft: TL,
      bottomLeft: BL
    })
  }
});

