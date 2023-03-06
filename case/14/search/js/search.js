window.onload = function(){
  init();
}

function init(){
  keySearch();
  // keySearch;
}
var keySearch = (function(){
/**
 * 获取J_auto_kw元素
 * 获取J_search_kw元素
 * 获取J_recom_kw文本
 **/
  var autoKw = document.getElementById('J_auto_kw'),
      searchKw = document.getElementById('J_search_kw'),
      recomKw = JSON.parse(document.getElementById('J_recom_kw').innerText),
      kwOrder = 0,
      t = null;

  (function bindEvent(){
    addEvent(searchKw, 'focus',function(){
      clearInterval(t);
      autoKw.style.color = '#ccc';
    });

    addEvent(searchKw, 'blur', function(){
      autoKwShow(this.value, true);
    });

    addEvent(searchKw, 'input', function(){
      autoKwShow(this.value, false);
    });

    addEvent(searchKw, 'propertychange', function(){
      autoKwShow(this.value, false);
    })

  })();

  function autoKwShow(val, isBlur){
    var len = val.length;
    if(len <= 0){
      autoKw.className = 'auto-kw show';
      autoKw.style.color = isBlur ? '#989898' : '#ccc'
    }else{
      autoKw.className = 'auto-kw hide';
    }
  }

  function setAutoKws(){
    autoKwChange();
    t = setInterval(autoKwChange, 3000);
  }

  function autoKwChange(){
    var len = recomKw.length;
    autoKw.innerText = recomKw[kwOrder];
    kwOrder = kwOrder >= len -1 ? 0 : kwOrder + 1;
  }

  return function(){
    setAutoKws();
  }
})();