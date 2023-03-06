// 求鼠标位置相对于块元素的坐标(鼠标相对于文档的坐标-元素的left/top)

// 用鼠标相对于文档的坐标 - 相对于块元素的坐标

// 将上面求得的值赋给元素的left 和top

// 模块化，不立即执行

// 1.拖曳函数 
// 2.点击跳转
// 3.拖曳时点击元素归位
// 4.限制边界
// 鼠标左中右键 e.button 0 1 2(mousedown/mouseup才触发右键和中键)
// 5.阻止右键菜单出现
// 6.右键显示自定义菜单，菜单显示的位置与边界问题
// 7.将单击跳转到百度改为双击跳转到百度
// 8.双击事件如何模拟？



// function init(){
//   dragNclick();
// }

// var dragNclick = (function(a, b){
//   console.log(a, b);
// });

Element.prototype.dragNclick = ( function(menu, elemClick){
  drag.call(this);
  // 拖拽函数
  function drag(){
    // console.log(elem);
    var _self = this,
        bTime = 0,
        eTime = 0,
        oPos = [],
        wWidth = getViewportSize().width,
        wHeight = getViewportSize().height,
        elemWidth = parseInt(getStyle(this, 'width')),
        elemHeight = parseInt(getStyle(this, 'height')),
        mWidth = parseInt(getStyle(menu, 'width')),
        mHeight = parseInt(getStyle(menu, 'height')),
        cbTime = 0,
        ceTime = 0,
        counter = 0,
        x,
        y;
    // 绑定鼠标按下处理函数，
    addEvent(this, 'mousedown', function(e){
      var e = e || window.event,
          btnCode = e.button;
      if(btnCode === 2){
        var mLeft = pagePos(e).x ,
            mTop = pagePos(e).y ;
        
        if(mLeft <= 0){
          mLeft = 0
        }else if(mLeft > (wWidth - mWidth)){
          mLeft = pagePos(e).x - mWidth;
        }

        if(mTop <= 0){
          mTop = 0;
        }else if(mTop > (wHeight - mHeight)){
          mTop = pagePos(e).y - mHeight;
        }
        menu.style.left = mLeft + 'px';
        menu.style.top = mTop+ 'px';
        menu.style.display = 'block';
      }else if(btnCode === 0){
        // 记录鼠标按下的时间戳
        bTime = new Date().getTime();
        // 记录鼠标点击时的位置
        oPos = [parseInt(getStyle(_self, 'left')), parseInt(getStyle(_self, 'top'))];
        // 隐藏菜单，以防右键调出菜单没收回去。
        menu.style.display = 'none';

        // 获取x,y,鼠标位置相对于块元素的坐标
        x = pagePos(e).x - parseInt(getStyle(_self, 'left'));
        y = pagePos(e).y - parseInt(getStyle(_self, 'top'));

        // 绑定鼠标移动事件处理函数
        addEvent(document, 'mousemove', mouseMove);
        // 绑定鼠标抬起事件处理函数
        addEvent(document, 'mouseup', mouseUp);
        // 阻止事件冒泡
        cancelBubble(e);
        // 阻止默认行为
        preventDefaultEvent(e);
      }    
      
    });

    // 右键出现自定义菜单
    addEvent(document, 'contextmenu', function(e){
      var e = e || window.event;
      preventDefaultEvent(e);
    });

    // 点击除菜单外的地方隐藏菜单
    addEvent(document, 'click', function(){
      menu.style.display = 'none';
    });

    // 点击菜单要阻止冒泡
    addEvent(menu, 'click', function(e){
      cancelBubble(e);
    });

    function mouseMove(e){
      var e = e || window.event,
          elemLeft = pagePos(e).x - x,
          elemTop = pagePos(e).y - y;
      //限制元素移动范围 
      if(elemLeft <= 0){
        elemLeft = 0;
      }else if(elemLeft >= (wWidth - elemWidth)){
        elemLeft = wWidth - elemWidth - 1;
      }

      if(elemTop < 0){
        elemTop = 0;
      }else if(elemTop >= (wHeight - elemHeight)){
        elemTop = wHeight - elemHeight - 1;
      }
      _self.style.left = elemLeft + 'px';
      _self.style.top = elemTop + 'px';

      // 阻止事件冒泡
      cancelBubble(e);
      // 阻止默认行为
      preventDefaultEvent(e);
    }

    function mouseUp(e){
      var e = e || window.event,
          t = null;
      // 记录鼠标抬起的时间戳
      eTime = new Date().getTime();
      // 解除绑定
      // 如果两个时间戳的差值小于150，就认为是点击事件，就跳转到百度
      if((eTime - bTime) < 150 ){
        _self.style.left = oPos[0] + 'px';
        _self.style.top = oPos[1] + 'px';
        
        counter++;
        if(counter === 1){
          cbTime = new Date().getTime();
          // console.log(cbTime);
        }
        if(counter === 2){
          ceTime = new Date().getTime();
          // console.log(ceTime);
        }
        
        if(cbTime && ceTime && (ceTime - cbTime < 250)){
          // console.log(ceTime - cbTime);
          elemClick();
        }

        // 清除记录双击事件的标记，解决只点击一次后续会出现的bug
        t = setTimeout(function(){
          cbTime = 0;
          ceTime = 0;
          counter = 0;
          clearTimeout(t);
        }, 500);
      }
      removeEvent(document, 'mousemove', mouseMove);
      removeEvent(document, 'mouseup', mouseUp);
    }
    

  }
 
});

// init();

