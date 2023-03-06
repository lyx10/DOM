// 需求
// 1.在input输入框输入的内容，点击按钮能添加到下面的列表中,并且有 编辑 删除
// 如果input为空，则不添加，
// 点击按钮后输入框清空
// 2.点击编辑，对应项的文字能被放到输入框中
// 旁边的按钮文字变成‘编辑第几项’
// 编辑后点击按钮，按钮文字要变回"增加li"
// 3.点击删除就将对应的项删除

// 分析
// 按钮的编辑状态和增加状态：
// 设置一个变量，isEdit = false;
// 当点击编辑的时候判断一下，是false就将它改为true

// 要用到事件监听兼容函数 addEvent()
// 寻找子元素方法Element.prototype.elemChildren
var oInput = document.getElementsByClassName("j_input")[0],
    oBtn = document.getElementsByClassName("j_btn")[0],
    oList = document.getElementsByClassName("list")[0],
    isEdit = false,
    index,
    item;

// 给oBtn绑定点击事件
addEvent(oBtn, 'click', function(){
  var len = oInput.value.length,
      oList = document.getElementsByClassName("list")[0];
  if(len > 0){
    if(!isEdit){
      var oLi = document.createElement('li');
      oLi.innerHTML = "<span class='value'>" + oInput.value + '</span>' + "<span class='edit'>编辑</span>" + ' ' + "<span class='delete'>删除</span>";
      oList.appendChild(oLi);
      oInput.value = '';
    }else{
      oList.elemChildren(index).elemChildren(0).innerText = oInput.value;
      oInput.value = '';
      oBtn.value = '增加li';
    }
  }
})

// 点击编辑
// 用事件代理
// 1.给oList绑定点击事件处理函数
// 找到目标，获取对应索引，
// 改变oBtn的文字
// 改变oInput的文字

// 点击oBtn
// 如果是编辑状态
// 将input的内容重新给目标
// 点击按钮后文字还原，标记变为false
// 如果不是，就正常增加li

addEvent(oList, 'click', function(e){
  var e = e || window.event,
      tar = e.target || e.srcElement,
      self = this,
      item = tar.parentNode,
      oItems = self.elemChildren(),
      idx = Array.prototype.indexOf.call(oItems, item);
      index = idx;
  oInput.value = tar.previousElementSibling.innerText;
  oBtn.value = '编辑第' + (idx + 1) + '项';
  isEdit = true;
})
