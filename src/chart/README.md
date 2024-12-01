# H5Charts / Chart

```js
import VISLite from "vislite";
import ChartJs from "h5charts/src/chart/index";

ChartJs.install(VISLite);
var mychart = new ChartJs(option);
```

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