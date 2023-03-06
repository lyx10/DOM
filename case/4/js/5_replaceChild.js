// parent.replaceChild(name,origin);
var oDiv = document.getElementsByTagName('div')[0],
    oH1 = document.getElementsByTagName('h1')[0],
    // oH2 = document.createElement('h2');
    oA = document.getElementsByTagName('a')[0];
// oH2.innerText = "456";

oDiv.replaceChild(oA, oH1);