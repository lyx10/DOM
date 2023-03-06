window.onload = function(){
  init();
}

function init(){
  initGame();

}

var initGame = (function(){
  var oWrap = document.getElementsByClassName('game-wrap')[0],
      oTab = document.getElementsByClassName('tab')[0],
      wrapW = getStyle(oWrap, 'width'),
      wrapH = getStyle(oWrap, 'height'),
      startBtn = oTab.getElementsByClassName('start')[0],
      pauseBtn = oTab.getElementsByClassName('pause')[0],
      oScore = oTab.getElementsByClassName('score-num')[0],
      score = 0,
      oMask = document.getElementsByClassName('game-mask')[0],
      maskScore = oMask.getElementsByClassName('score-num')[0],
      closeBtn = oMask.getElementsByClassName('close')[0],
      
      step = 20,
      speed = 300,
      
      t = null;
  function Snake(){
    this.bodyArr = [
      {x: 0, y: 0},
      {x: 20, y: 0},
      {x: 40, y: 0},
      {x: 60, y: 0},
      {x: 80, y: 0},
      {x: 100, y: 0}
    ];
    this.dir = 'RIGHT';
  }

  Snake.prototype = {
    init: function(){
      this.initSnake();
      this.createFood();
      this.bindEvent();
    },

    bindEvent: function(){
      var _self = this;
      addEvent(pauseBtn, 'click', function(){
        clearInterval(t);
      });

      addEvent(startBtn, 'click', function(){
        _self.run();
      });

      addEvent(document, 'keydown', function(e){
        _self.changeDir(e);
      });

      addEvent(closeBtn, 'click', function(){
        _self.maskShow(false);
      })
    },

    initSnake: function(){
      var arr = this.bodyArr,
          len = arr.length,
          frag = document.createDocumentFragment(),
          item;

      for(var i = 0; i < len; i++){
        item = arr[i];
        var round = document.createElement('i');
        if(i === len - 1){
          round.className = 'round head icon-pacman';
          this.twistHead(round, this.dir);
        }else{
          round.className = 'round';
        }
        // round.className = i === len-1 ? 'round head icon-pacman' : 'round';
        round.style.left = item.x + 'px';
        round.style.top = item.y + 'px';
        frag.appendChild(round);
      }

      oWrap.appendChild(frag);
    },

    run: function(){
      var _self = this;
      clearInterval(t);
      t = setInterval(function(){
        _self.move();
      }, speed);
    },

    move: function(){
      var arr = this.bodyArr,
          len = arr.length;
      
      for(var i = 0; i < len; i++){
        if(i === len - 1){
          this.setHeadXY(arr);
        }else{
          arr[i].x = arr[i + 1].x;
          arr[i].y = arr[i + 1].y;
        }
      }

      this.removeSnake();
      this.initSnake();
      this.eatFood(arr);
      this.headInBody(arr);
      
    },

    removeSnake: function(){
      var bodys = oWrap.getElementsByClassName('round');
      while(bodys.length > 0){
        bodys[0].remove();
      }
    },

    changeDir: function(e){
      var ev = e || window.event,
          code = ev.keyCode;
      this.setDir(code);
    },

    setDir: function(code){
      switch(code){
        case 37:
          if(this.dir !== 'LEFT' && this.dir !== 'RIGHT'){
            this.dir = 'LEFT'
          }
          break;
        case 39:
          if(this.dir !== 'LEFT' && this.dir !== 'RIGHT'){
            this.dir = 'RIGHT'
          }
          break;
        case 38:
          if(this.dir !== 'UP' && this.dir !== 'DOWN'){
            this.dir = 'UP'
          }
          break;
        case 40:
          if(this.dir !== 'UP' && this.dir !== 'DOWN'){
            this.dir = 'DOWN'
          }
          break;
        default:
          break;
      }
    },

    setHeadXY: function(arr){
      var head = arr[arr.length - 1];
      switch(this.dir){
        case 'LEFT':
          if(head.x < 0){
            head.x = wrapW - step;
          }else{
            head.x -= step;
          }
          break;
        case 'RIGHT':
          if(head.x > wrapW - step){
            head.x = 0;
          }else{
            head.x += step;
          }
          break;
        case 'UP':
          if(head.y < 0){
            head.y = wrapH - step;
          }else{
            head.y -= step;
          }
          break;
        case 'DOWN':
          if(head.y > wrapH - step){
            head.y = 0;
          }else{
            head.y += step;
          }
      }
    },

    headInBody: function(arr){
      var _self = this,
          len = arr.length,
          head = arr[len - 1],
          headX = head.x,
          headY = head.y,
          item,
          timer = null;
      for(var i = 0; i < len - 2; i++){
        item = arr[i];
        if(item.x === headX && item.y === headY){
          timer = setTimeout(function(){
            clearInterval(t);
            _self.maskShow(true);
            clearTimeout(timer);
          }, 100);
        }
      }
    },

    maskShow: function(isShow){
      if(isShow){
        oMask.className += ' show';
        this.setScore(maskScore, score);
      }else{
        oMask.className = 'game-mask';
        this.resetGame();
      }
    },

    resetGame: function(){
      score = 0;
      this.bodyArr = [
        {x: 0, y: 0},
        {x: 20, y: 0},
        {x: 40, y: 0},
        {x: 60, y: 0},
        {x: 80, y: 0},
        {x: 100, y: 0}
      ];
      this.removeSnake();
      this.removeFood();
      this.setScore(maskScore, score);
      this.setScore(oScore, score);
      this.dir = 'RIGHT';
      this.init();

    },

    twistHead: function(node, dir){
      switch(dir){
        case 'LEFT':
          node.className += ' left';
          break;
        case 'RIGHT':
          node.className += ' right';
          break;
        case 'UP':
          node.className += ' up';
          break;
        case 'DOWN':
          node.className += ' down';
          break;
        default:
          break;
      }
    },

    createFood: function(){
      var food = document.createElement('i');
      food.className = 'food';
      food.style.left = this.setRandomPos(wrapW) * step + 'px';
      food.style.top = this.setRandomPos(wrapH) * step + 'px';
      oWrap.appendChild(food);
    },

    setRandomPos: function(size){
      return Math.floor(Math.random() * (size / step));
    },

    removeFood: function(){
      var food = oWrap.getElementsByClassName('food')[0];
      food.remove();
    },

    eatFood: function(arr){
      var len = arr.length,
          food = oWrap.getElementsByClassName('food')[0],
          foodX = getStyle(food, 'left'),
          foodY = getStyle(food, 'top'),
          headX = arr[len - 1].x,
          headY = arr[len - 1].y,
          x,
          y;

      if(foodX === headX && foodY ===  headY){
        score ++;
        this.setScore(oScore, score);
        this.removeFood();
        this.createFood();
        if(arr[0].x === arr[1].x){
          x = arr[0].x;
          if(arr[0].y > arr[1].y){
            y = arr[0].y + step;
          }else if(arr[0].y < arr[1].y){
            y = arr[0].y - step;
          }
        }else if(arr[0].y === arr[1].y){
          y = arr[0].y;
          if(arr[0].x > arr[1].x){
            x = arr[0].x + step;
          }else if(arr[0].x < arr[1].x){
            x = arr[0].x - step;
          }
        }
        arr.unshift({x, y});
      }

    },

    setScore: function(node, score){
      node.textContent = score;
    }
  }
  

  return new Snake().init();
});