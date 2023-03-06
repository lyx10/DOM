var oBox1 = document.getElementsByClassName('box1')[0],
    oBox2 = document.getElementsByClassName('box2')[0];

console.log(oBox1.hasChildNodes()); //true  换行也算文本节点

console.log(oBox2.hasChildNodes()); //false