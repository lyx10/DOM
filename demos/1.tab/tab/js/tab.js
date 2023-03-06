;(function(){
  function Tab(opt) {
    this.tabClass = opt.tabItem;
    this.contentClass = opt.contentItem;
    this.handleClick();
  }
  Tab.prototype = {
    handleClick: function(){
      var tabClass = this.tabClass,
          contentClass = this.contentClass,
          tabItem = document.getElementsByClassName(tabClass),
          contentItem = document.getElementsByClassName(contentClass);
      for(var i = 0; i < tabItem.length; i++){
        (function(j){
          tabItem[j].onclick = function() {
            for(var k = 0; k < tabItem.length; k++){
              tabItem[k].className = tabClass;
              contentItem[k].className = contentClass;
            }
            this.className += ' cur';
            contentItem[j].className += ' active'
          }

        })(i);
      }
    }
  }
  window.Tab = Tab;
})()