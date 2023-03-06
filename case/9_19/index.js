// 给数组排序，每次提2项，最大项和最小项，最小项排第一位，最大项排最后一位
var arr = [5, 1, 6, 3, 7, 9, 15, 0],
    minIndex = 0;
    maxIndex = arr.length - 1;

  for(var i = 0; i < parseInt(arr.length); i++){
    if(arr[i] < arr[minIndex]){
      minIndex = i;
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    if(arr[i] > arr[maxIndex]){
      maxIndex = i;
      [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
    }
  }
  console.log(arr[minIndex], arr[maxIndex]);




