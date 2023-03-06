Date.prototype.countDown = function(endTime,timer){
  var end = new Date(endTime).getTime(),
      current = this.getTime(),
      leftTime = (end - current) / 1000;
      if(leftTime >= 0){
        var day = Math.floor(leftTime / 60 / 60 / 24),
            hours = Math.floor(leftTime / 60 / 60 % 24),
            minutes = Math.floor(leftTime / 60 % 60),
            seconds = Math.floor(leftTime % 60);
      
        return (day + '天' + setZero(hours) + '小时' + setZero(minutes) + '分' + setZero(seconds) + '秒');
  
      }else{
        clearInterval(timer);
        return '0天00小时00分00秒'
      }

  function setZero(value){
    return (value < 10 ? '0' + value : value);
  }
  

}