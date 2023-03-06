// HTML5 给元素增加了一个data-*属性

var p = document.getElementsByTagName('p')[0],
    index = p.dataset.index;

console.log(index);

// 也可以通过getAttribute访问到这个属性
console.log(p.getAttribute('data-index'));

// dataset IE9及以下不兼容

