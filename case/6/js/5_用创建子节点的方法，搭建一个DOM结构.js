// 用js创建如下DOM结构
{/* <div id = "box">
  <ul class="list">
    <li class="list-item">1</li>
    <li class="list-item">2</li>
    <li class="list-item">3</li>
    <li class="list-item">4</li>
    <li class="list-item">5</li>
  </ul>
</div> */}

var oDiv = document.createElement('div'),
    oUl = document.createElement('ul'),
    oFrag = document.createDocumentFragment();

oDiv.setAttribute('id', 'box');
oUl.className = 'list';
for(var i = 0; i <= 5; i++){
  var oLi = document.createElement('li');
  oLi.className = 'list-item';
  oLi.innerHTML = i;
  oFrag.appendChild(oLi);
}
oUl.appendChild(oFrag);
oDiv.appendChild(oUl);
document.body.appendChild(oDiv);

