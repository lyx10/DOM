/**
 * 盒子可移动
 * 双击盒子显示对话窗，窗口可关闭
 * 右键盒子出现菜单栏
 **/

var myWindow = (function(opt){
  var oList = opt.oList,
      oWin = opt.oWin,
      oWinHd = elemChildren(oWin, 0),
      oClose = oWin.getElementsByClassName('close')[0],
      oMenu = opt.oMenu,
      x,
      y,
      bTime = 0,
      eTime = 0,
      cbTime = 0,
      ceTime = 0,
      counter = 0,
      tarEle = null,
      elem = null,
      maxLeft,
      maxTop;
  function init(){
    bindEvent();
  }
  function bindEvent(){
    // 鼠标按下
    addEvent(oList, 'mousedown', function(e){
      var e = e || window.event,
          tar = e.target || e.srcElement,
          btnCode = e.button,
          wWidth = getViewportSize().width,
          wHeight = getViewportSize().height,
          eleWidth = parseInt(getStyle(tar, 'width')),
          eleHeight = parseInt(getStyle(tar, 'height'));

      tarEle = tar;
      elem = elemParent(tar, 1);
      bTime = new Date().getTime();
      // 鼠标位置相对于盒子的坐标
      x = pagePos().x - parseInt(getStyle(elem, 'left'));
      y = pagePos().y - parseInt(getStyle(elem, 'top'));
      
      // 左键
      if(btnCode === 0){
        close(oMenu);
        maxLeft = wWidth - eleWidth;
        maxTop = wHeight - eleHeight;

        // 鼠标移动
        addEvent(document, 'mousemove', eleMove);

        // 鼠标抬起
        addEvent(tar, 'mouseup', mouseUp);
        // addEvent(tar, 'mouseup', function handleMouseUp(){
        //   mouseUp();
        // });
        
        // 右键
      }else if(btnCode === 2){
            // 菜单的宽高
        var mWidth = parseInt(getStyle(oMenu, 'width')),
            mHeight = parseInt(getStyle(oMenu, 'height')),
            mLeft =  pagePos().x ,
            mTop = pagePos().y ;

        if(mLeft <= 0){
          mLeft = 0;
        }else if(mLeft >= (wWidth - mWidth)){
          mLeft = (pagePos().x - mWidth);
        }

        if(mTop <= 0){
          mTop = 0;
        }else if(mTop >= (wHeight - mHeight)){
          mTop = (pagePos().y - mHeight);
        }

        oMenu.style.left = mLeft + 'px';
        oMenu.style.top = mTop + 'px';
        oMenu.style.display = 'block';
      }

      cancelBubble(e);
      preventDefaultEvent(e);
    });

    // 关闭窗口
    addEvent(oClose, 'click', function(e){
      close(oWin);
      cancelBubble(e);
      preventDefaultEvent(e);
    });

    // 阻止右键默认事件
    addEvent(document, 'contextmenu', function(e){
      preventDefaultEvent(e);
    });

    // 隐藏菜单
    addEvent(document, 'click', function(){
      close(oMenu);
    });

    // 点击菜单时要阻止冒泡
    addEvent(oMenu, 'click', function(e){
      cancelBubble(e);
    });

    // 对话框头部鼠标按下
    addEvent(oWinHd, 'mousedown', function(e){
      var e = e || window.event;

      x = pagePos().x - parseInt(getStyle(oWin, 'left'));
      y = pagePos().y - parseInt(getStyle(oWin, 'top'));

      addEvent(document, 'mousemove', oWinMove);
      addEvent(document, 'mouseup', oWinUp);

      cancelBubble(e);
      preventDefaultEvent(e);
    });

  };

  init();

  // 鼠标移动
  function mouseMove(e, el){
    var e = e || window.event,
        // tar = e.target || e.srcElement,
        eleLeft = pagePos().x - x,
        eleTop = pagePos().y - y;
    
    //  限制盒子左右的活动范围
    if(eleLeft <= 0){
      eleLeft = 0;
    }else if(eleLeft >= maxLeft){
      eleLeft = maxLeft;
    }

    //  限制盒子上下的活动范围
    if(eleTop <= 0){
      eleTop = 0;
    }else if(eleTop >= maxTop){
      eleTop = maxTop;
    }
    el.style.left = eleLeft + 'px';
    el.style.top = eleTop + 'px';

    cancelBubble(e);
    preventDefaultEvent(e);
  }

  function eleMove(e){
    mouseMove(e, elem);
  }

  function oWinMove(e){
    mouseMove(e, oWin);
  }
  // 鼠标抬起
  function mouseUp(e){
    var e = e || window.event,
        t = null;
    // 记录鼠标抬起时间
    eTime = new Date().getTime();

    // 如果鼠标按下和抬起之间的时间间隔小于200,就是点击
    if(eTime - bTime < 200){
      counter++;
    
      // 第一次点击
      if(counter === 1){
        cbTime = new Date().getTime();
      }

      // 第二次点击
      if(counter === 2){
        ceTime = new Date().getTime();
      }

      // 双击
      if(cbTime && ceTime && (ceTime - cbTime) < 250){
        oWin.style.display = 'block';
      }

      // 定时清除标记
      t = setTimeout(function(){
        cbTime = 0;
        ceTime = 0;
        counter = 0;
        clearTimeout(t);
      }, 500);

    }
    cancelBubble(e);
    preventDefaultEvent(e);

    removeEvent(document, 'mousemove', eleMove);
    removeEvent(tarEle, 'mouseup', mouseUp);
  }

  function oWinUp(e){
    console.log('mouseup');
    var e = e || window.event;
    removeEvent(document, 'mousemove', oWinMove);
    removeEvent(document, 'mousemove', oWinUp);
  }

  // 隐藏元素
  function close(node){
    node.style.display = 'none';
  }

});
