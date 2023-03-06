// setAttribute 给元素添加属性
var div = document.getElementsByTagName('div')[0];

div.setAttribute('id', 'box');

// getAttribute 获取元素属性值
var attr = div.getAttribute('id');
console.log(attr);