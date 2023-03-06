window.onload = function(){
  init();
}

function init(){
  initMrg();
}

var initMrg = (function(){
  var oImgWrap = document.getElementsByClassName('wrap')[0],
      oMagWrap = oImgWrap.getElementsByClassName('mag-wrap')[0],
      oMagImg = oMagWrap.getElementsByClassName('mag-img')[0],
      magW = parseInt(getStyle(oMagWrap, 'width')) ,
      magH = parseInt(getStyle(oMagWrap, 'height')),
      imgX = oImgWrap.offsetLeft,
      imgY = oImgWrap.offsetTop;
      
  addEvent(oImgWrap, 'mouseenter', function(){
    oMagWrap.className += ' show';
    addEvent(document, 'mousemove', mouseMove);
  });

  addEvent(oImgWrap, 'mouseleave', mouseOut);
      
  function mouseMove(e){
    showMag(getXY(e).x, getXY(e).y, getXY(e).mouseX, getXY(e).mouseY);

  }

  function mouseOut(e){
    oMagWrap.className = 'mag-wrap';
    removeEvent(document, 'mousemove', mouseMove);
  }

  function showMag(x, y, mouseX, mouseY){
    oMagWrap.style.left = x + 'px';
    oMagWrap.style.top = y + 'px';
    oMagImg.style.left = -x + 'px';
    oMagImg.style.top = -y + 'px';

    // 判断边界，如果鼠标在盒子外，就隐藏放大镜
    if(mouseX && mouseY){
      if(mouseX <= 0 || mouseX > parseInt(getStyle(oImgWrap, 'width')) || 
      mouseY <= 0 || mouseY > parseInt(getStyle(oImgWrap, 'height'))){
        oMagWrap.className = 'mag-wrap';
      }
    }
  }

  function getXY(e){
    var e = e || window.event;
    return {
      x: pagePos(e).x - imgX - (magW / 2),
      y: pagePos(e).y - imgY - (magH / 2),
      mouseX: pagePos(e).x - imgX,
      mouseY: pagePos(e).y - imgY
    }
  }
});