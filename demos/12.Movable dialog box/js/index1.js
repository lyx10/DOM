// function init(){
//   eleDrag();
// }

var eleDrag = (function(opt){
  drag();
  function drag(){
    var closeBtn = opt.closeBtn,
        oHead = opt.oHead,
        oModal = opt.oModal,
        wWidth = getViewportSize().width,
        wHeight = getViewportSize().height,
        elWidth = parseInt(getStyle(oModal, 'width')),
        elHeight = parseInt(getStyle(oModal, 'height')),
        x,
        y;
    (function bindEvent(){
      addEvent(closeBtn, 'click', closeModal);

      addEvent(oHead, 'mousedown', function(e){
        var e = e || window.event;
        x = pagePos().x - parseInt(getStyle(oModal, 'left'));
        y = pagePos().y - parseInt(getStyle(oModal, 'top'));

        addEvent(document, 'mousemove', mouseMove);

        addEvent(document, 'mouseup', mouseUp);

        cancelBubble(e);
        preventDefaultEvent(e);

      })
    }());


    // 关闭页面
    function closeModal(){
      oModal.style.display = 'none';
    }

    // 鼠标移动
    function mouseMove(e){
      var e = e || window.event;
          eleLeft = pagePos().x - x ,
          eleTop = pagePos().y - y ;

      if(eleLeft <= 0){
        eleLeft = 0;
      }else if(eleLeft >= (wWidth - elWidth)){
        eleLeft = wWidth - elWidth;
      }

      if(eleTop <= 0){
        eleTop = 0;
      }else if(eleTop >= (wHeight - elHeight)){
        eleTop = wHeight - elHeight;
      }

      oModal.style.left = eleLeft + 'px';
      oModal.style.top = eleTop + 'px';

      cancelBubble(e);
      preventDefaultEvent(e);
    }

    // 鼠标抬起
    function mouseUp(){
      removeEvent(document, 'mousemove', mouseMove);
      removeEvent(document, 'mouseup', mouseUp);
    }
  
  }
});

// init();