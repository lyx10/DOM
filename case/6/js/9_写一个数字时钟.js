Date.prototype.clock = function(){
  var year = this.getFullYear(),
      month = this.getMonth() + 1,
      date = this.getDate(),
      hours = this.getHours(),
      minutes = this.getMinutes(),
      seconds = this.getSeconds();
  return (year + '-' + setZero(month) + '-' + setZero(date) + ' ' + setZero(hours) + ':' + setZero(minutes) + ':' + setZero(seconds))
  
  function setZero(value){
      return value < 10 ? ('0' + value) :value ;
  }

}