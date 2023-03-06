// parent.insertBefore(a, b)
// 在Node.prototype上

var oDiv = document.getElementsByTagName('div')[0],
    p = div.getElementsByTagName('p')[0],
    a = document.createElement('a');

a.href = '';
oDiv.insertBefore(a, p);
// 将a节点插入到oDiv里面的p节点的前面