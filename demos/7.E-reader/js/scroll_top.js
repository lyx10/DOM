// (function(){
//   var sTopBtn = document.getElementsByClassName('s-top-btn')[0],
//       oHd = document.getElementsByClassName('list-hd')[0];
  
//   // 滚动条在顶部时小火箭隐藏，有滚动距离显示
//   addEvent(window, 'scroll', function(){
//     // 获取滚动条的距离
//     var sTop = getScrollOffset().top;
//     sTopBtn.style.display = sTop ? 'block' : 'none';
//   });

//   // 点击小火箭回到顶部
//   addEvent(sTopBtn, 'click', function(){
//     window.scrollTo(0, 0);
//   });
  
//   // 点击列表头部回到顶部
//   addEvent(oHd, 'click', function(){
//     window.scrollTo(0, 0);
//     });
// })();

;(function(){
  function Scroll(opt){
    var _self = this;
    this.sTopBtn = opt.sTopBtn;

    // 滚动条在顶部时小火箭隐藏，有滚动距离显示
    addEvent(window, 'scroll', function(){
      // 在处理函数内部，事件绑定在谁身上，this就指向谁。
      // 但是，现在是要调用构造函数prototype上的方法，要先找到构造函数的this，所以要先在最外面用变量保存构造函数的this。
      //  _self.sTopBtnShow 表示调用构造函数prototype上的方法sTopBtnShow。
      // 由于prototype上的方法也在找构造函数的this，所以还需要用call调用，将构造函数的this传进去。
      _self.sTopBtnShow.call(_self);
    })

    addEvent(this.sTopBtn, 'click',function(){
      window.scrollTo(0, 0);
    })
  }

  Scroll.prototype = {
    sTopBtnShow: function(){
      var sTop = getScrollOffset().top,
          sTopBtn = this.sTopBtn;
      sTopBtn.style.display = sTop ? 'block' : 'none';
    },

  }

  window.Scroll = Scroll;
})()