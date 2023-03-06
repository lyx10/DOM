// 循环绑定点击事件
// 点击图片是时移除所有图片的激活样式
// 再给当前点击的图片添加激活类
// 1.获取thumbItem 和sliderItem

// var thumbsItem = document.getElementsByClassName('thumbs-item'),
//     sliderItem = document.getElementsByClassName('slider-item');
//      // 循环thumbsItem给里面的每个元素绑定点击事件
// for(var i = 0; i < thumbsItem.length; i++){
//   // 由于使用到元素对应的下标，为了解决闭包的问题，需要立即执行
//   (function(k){
//     thumbsItem[k].onclick = function() {
//       // 先清除active类
//       for(var j = 0; j < thumbsItem.length; j++){
//         thumbsItem[j].className = 'thumbs-item';
//         sliderItem[j].className = 'slider-item';
//       }
//       this.className += ' cur';
//       sliderItem[k].className += ' active'; 
//     }
//   })(i);
// }

// 插件化
;(
  function(){
    function Slider(opt){
      this.thumbsItem = document.getElementsByClassName(opt.thumbsItem);
      this.sliderItem = document.getElementsByClassName(opt.sliderItem);
      this.thumbsClassName = opt.thumbsItem;
      this.sliderClassName = opt.sliderItem;
      this.callClick();
    }
    Slider.prototype = {
      callClick: function() {
        // 先保存this.thumbsItem和this.sliderItem
        var thumbsItem = this.thumbsItem,
            sliderItem = this.sliderItem,
            thumbsClassName = this.thumbsClassName,
            sliderClassName = this.sliderClassName;
        // 循环绑定点击事件
        for(var i = 0; i < thumbsItem.length; i++){
          (function(j){
            thumbsItem[j].onclick = function() {
              for(var k = 0; k < thumbsItem.length; k++){
                thumbsItem[k].className = thumbsClassName;
                sliderItem[k].className = sliderClassName;
              }
              this.className += ' cur';
              sliderItem[j].className += ' active';
            }
          })(i);
        }

      }
    }
    window.Slider = Slider;
  }
)();