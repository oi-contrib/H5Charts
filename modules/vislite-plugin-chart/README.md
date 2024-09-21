# [@vislite/chart](https://github.com/oi-contrib/H5Charts/blob/master/modules/vislite-plugin-chart/README.md)
基于[ VISLite ](https://github.com/oi-contrib/VISLite)开发的可视化图表库（基础布局版本可跨端，类似无头ECharts）

<p>
    <a href="https://zxl20070701.github.io/toolbox/#/npm-download?packages=@vislite/chart&interval=7">
        <img src="https://img.shields.io/npm/dm/@vislite/chart.svg" alt="downloads">
    </a>
    <a href="https://www.npmjs.com/package/@vislite/chart">
        <img src="https://img.shields.io/npm/v/@vislite/chart.svg" alt="Version">
    </a>
    <a href="https://github.com/oi-contrib/H5Charts/blob/master/modules/vislite-plugin-chart/README.md" target='_blank'>
        <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/oi-contrib/VISLite?style=social">
    </a>
</p>

<img src="https://nodei.co/npm/@vislite/chart.png?downloads=true&amp;downloadRank=true&amp;stars=true" alt="NPM">

## 如何使用？

### 创建&初始化

首先，需要进行安装：

```
npm install --save @vislite/chart
```

然后获取即可：

```js
import VISLite from "vislite";
import ChartJs from "@vislite/chart";

ChartJs.install(VISLite);

var mychart = new ChartJs(option);
```

上面的option是一个json，具体格式如下：

```js
option =  {
    grid: {
        left: number, // 可选，默认50，表示左边留白
        right: number, // 可选，默认50，表示右边留白
        top: number, // 可选，默认50，表示顶部留白
        bottom: number, // 可选，默认50，表示底部留白
        width: number, // 必输，表示画布宽
        height: number, // 必输，表示画布高
    },

    // 直角坐标系 cartesian2d
    xAxis: {
        type: "category" | "value", // 刻度尺类型
        data:Array<string>, // type为category时有效
    },
    yAxis: {}, // 和xAxis类似，只是类型type不可以同时为category或value

    // 极坐标系 polar
    radiusAxis: {
        type: "category" | "value", // 刻度尺类型
        data:Array<string>, // type为category时有效
    },
    angleAxis: {}, // 和radiusAxis类似，只是类型type不可以同时为category或value

    series: Array<{
        type: "custom" | "map" | "pie" | "bar", // 必输，表示图表类型
        map: string, // type为map时必输，其余无效，和registerMap的第一个参数一致
        data:Array<number>, // type不是custom和map时必输，表示数据
        coordinateSystem: "polar" | "cartesian2d", // 可选，默认cartesian2d，表示选择的坐标系
        center: [number, number], // type为pie时有效，表示饼图圆心位置
        radius: [number, number], // type为pie时有效，表示饼图内外半径
        beginDeg: number, // type为pie时有效，表示饼图开始弧度
        deg: number, // type为pie时有效，表示饼图跨越弧度
    }>,

    // 必输，绘制方法（根据data内容自定义绘制方法）
    update: function (data) {
        // todo    
    }
};
```

上面绘制方法data的格式如下：

```js
data = {
    grid: { left, top, right, bottom, width, height }, // 画布尺寸和留白 
    map: MapType | null, // 地理映射算法实例
    cx: number, // 绘制区域中心横坐标
    cy:number, // 绘制区域中心纵坐标
    polar:{ // 极坐标系
        label: "angle" | "radius",
        angleAxis: {
            texts: Array<{ // 刻度文字
                x: number,
                y: number,
                content: string | number,
                deg: number
            }>,
            masks: Array<{ // 小刻度
                x: number,
                y: number
            }>,
            cx: number,
            cy: number,
            beginDeg: number,
            deg: number,
            radius: number
        },
        radiusAxis: {
            texts: Array<{ // 刻度文字
                x: number,
                y: number,
                content: string | number
            }>,
            masks: Array<{ // 小刻度
                x: number,
                y: number
            }>,
            begin: {
                x: number,
                y: number
            },
            end: {
                x: number,
                y: number
            },
            cx: number
            cy: number
        }
    },
    cartesian2d:{ // 直角坐标系
        label: "x" | "y", // 表示那个轴是非数值轴
        xAxis: {
            begin: { // 轴开始位置
                x: number,
                y:number
            },
            end:{}, // 轴结束位置，和begin格式一样
            masks: Array<{ // 小刻度
                x: number,
                y: number
            }>,
            texts: Array<{ // 刻度文字
                x: number,
                y: number,
                content: string | number
            }>
        },
        yAixs:{} // // 和xAxis一样
    },
    series: Array<{
        type: "custom" | "map" | "pie" | "bar", // 表示图表类型
        method: "arc" | "rect", // 表示arcs或rects等应该配套使用VISLite中的什么方法进行绘制
        index: number, // type为bar时存在，表示序号
        geojson: GeoJSON, // type为map时存在，表示当前地图的geo数据
        arcs:Array<{ // type为pie时存在，表示饼图的一个个弧形
            beginDeg: number, // 弧形的开始弧度
            deg: number, // 弧形的跨越弧度
            radius: [number,number], // 弧度的内外半径
            cx: number, // 弧形圆心横坐标
            cy: number, // 弧形圆心纵坐标
        }>,
        rects:Array<{ // type为rect时存在，表示柱状图的一个个矩形
            // 直角坐标系时
            x: number, // 矩形的左下角横坐标
            y: number, // 矩形的左下角纵坐标
            width: number, // 矩形宽
            height: number, // 矩形高
            value: "width" | "height", // 表示值的分量
        }|{ 
            // 极坐标系时
            beginDeg: number, // 弧形的开始弧度
            deg: number, // 弧形的跨越弧度
            radius: [number,number], // 弧度的内外半径
            cx: number, // 弧形圆心横坐标
            cy: number, // 弧形圆心纵坐标
            value: "radius" | "deg", // 表示值的分量
        }>
    }>
};
```

## 方法

### registerMap

注册地图geoJSON数据：

```js
ChartJs.registerMap("china", chinaGeoJSON);
```

### setOption

修改配置数据：

```js
mychart.setOption(option);
```

## 版权

MIT License

Copyright (c) [zxl20070701](https://zxl20070701.github.io/notebook/home.html) 走一步，再走一步