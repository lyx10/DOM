(function(){
  copyListItem(18);
  function copyListItem(n){
    var oList = document.getElementsByClassName('bk-list')[0],
        oLi = document.getElementsByClassName('list-item')[0],
        oFrag = document.createDocumentFragment();

    for(var i = 0; i < n; i++){
      var item = document.createElement('li');
      item.className = 'list-item';
      item.innerHTML = oLi.innerHTML;
      oFrag.appendChild(item);
      }
      oList.appendChild(oFrag);
  }
 
})();
