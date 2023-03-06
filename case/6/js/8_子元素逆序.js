// 子元素逆序
<div>
  4<a>456</a>3
  <h5>345</h5>2
  <h3>234</h3>1
  <p>123</p>0
</div>
Element.prototype.elemReverse = function(){
  var children = this.childNodes,
      len = children.length,
      item;
  while(len--){
    item = children[len];
    // 从最后一个开始，将节点一个一个剪切、粘贴到最后面
    this.appendChild(item);
  }
}