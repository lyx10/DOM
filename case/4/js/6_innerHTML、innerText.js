// innerHTML innerText
// 在HTMLElement.prototype上




var oDiv = document.getElementsByTagName('div')[0],
    oP = oDiv.getElementsByTagName('p')[0];  
// 获取
console.log(oDiv.innerHTML);

// 赋值
// oP.innerHTML = '我是段落标签';

// 追加
// oDiv.innerHTML += '123';

// 写HTML字符串
// oDiv.innerHTML += '<a style="color: red">123</a>';
// 可以将字符串中的标签解析为真正的标签

// innerText
{/* <div>
  <h1>标题</h1>
  <p>段落</p>
  <a>超链接</a>
</div> */}
var div = document.getElementsByTagName('div')[0];

// console.log(div.innerText);

// 写HTML字符串
oDiv.innerText = '<p style="color: red"></p>';
// 不会将字符串里面的标签解析成HTML标签。是什么样就显示什么样
// 能在页面显示的原因，将特殊字符转换成了字符实体

// 老版本的firefox不支持innerText, 支持innerContent, 但老版本的IE不支持innerText
