# ColorCard #
## 说明 ##
这是一个简单易用的色卡插件，支持色卡过滤和回调
## 示例 ##
### [Demo](https://unique1319.github.io/ColorCard) ###

## 使用 ##
```
   var data = "{\"colorArray\":[\"rgb(240,240,240)\",\"rgb(166,242,143)\",\"rgb(61,186,61)\",\"rgb(97,184,255)\",\"rgb(0,0,225)\",\"rgb(250,0,250)\",\"rgb(128,0,64)\"],\"valueArray\":[\"1\",\"2\",\"7\",\"15\",\"40\",\"50\"]}";
   data = JSON.parse(data);
   
   $('#color-card').ColorCard({
       type: 1,
       colorArray: data.colorArray,
       valueArray: data.valueArray
   }, function (value, index) {
       alert("callback(value:" + value + ",index:" + index + ")");
   });
```