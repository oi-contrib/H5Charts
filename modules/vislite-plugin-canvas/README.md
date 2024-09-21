# [@vislite/canvas](https://github.com/oi-contrib/H5Charts/blob/master/modules/vislite-plugin-canvas/README.md)
基于[ VISLite ](https://github.com/oi-contrib/VISLite)的Canvas画笔开发的绘制方法

<p>
    <a href="https://zxl20070701.github.io/toolbox/#/npm-download?packages=@vislite/canvas&interval=7">
        <img src="https://img.shields.io/npm/dm/@vislite/canvas.svg" alt="downloads">
    </a>
    <a href="https://www.npmjs.com/package/@vislite/canvas">
        <img src="https://img.shields.io/npm/v/@vislite/canvas.svg" alt="Version">
    </a>
   <a href="https://github.com/oi-contrib/H5Charts/blob/master/modules/vislite-plugin-canvas/README.md" target='_blank'>
        <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/oi-contrib/VISLite?style=social">
    </a>
</p>

<img src="https://nodei.co/npm/@vislite/canvas.png?downloads=true&amp;downloadRank=true&amp;stars=true" alt="NPM">

## 如何使用？

### 创建&初始化

首先，需要进行安装：

```bash
npm install --save @vislite/canvas
```

然后获取即可：

```js
import VISLite from "vislite";
import CanvasJs from "@vislite/canvas";

// https://oi-contrib.github.io/VISLite/#/api/canvas/import
let painter = new VISLite.Canvas(el);

// 创建
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

## 版权

MIT License

Copyright (c) [zxl20070701](https://zxl20070701.github.io/notebook/home.html) 走一步，再走一步