// 原型上编程，写一个数字时钟
Date.prototype.clock = function() {
  var year = this.getFullYear(),
      month = this.getMonth() + 1,
      dat = this.getDate(),
      hours =  this.getHours(),
      minutes = this.getMinutes(),
      second =  this.getSeconds();

     var  timeNow = year + '-' + setZero(month) + '-'+ setZero(dat) + ' ' + setZero(hours) + ':' + setZero(minutes) + ':' + setZero(second);

     function setZero(n) {
      return (n < 10 ? '0' + n : n)
     }
     return timeNow
  
}

// 原型上编程，写一个倒计时
Date.prototype.countDown = function(deadline, timer){
  var date = new Date(deadline),
      now = this.getTime(),
      leftDate = (date.getTime() - now) / 1000,
      day,
      hours,
      minutes,
      seconds;
      if(leftDate >= 0){
        day = Math.floor(leftDate / 60 / 60 / 24);
        hours = Math.floor(leftDate / 60 / 60 % 24);
        minutes = Math.floor(leftDate / 60 % 60);
        seconds = Math.floor(leftDate % 60);
       
        var time = setZero(day) + '天' + setZero(hours) + '小时' + setZero(minutes) + '分钟' + setZero(seconds) + '秒';
      
        function setZero(n) {
          return (n < 10 ? '0' + n : n)
         }
      
        return time
      }else{
        clearInterval(timer);
        return '已结束'
      }

  
}