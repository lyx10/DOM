;(function(){
  var ModalDrag = function(opt){
    this.oModal = opt.oModal;
    this.oHead = opt.oHead;
    this.closeBtn = opt.closeBtn;
    this.init();
  }

  ModalDrag.prototype = {
    init: function(){
      this.bindEvent();
    },

    bindEvent: function(){
      var _self = this;
      addEvent(_self.oHead, 'mousedown', function(e){
        var e = e || window.event,
            x = pagePos(e).x - parseInt(getStyle(this, 'left')),
            y = pagePos(e).y - parseInt(getStyle(this, 'top'));
        console.log(pagePos(e));
        console.log(getStyle(this, 'top'));
        
        addEvent(document, 'mousemove', function(e){
          _self.mouseMove.call(_self, e);
        });

        addEvent(document, 'mouseup', function(e){
          _self.mouseUp.call(_self, e);
        });

        cancelBubble(e);
        preventDefaultEvent(e);
      });

      addEvent(this.closeBtn, 'click', function(e){
        _self.hidenModal.call(_self);
        cancelBubble(e);
        preventDefaultEvent(e);
      });
    },

    hidenModal: function(){
      this.oModal.style.display = 'none';
    },

    mouseMove: function(e){
      console.log('mouseMove');
      // var e = e || window.event;
      this.oModal.style.left = (pagePos(e).x) + 'px';
      this.oModal.style.top = (pagePos(e).y - 15) + 'px';
      // console.log(pagePos(e));
      cancelBubble(e);
      preventDefaultEvent(e);
    },
    
    mouseUp: function(e){
      console.log('mouseUp');
      removeEvent(document, 'mousemove',  this.mouseMove);
      removeEvent(document, 'mouseup',  this.mouseUp);
      cancelBubble(e);
      preventDefaultEvent(e);
    }

  }

  window.ModalDrag = ModalDrag;
})();