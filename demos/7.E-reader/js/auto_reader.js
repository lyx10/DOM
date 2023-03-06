// var oBtn = document.createElement('div'),
// oWrap = document.getElementsByClassName('wrap')[0],
// flag = true,
// t = null;
// oBtn.className = 'btn';
// oBtn.innerHTML = '开始阅读';
// oWrap.appendChild(oBtn);

// oBtn.onclick = function(){
//   var speed = 2,
//       _this = this;
//     if(flag){
//       console.log(flag);
//       flag = !flag;
//       _this.style.backgroundColor = 'rgb(237, 203, 116)'
//       _this.innerHTML = '停止阅读';
//       clearInterval(t);
//       t = setInterval(function(){
//         window.scrollBy(0, speed);
//       }, 50);
//     }else{
//       console.log(flag);
//       flag = !flag;
//       clearInterval(t);
//       _this.innerHTML = '开始阅读';
//       _this.style.backgroundColor = 'rgb(116, 207, 237)';
//     }


//   }

;(function(){
        // 获取窗口高度
    var wHeight = getViewportSize().height,
        // 获取文档高度
        sHeight = getScrollSize().height,
        playing = false,
        t = null;

    

    function AutoReader(opt){
      var _self = this;
      this.playBtn = opt.playBtn;
      addEvent(this.playBtn, 'click', function(){
        _self.setAutoPlay.call(_self.playBtn);
      })
    }

    AutoReader.prototype = {
      setAutoPlay: function(){
            // 获取滚动条纵轴的距离
        var sTop = getScrollOffset.top,
            _self = this;
        if(sHeight <= (wHeight + sTop)){
          return;
        }

        // 自动播放
        if(!playing){
          t = setInterval(function(){
            // 要不断更新滚动距离
            var sTop = getScrollOffset().top;
            
            if(sHeight <= (wHeight + sTop)){
              // 滚动到底部，清除定时器
              clearInterval(t);

              // 按钮样式还原
              // 定时器内回调函数的this指向window，所以在外面要用变量_self保存this
              _self.style.backgroundImage = 'url(images/play.png)';
              playing = false;
              return;

            }else{
              window.scrollBy(0, 1);
              _self.style.backgroundImage = 'url(images/pause.png)';
            }
          },1);
          playing = true;
        }else {
          // 暂停
          clearInterval(t);
          _self.style.backgroundImage = 'url(images/play.png)';
          playing = false;
        }
      }
    }

    window.AutoReader = AutoReader;
})()



