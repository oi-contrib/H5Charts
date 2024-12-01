import MapType from "vislite/types/Map"
import GridType from "./grid"

export interface CustomDataType {
    type: "custom"
}

export interface MapDataType {
    type: "map"

    /**
     * 当前地图的geo数据
     */
    geojson: any
}

export interface PieDataType {
    type: "pie"
    method: string
    arcs: Array<{

        /**
         * 弧形的开始弧度
         */
        beginDeg: number

        /**
         * 弧形的跨越弧度
         */
        deg: number

        /**
         * 弧度的内外半径
         */
        radius: [number, number]

        /**
         * 弧形圆心横坐标
         */
        cx: number

        /**
         * 弧形圆心纵坐标
         */
        cy: number
    }>
}

export interface BarRectsCartesian2dType {
    /**
     * 矩形的左下角横坐标
     */
    x: number

    /**
     * 矩形的左下角纵坐标
     */
    y: number

    /**
     * 矩形宽
     */
    width: number

    /**
     * 矩形高
     */
    height: number

    /**
     * 表示值的分量
     */
    value: "width" | "height"
}

export interface BarRectsPolarType {
    /**
     * 弧形的开始弧度
     */
    beginDeg: number

    /**
     * 弧形的跨越弧度
     */
    deg: number

    /**
     * 弧度的内外半径
     */
    radius: [number, number]

    /**
     * 弧形圆心横坐标
     */
    cx: number

    /**
     * 弧形圆心纵坐标
     */
    cy: number

    /**
     * 表示值的分量
     */
    value: "radius" | "deg"
}

export interface BarDataType {
    type: "bar"
    method: string
    index: number
    rects: Array<BarRectsCartesian2dType | BarRectsPolarType>
}

export interface PolarDataType {
    label: "angle" | "radius"
    angleAxis: {
        texts: Array<{
            x: number
            y: number
            content: string | number
            deg: number
        }>,
        masks: Array<{
            x: number
            y: number
        }>,
        cx: number
        cy: number
        beginDeg: number
        deg: number
        radius: number
    },
    radiusAxis: {
        texts: Array<{
            x: number
            y: number
            content: string | number
        }>,
        masks: Array<{
            x: number
            y: number
        }>,
        begin: {
            x: number
            y: number
        },
        end: {
            x: number
            y: number
        },
        cx: number
        cy: number
    }
}

export interface xyAxisType {

    /**
     * 轴开始位置
     */
    begin: {
        x: number
        y: number
    }

    /**
     * 轴结束位置
     */
    end: {
        x: number
        y: number
    }

    /**
     * 小刻度
     */
    masks: Array<{
        x: number
        y: number
    }>

    /**
     * 刻度文字
     */
    texts: Array<{
        x: number
        y: number
        content: string | number
    }>
}

export interface Cartesian2dDataType {

    /**
     * 表示那个轴是非数值轴
     */
    label: "x" | "y"
    xAxis: xyAxisType
    yAxis: xyAxisType
}

export default interface DataType {

    /**
     * 尺寸和留白
     */
    grid: GridType

    /**
     * 地理映射算法实例
     */
    map: MapType | null

    /**
     * 绘制区域中心横坐标
     */
    cx: number

    /**
     * 绘制区域中心纵坐标
     */
    cy: number

    /**
     * 图表系列
     */
    series: Array<CustomDataType | MapDataType | PieDataType | BarDataType>

    /**
     * 极坐标系
     */
    polar: PolarDataType

    /**
     * 直角坐标系
     */
    cartesian2d: Cartesian2dDataType

}