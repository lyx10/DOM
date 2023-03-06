// (function(){
//   function Swiper(){}
//   Swiper.prototype.loop = function(){

//   }
// })();
function getComputedStyles(el,prop){
  if(window.getComputedStyle){
    if(prop){
     return window.getComputedStyle(el,null)[prop];
    }else{
     return window.getComputedStyle(el,null);
    }
  }else{
    if(prop){
      return el.currentStyle[prop];
    }else{
      return el.currentStyle;
    }
  }
}

var oWrap = document.getElementsByClassName('wrap')[0],
    oList = document.getElementsByClassName('list')[0],
    oItem = document.getElementsByClassName('item')[0],
    oLeft =  document.getElementsByClassName('left')[0],
    oRight =  document.getElementsByClassName('right')[0],
    itemWidth = parseInt(getComputedStyles(oItem,'width')),
    listLeft = parseInt(getComputedStyles(oList,'left')),
    end = -(itemWidth * 6),
    timer = null;

timer = setInterval(function(){
  listLeft -= itemWidth;
  console.log(listLeft);
  oList.style.left = listLeft + 'px';
  console.log(end)
  if(listLeft <= end){
    // console.log(1);
    // clearInterval(timer);
    // oList.appendChild(oItem);
    listLeft = 0;
    oList.style.left = listLeft + 'px';
  }
},1000);

oWrap.onmouseenter = function(){
  clearInterval(timer);
}

oWrap.onmouseleave = function(){
  listLeft = parseInt(getComputedStyles(oList,'left'));
  // if(listLeft > end){
    timer = setInterval(function(){
      listLeft -= itemWidth;
      oList.style.left = listLeft + 'px';
      if(listLeft <= end){
        // clearInterval(timer);
        listLeft = 0;
        oList.style.left = '0px';
      }
    },1000);
  // }
}

oLeft.onclick = function(){
  console.log('left');
  if(listLeft > end){
    listLeft -= itemWidth;
    oList.style.left = listLeft + 'px';
  }else{
    listLeft = -itemWidth;
    oList.style.left = listLeft + 'px';
  }
}

oRight.onclick = function(){
  console.log('right')
  if(listLeft < 0){
    listLeft += itemWidth;
    oList.style.left = listLeft + 'px';
  }else{
    listLeft = end + itemWidth;
    oList.style.left = listLeft + 'px';
  }
}

