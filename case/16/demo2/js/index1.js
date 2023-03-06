window.onload = function(){
  init();
}

function init(){
  initMenu();
}

var initMenu = (function(){
  // 获取元素
  var oMenu = document.getElementsByClassName('menu-wrap')[0],
      oMainMenu = oMenu.getElementsByClassName('main-list')[0],
      oMenuItems = oMainMenu.getElementsByClassName('main-item'),
      menuLen = oMenuItems.length,
      oSubMenu = oMenu.getElementsByClassName('sub')[0],
      oSubItems = oSubMenu.getElementsByClassName('sub-item'),
      isInSub = false,
      isFrist = true,
      t = null,
      mousePos = [],
      menuItem;

  (function bindEvent(){
    for(var i = 0; i < menuLen; i++){
      menuItem = oMenuItems[i];
      addEvent(menuItem, 'mouseenter', mainMenuMouseEnter);
    }

    addEvent(oMainMenu, 'mouseenter', function(){
      addEvent(document, 'mousemove', mouseMove);
    });

    addEvent(oMainMenu, 'mouseleave', mainMenuMouseOut);

    addEvent(oMenu, 'mouseleave', mouseOut);

    addEvent(oSubMenu, 'mouseenter', function(){
      isInSub = true;
    });

    addEvent(oSubMenu, 'mouseleave', function(){
      isInSub = false;
    });

  })();

  function mainMenuMouseEnter(event){
    var e =event || window.event,
        tar = e.target || e.srcElement,
        curIdx = Array.prototype.indexOf.call(oMenuItems, tar),
        posLen = mousePos.length;
        curPos = mousePos[posLen - 1] || {x: 0, y: 0},
        lastPos = mousePos[posLen - 3] || {x: 0, y: 0},
        toDelay = doTimeout(curPos, lastPos);

        if(t){
          clearTimeout(t);
        }
        
        if(isFrist){
          addActive(curIdx);
          isFrist = false;
        }else{
          if(toDelay){
            t = setTimeout(function(){
              if(isInSub){
                return;
              }
              addActive(curIdx);
              clearTimeout(t);
            }, 300);
          }else{
            addActive(curIdx);
          }
        }

        
    
    // 考虑用户斜着进入子菜单
    // 要用setTimeout
    // 当鼠标移入子菜单，不应该再执行切换激活样式。（给子菜单添加移入和移出事件处理函数，控制isInSub）
    // 如果isInSub为true,就return，终止函数执行
    
    // 给oMainMenu绑定鼠标移入事件处理函数，并在函数中添加mousemove事件处理函数
    // 在mousemove事件处理函数中，收集鼠标经过的最后3个点的坐标。（通过判断mousePos的长度限制收集坐标的数量，如果大于3，就将最前面的删掉）
    // 当鼠标移出oMenu时，解除mousemove事件绑定

    // oMenuMouseEnter中定义两个变量curPos和lastPos
    // 写doTimeout函数，用来控制是否延时切换（获取主菜单的右上和右下顶点的坐标，传入两个参数curPos和lastPos，鼠标在菜单中移动的倒数第1个点和另外任意一个点，我选倒数第三个）
    // oMenuMouseEnter中定义变量toDelay,执行doTimeout函数
    // 利用utils中的函数判断点是否在三角形内来判断是否需要延迟。
    // 先判断是否是第一次进入菜单，如果是第一次进入菜单，就直接执行addActive,并将标记置为false
    // 如果不是第一次进入菜单，就根据toDelay来控制是否延迟，如果为true,延时函数里面再判断在不在子菜单内，不在就延时执行，再就终止函数
  }

  function addActive(index){
    removeAllActive();
    oSubMenu.className = 'sub';
    oMenuItems[index].className += ' active';
    oSubItems[index].className += ' active';
  }

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

  function mouseMove(event){
    var e = event || window.event;

    mousePos.push(pagePos(e));
    if(mousePos.length > 3){
      mousePos.shift();
    }
  }

  function doTimeout(curPos, lastPos){
    var TL = {
      x: getStyle(oMenu, 'margin-left') + getStyle(oMainMenu, 'width'),
      y: getStyle(oMenu, 'margin-top')
    },
        BL = {
          x: getStyle(oMenu, 'margin-left') + getStyle(oMainMenu, 'width'),
          y: getStyle(oMenu, 'margin-top') + getStyle(oMainMenu, 'height')
        };
    return pointInTriangle({
      curPos: curPos,
      lastPos: lastPos,
      topLeft: TL,
      bottomLeft: BL
    })
  }

  function mouseOut(){
    oSubMenu.className = 'sub hide';
    removeAllActive();
    
  }

  function mainMenuMouseOut(){
    removeEvent(document, 'mousemove', mouseMove);
  }
});