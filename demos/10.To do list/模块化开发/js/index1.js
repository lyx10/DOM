init();

function init(){
  initTodList;
}

var initTodList = (function(){
  // 获取+号和inputWrap
  var plusBtn = document.getElementsByClassName('j-show-input')[0],
      inputWrap = document.getElementsByClassName('input-wrap')[0],
      // 获取增加项目按钮和input输入框
      addBtn = document.getElementsByClassName('j-add-btn')[0],
      textInput = document.getElementById('textInput'),
      // 获取装li的ul
      oList = document.getElementsByClassName('j-list')[0],
      // 标记inputWrap的状态是显示还是隐藏
      isShow = false,
      isEdit = false,
      curIndex = null;

  // 给+号绑定点击事件处理函数
  addEvent(plusBtn, 'click', function(){
    // 将点了编辑但是又没修改的li的高亮样式清除
    if(curIndex && curIndex !== -1){
      var oItems = document.getElementsByClassName('item');
      // 清除高亮样式
      oItems[curIndex].className = 'item';
      // 还原inputWrap
      textInput.value = '';
      addBtn.innerText = '增加项目';
      // 清除标记
      isEdit = false;
      curIndex = null;
    }
    showInputWrap(isShow);
  });

  // 给button绑定点击事件处理函数
  addEvent(addBtn, 'click', function(){
    // 获取input输入框的文本
    var val = textInput.value,
        textLen = val.length,
        // 获取li集合
        oItems = document.getElementsByClassName('item'),
        // oItems长度
        itemsLen = oItems.length,
        item;

    // 先判断输入框有没有内容
    if(textLen <= 0){
      return;
    }

    // 去重
    // 先判断有没有li,有才循环对比是不是一样的
    if(itemsLen > 0){
      for(var i = 0; i < itemsLen; i++){
        item = elemChildren(oItems[i])[0],
        itemText = item.innerText;
        if(itemText === val){
          alert('此项目已存在');
          return;
        }
      }
    }

    if(isEdit){
      // 将input输入框的内容填到对应li的第一个子元素中,
      var tarItem = oItems[curIndex],
          itemP = elemChildren(oItems[curIndex])[0];
      itemP.innerText = val;
      // 清除高亮样式
      tarItem.className = 'item';
      // 还原inputWarp
      textInput.value = '';
      addBtn.innerText = '增加项目';
      // 隐藏inputWrap
      showInputWrap(true); 
      // 清除标记
      isEdit = false;
      curIndex = null;

    }else{
      // 增加项目
      var oLi = document.createElement('li');
      oLi.className = 'item';
      oLi.innerHTML = itemTpl(val);
      oList.appendChild(oLi);
      textInput.value = '';
      showInputWrap(isShow);  
    }
  });

  // 给ul绑定事件处理函数，为编辑，删除按钮代理
  addEvent(oList, 'click', function(e){
    var e = e || window.event,
        tar = e.target || e.srcElement,
        tarItem = elemParent(tar, 2),
        className = tar.className,
        // 当前全部li
        oItems = document.getElementsByClassName('item');
    if(className === 'edit-btn icon icon-edit'){
          // 找所在的li
      var itemsLen = oItems.length,
          tarIndex = Array.prototype.indexOf.call(oItems, tarItem),
          item;
      // 显示inputWrap
      showInputWrap(false);
      // 先取消所有高亮样式，再单独给tarItem设置高亮样式
      for(var i = 0; i < itemsLen; i++){
        item = oItems[i];
        item.className = 'item'
      }
      tarItem.className += ' active';

      // 改变button的文本
      curIndex = tarIndex;
      addBtn.innerText = '编辑第'+ (curIndex + 1) + '项';
      textInput.value = elemChildren(tarItem)[0].innerText;
      isEdit = true;

    }else if(className = 'remove-btn icon icon-bin'){
      if(!isEdit){
        tarItem.remove();
      }else{
        alert('请先取消编辑');
      }
    }
  });

  // 显示或隐藏inputWrap
  function showInputWrap(status){
    if(!status){
      inputWrap.style.display = 'block';
      isShow = true;
    }else{
      inputWrap.style.display = 'none';
      isShow = false;
    }
  }

  // 模板
  function itemTpl(text){
    return (
    '<p class="item-content">'+ text + '</p>' + 
    '<div class="btn-group">' + 
      '<a href="javascript:;" class="edit-btn icon icon-edit">' + '</a>' +
      '<a href="javascript:;" class="remove-btn icon icon-bin">' + '</a>' +
    '</div>'
    );
  }

})();