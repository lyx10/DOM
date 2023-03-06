Element.prototype.insertAfter = function(tar, origin){
  var elem = origin.nextElementSiBling;

  // 如果要插入的元素后面有兄弟元素，就找到这个兄弟元素，用insertBefore()插在这个兄弟之前，
  if(elem){
    this.insertBefore(tar, elem);
  }else{
    // 如果没有，就用appendChild()
    this.appendChild(tar);
  }
}