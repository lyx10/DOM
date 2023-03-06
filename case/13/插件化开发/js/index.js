;(function(){
  var Test = function(opt) {
    // 1.先将配置参数放在this上
    this.num1 = opt.num1;
    this.num2 = opt.num2;
    this.btnGroup = opt.btnGroup;
    this.result = opt.result;

  }

  Test.prototype = {
    init: function(){
      this.bindEvent();
    },
    bindEvent: function(){
      var btns = this.btnGroup,
          _self = this;
      addEvent(btns, 'click', function(e){
        _self.compute.call(_self, e);
      });
    },
    compute: function(e){
      var e = e || window.event,
          tar = e.target || e.srcElement,  
          // 保存2个input输入框的值以及按钮组
          val1 = Number(this.num1.value),
          val2 = Number(this.num2.value),
          sign;
          sign = tar.getAttribute('data-sign');
          switch(sign){
            case 'plus':
              this.result.innerText = (val1 + val2);
              
              break;
            case 'minus':
              this.result.innerText = (val1 - val2);
              break;
            case 'mul':
              this.result.innerText = (val1 * val2);
              break;
            case 'div':
              this.result.innerText = (val1 / val2);
              break;
            default:
              console.log('出错了');
          }
        
    }
  }

  function addEvent(el, type, fn){
    if(el.addEventListener){
      el.addEventListener(type, fn, false);
    }else if(el.attachEvent){
      el.attachEvent('on' + type, function(){
        fn.call(el);
      });
    }else{
      el['on' + type] = fn;
    }
  }

  window.Test = Test;
})();



// 1.插件3部曲：立即执行函数，构造函数和原型，抛出构造函数
// 2.使用插件，在另一个javascript块中new Test(),并执行Test构造函数prototype中的init方法。
// 这样创建与使用都有了，这个小项目就可以正常地边写边调试了。

