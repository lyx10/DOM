;(function(node){
  function TodoList(){
    this.node = node;
    this.config = this.getConfig();
    this.itemClass = this.config.itemClass;
    // 标记inputWrap的状态是显示还是隐藏,默认隐藏
    this.isShow = false;
    // 标记是否是编辑状态
    this.isEdit = false;
    // 标记选中的item
    this.curIndex = null;

    // 循环遍历，检查配置项是否都有
    for(var key in this.dConfig){
      if(!this.config.hasOwnProperty(key)){
        throw errorInfo(key);
      }
    }

    this.setConfig();

    // 保存this
    var _self = this;

    // 给+号绑定点击事件
    addEvent(this.plusBtn, 'click', function(){
      _self.showInput.call(_self);
    });

    // 给button绑定点击事件
    addEvent(this.addBtn, 'click', function(){
      _self.addBtnClick.call(_self);
    });

    // 给item的父级绑定点击事件，让它来代理子元素的点击事件
    addEvent(this.oList, 'click',function(e){
      _self.listClick.call(_self, e);

    })
  }

  TodoList.prototype = {
    // 默认配置项，用于与获取的config比对
    dConfig: {
      "plusBtn": "",
      "inputWrap": "",
      "addBtn": "",
      "textInput": "",
      "oList": "",
      "itemClass": ""
    },

    getConfig: function(){
      // 获取配置信息
      return config = JSON.parse(this.node.getAttribute('data-config'));
    },

    // 取配置信息中的每一项，放到this中
    setConfig: function(){
      var config = this.config,
          node = this.node;
      
      this.plusBtn = node.getElementsByClassName(config.plusBtn)[0];
      this.inputWrap = node.getElementsByClassName(config.inputWrap)[0];
      this.addBtn = this.inputWrap.getElementsByClassName(config.addBtn)[0];
      this.textInput = this.inputWrap.getElementsByClassName(config.textInput)[0];
      this.oList = node.getElementsByClassName(config.oList)[0];

    },

    // 打开/关闭inputWrap
    showInput: function(){
      if(this.isShow){
        // 这里的函数是独立调用了，this不指向构造函数的this，
        // 为了让它指向指回构造函数的this，要用call
        // 关闭
        showInputWrap.call(this, 'close');

      }else{
        // 打开inputWrap
        showInputWrap.call(this, 'open');
      }
    },
    // 添加/修改项目
    addBtnClick: function(){
        // 0.获取input输入框的文本内容
      var content = this.textInput.value,
          contentLen = content.length,
          oItems = this.oList.getElementsByClassName(this.itemClass),
          itemsLen = oItems.length,
          itemContent;
      // 判断有没有内容，没有内容直接返回
      if(contentLen <= 0){
        return;
      }

      // 去重
      if(itemsLen > 0){
        for(var i = 0; i < itemsLen; i++){
          itemContent = elemChildren(oItems[i])[0].innerText;
          if(content === itemContent){
            alert('此项目已存在');
            return;
          }
        }
      }
      if(this.isEdit){
        var tarItem = oItems[this.curIndex],
            tarP = elemChildren(tarItem)[0];
 
        // 1.将input输入框的内容放到item的p子元素中
        tarP.innerText = content;

        // 2.将inputWrap的状态还原
        setInputStatus.apply(this,[oItems, this.curIndex, 'add']);

      }else{
        // 1.创建item,
        var oLi = document.createElement('li');
        // 2.给item设置类名
        oLi.className = this.itemClass;
        // 3.给item设置innerHTML(要用模板 -> 3.2写创建模板的函数)
        oLi.innerHTML = itemTpl(content);
        // 3.将放到oList中
        this.oList.appendChild(oLi);
      
      }
      this.textInput.value = '';
    },
    // 点击编辑或删除图标
    listClick: function(e){
      var _self = this,
          e = e || window.event,
          tar = e.target || e.srcElement,
          tarClass = tar.className,
          tarItem = elemParent(tar, 2);

      if(tarClass === 'edit-btn icon icon-edit'){
        var oItems = this.oList.getElementsByClassName(this.itemClass),
            itemsLen = oItems.length,
            tarText = elemChildren(tarItem)[0].innerText,
            idx = Array.prototype.indexOf.call(oItems, tarItem),
            item;

        // 给选中的项添加高亮样式
        for(var i = 0; i< itemsLen; i++){
          item = oItems[i];
          item.className = this.itemClass;
        }
        oItems[idx].className += ' active';

        showInputWrap.call(_self,'open');
        // 将tarItem的文本赋给textInput
        this.textInput.value = tarText;

        setInputStatus.apply(_self, [oItems, idx, 'edit']);

      }else if(tarClass === 'remove-btn icon icon-bin'){
        tarItem.remove();
      }
    }

  }

  // inputWrap的显示与隐藏
  function showInputWrap(action){
    if(action === 'open'){
      this.inputWrap.style.display = 'block';
      this.isShow = true;
      // 让列表容器下移，避免被inputWrap挡住
      elemParent(this.oList).className += ' active'
    }else if(action === 'close'){
      this.inputWrap.style.display = 'none';
      this.isShow = false;
      this.textInput.value = '';
      // 再上移回去
      elemParent(this.oList).className = 'list-wrap';
    }
  }

  // inputWrap的状态
  function setInputStatus(oItems, index, status){
    if(status === 'edit'){;
      // 1.修改button的文本
      this.addBtn.innerText = '编辑第' + (index + 1) + '项';
      // 2.修改当前索引
      this.curIndex = index;
      // 3.修改编辑状态
      this.isEdit = true;
      
    }else if(status === 'add'){
      // 1.清除高亮样式
      oItems[index].className = this.itemClass;
      // 2.修改button的文本
      this.addBtn.innerText = '增加项目';
      // 3.修改当前索引
      this.curIndex = null;
      // 4.修改编辑状态
      this.isEdit = false;
    }
  }

  // 模板
  function itemTpl(content){
    return (
      '<p class="item-content">' + content + '</p>' +
      '<div class="btn-group">' +
        '<a href="javascript:;" class="edit-btn icon icon-edit"></a>' +
        '<a href="javascript:;" class="remove-btn icon icon-bin"></a>' +
      '</div>'
    );
  }

  // 输出错误信息
  function errorInfo(key){
    return new Error(
      '您没有配置参数' + key + '\n' +
      '必须要配置的参数列表如下：\n' +
      '打开输入框按钮元素类名：plusBtn\n' +
      '输入框区域按钮元素类名：inputWrap\n' +
      '输入框区域元素类名：textInput\n' +
      '增加项目按钮元素类名：addBtn\n' +
      '列表承载元素类名：oList',
      '列表项承载元素类名：itemClass'
    )
  }

  new TodoList();
})(document.getElementsByClassName('wrap')[0]);