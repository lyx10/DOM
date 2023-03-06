function init(){
  initGame();
}

var initGame = (function(){
  // 获取game-wrap
  var oWrap = document.getElementsByClassName("game-wrap")[0],
      oTab =  document.getElementsByClassName('tab')[0]
      startBtn = oTab.getElementsByClassName('start')[0],
      pauseBtn = oTab.getElementsByClassName('pause')[0],
      oScore = oTab.getElementsByClassName('score-num')[0],
      socre = 0,
      mask = document.getElementsByClassName('game-over')[0],
      oMaskScore = mask.getElementsByClassName('score-num')[0],
      oClose = mask.getElementsByClassName('close')[0],
      WrapW = getStyle(oWrap,'width'),
      WrapH = getStyle(oWrap,'height'),
      speed = 300,
      t = null;
  // 1.声明一个蛇的构造函数
  function Snake(){
    this.bodyArr = [
      {x: 0, y: 0},
      {x: 20, y: 0},
      {x: 40, y: 0},
      {x: 60, y: 0},
      {x: 80, y: 0},
      {x: 100, y: 0,},
    ];
    this.dir = 'RIGHT';
  }

  Snake.prototype = {
    init: function(){
      this.initSnake();
      this.bindEvent();
      this.createFood();
    },

    bindEvent: function(){
      var _self = this;
      addEvent(document, 'keydown', function(){
        _self.changeDir.call(_self);
      });

      addEvent(startBtn, 'click', function(){
        clearInterval(t);
        _self.run();
      });

      addEvent(pauseBtn, 'click', function(){
        clearInterval(t);
      });

      addEvent(oClose, 'click', function(){
        _self.maskShow(false);
      })
    },

    initSnake: function(){
      var _self = this,
          arr = this.bodyArr,
          len = arr.length,
          frag = document.createDocumentFragment(),
          item;
      // 循环创建蛇身
      for(var i = 0; i < len; i++){
        item = arr[i];

        var round = document.createElement('i');
        if(i === len - 1){
          round.className = 'round head icon-pacman';
          _self.twistHead(round, _self.dir);
        }else{
          round.className = 'round';
        }
        round.style.left = item.x + 'px';
        round.style.top = item.y + 'px';
        frag.appendChild(round);
      }
      
      oWrap.appendChild(frag);
      

    },

    run: function(){
      var _self = this;
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

      this.eatFood(arr);
      this.removeSnake();
      this.initSnake();
      this.headInBody(arr);
    }, 

    setHeadXY: function(arr){
      var head = arr[arr.length - 1];
      switch(this.dir){
        case 'LEFT':
          if(head.x <= 0){
            head.x = WrapW - 20;
          }else{
            head.x -= 20;
          }
          break;

        case 'RIGHT':
          if(head.x >= WrapW - 20){
            head.x = 0;
          }else{
            head.x += 20;
          }
          break;

        case 'UP':
          if(head.y <= 0){
            head.y = WrapH - 20;
          }else{
            head.y -= 20;
          }
          break;

        case 'DOWN':
          if(head.y >= WrapH - 20){
            head.y = 0;
          }else{
            head.y += 20;
          }
          break;
      }
    },

    removeSnake: function(){
      var bodys = oWrap.getElementsByClassName('round');
      while(bodys.length > 0){
        bodys[0].remove();
      }
    },

    changeDir: function(ev){
      var e = ev || window.event,
          code = e.keyCode;

      this.setDir(code);
    },

    setDir: function(code){
      switch(code){
        case 37:
          if(this.dir !== 'RIGHT' && this.dir !== 'LEFT'){
            this.dir = 'LEFT';
          }
          break;
        case 39:
          if(this.dir !== 'RIGHT' && this.dir !== 'LEFT'){
            this.dir = 'RIGHT';
          }
          break;
        case 38:
          if(this.dir !== 'UP' && this.dir !== 'DOWN'){
            this.dir = 'UP';
          }
          break;
        case 40:
          if(this.dir !== 'UP' && this.dir !== 'DOWN'){
            this.dir = 'DOWN';
          }
          break;
        default:
          break;
      }
    },

    headInBody: function(arr){
      var len = arr.length,
          headX = arr[len - 1].x,
          headY = arr[len - 1].y,
          item;
      for(var i = 0; i < len - 2; i++){
        item = arr[i];
        if(headX === item.x && headY === item.y){
          var _self = this;
          setTimeout(function(){
            clearInterval(t);
            _self.maskShow(true);
          }, 100);


        }
  
      }
    },

    createFood: function(){
      var food = document.createElement('i');
      food.className = 'food';
      food.style.left = this.setRandomPos(WrapW) * 20 + 'px';
      food.style.top = this.setRandomPos(WrapH) * 20 + 'px';
      oWrap.appendChild(food);
    },

    setRandomPos: function(size){
      return Math.floor(Math.random() * (size / 20));
    },

    eatFood: function(arr){
      // 获取食物和食物的坐标
      // 获取头的坐标
      var len = arr.length,
          food = document.getElementsByClassName('food')[0],
          foodX = getStyle(food, 'left'),
          foodY = getStyle(food, 'top'),
          headX = arr[len -1].x,
          headY = arr[len -1].y,
          x,
          y;
      // 判断头部的坐标和食物的坐标是否重合
      // 重合后先清除原来的食物，再创建新的食物
      if(foodX === headX && foodY === headY){
        this.removeFood();
        this.createFood();
        socre++;
        oScore.textContent = socre;
      // 再判断蛇尾的两个坐标
      // 先判断x轴相等的情况
      // 如果x轴相等，且arr[0].y > arr[1].y, y = arr[0] + 20;
      // 如果x轴相等，且arr[0].y < arr[1].y, y = arr[0] - 20;
        if(arr[0].x === arr[1].x){
          x = arr[0].x;
          if(arr[0].y > arr[1].y){
            y = arr[0].y + 20;
          }else if(arr[0].y < arr[1].y){
            y = arr[0] - 20;
          }
        // 再判断y轴相等的情况
        // 如果y轴相等，且arr[0].x > arr[1].x, x = arr[0].x + 20;
        // 如果y轴相等，且arr[0].x < arr[1].x, x = arr[0].x - 20;
        }else if(arr[0].y === arr[1].y){
          y = arr[0].y;
          if(arr[0].x > arr[1].x){
            x = arr[0].x + 20;
          }else if(arr[0].x < arr[1].x){
            x = arr[0].x - 20;
          }
        }
        // 放到数组最前面（蛇头在数组最后，蛇尾在最前）
        arr.unshift({x, y});
      }
    },

    removeFood: function(){
      var food = oWrap.getElementsByClassName('food')[0];
      food.remove();
    },

    snakeReset: function(){
      this.bodyArr = [
        {x: 0, y: 0},
        {x: 20, y: 0},
        {x: 40, y: 0},
        {x: 60, y: 0},
        {x: 80, y: 0},
        {x: 100, y: 0},
      ];
      this.dir = 'RIGHT';
      socre = 0;
      oScore.textContent = socre;
      oMaskScore.textContent = 0;
      this.removeSnake();
      this.removeFood();
      this.init();
    },

    maskShow: function(isShow){
      if(isShow){
        oMaskScore.textContent = socre;
        mask.className += ' show';
      }else{  
        mask.className = 'game-over';
        this.snakeReset();
      }
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
    }
  }

  return new Snake().init();
});

init();