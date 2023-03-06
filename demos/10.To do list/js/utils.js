function addEvent(el, type, fn){
  if(el.addEventListener){
    el.addEventListener(type, fn, false);
  }else if(el.attachEvent){
    el.attachEvent('on' + type, fn);
  }else{
    el['on' + type] = fn;
  }
}

Element.prototype.elemChildren = function(index){
  var childNodes = this.childNodes,
      len = childNodes.length,
      temp = {
        "length": 0,
        "splice": Array.prototype.splice,
      },
      item;

  for(var i = 0; i < len; i++){
    item = childNodes[i];
    if(item.nodeType === 1){
      temp[temp['length']] = item;
      temp['length']++;
    }
  }

  if(index !== undefined && typeof(index) !== 'number'){
    return undefined;
  }
  return index === undefined ? temp : temp[index];

}