//模块化
// var header = functiion(){};

// 一个js里整合多个模块
// 4个js文件合成1个js文件，都有相同变量，如何整合
// 全局作用域的问题

// 模块化开发的目的
// 单独一个功能抽象出来，作为一个单独的开发个体，使这个功能可以和任何模块合并，
// 互相调用，而产生更多的效果，而且互相之间不会有开发上的作用域上的影响。

// 模块化标配
// var header = (function(){})();
// IIFE Immediately Invoked Function Expression  立即调用函数表达式


init();

function init(){
  initTodList;
}

var initTodList = (function(){
      // 获取＋号
  var sInptBtn = document.getElementsByClassName("j-show-input")[0],
      //获取input-wrap
      inputWrap = document.getElementsByClassName("input-wrap")[0],
      // 获取增加项目按钮
      addBtn = document.getElementsByClassName('j-add-btn')[0],
      // 获取input输入框
      textInput = document.getElementById("textInput"),
      // 获取装li的ul
      oList = document.getElementsByClassName("j-list")[0],
      // 标记inputWrap当前的状态是显式还是隐藏
      isShow = false;

  // 绑定事件处理函数
  addEvent(sInptBtn, 'click', function(){
    showInputWrap(isShow);

  });

  addEvent(addBtn, 'click', function(){
    var oItems = document.getElementsByClassName('item'),
        val = textInput.value,
        len = val.length,
        itemsLen = oItems.length,
        item;
        // console.log(val);
    if(len === 0){
      console.log(1);
      return;
    }

    if(itemsLen > 0){
      // 去重
      for(var i = 0; i < itemsLen; i++){
        // 找子元素
        item = elemChildren(oItems[i])[0];
        console.log(item);
        var text = item.innerText;
      
        if(val === text){
          alert('此项目已存在');
          return;
        }
      }
    }
    
    var oLi = document.createElement('li');
    oLi.className = 'item';
    oLi.innerHTML = itemTpl(val);
    oList.appendChild(oLi);
    textInput.value = '';
    // 隐藏输入框
    showInputWrap(isShow);
  })

  function itemTpl(text){
    return ('<p class="item-content">' + text + '</p>') +
    '<div class="btn-group">' +
      '<a href="javascript:;" class=" edit-btn icon icon-edit"></a>' +
      '<a href="javascript:;" class="remove-btn icon icon-bin"></a>' +
    '</div>'
  }

  function showInputWrap(status){
    if(!status){
      inputWrap.style.display = 'block';
      isShow = true;
    }else{
      inputWrap.style.display = 'none';
      isShow = false;
    }
  }

})();