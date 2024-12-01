# H5Charts / Canvas

```js
import VISLite from "vislite";
import ChartJs from "h5charts/src/chart/index";

let painter = new VISLite.Canvas(el);
let canvasJs = new CanvasJs(painter);
```

### 方法

#### 地图块

也就是绘制地图的一个区域的方法，比如我们有一个江苏地图的geoJSON，那么直接：

```js
let map = new VISLite.Mercator(45, [120, 33]);

painter.config({
    strokeStyle: "#eee",
    fillStyle: "pink"
});

for (let i = 0; i < jiangsu.features.length; i++) {
    canvasJs.fullFeature(map, jiangsu.features[i], 350, 200)
}
```

这样，就可以获得一个江苏地图：

<img src="./images/jiangsu.png">

完整代码可以查看： [feature.spec.html](./test/feature.spec.html)

上面演示的是`fullFeature`，其实还有同簇方法`fillFeature`和`strokeFeature`可供选择。

### 箭头

指定开始和结束位置即可，例如：

```js
canvasJs.arrow([100, 100], [300, 250]);
```

箭头使用轮廓绘制的，因此如果需要修改颜色的粗细，应该分别修改`strokeStyle`和`lineWidth`。