export default interface SerieType {

    /**
     * 必输，表示图表类型
     */
    type?: "custom" | "map" | "pie" | "bar"

    /**
     * type为map时必输，其余无效，和registerMap的第一个参数一致
     */
    map?: string

    /**
     * type不是custom和map时必输，表示数据
     */
    data?: Array<number>

    /**
     * 可选，默认cartesian2d，表示选择的坐标系
     */
    coordinateSystem?: "polar" | "cartesian2d"

    /**
     * type为pie时有效，表示饼图圆心位置
     */
    center?: [number, number]

    /**
     * type为pie时有效，表示饼图内外半径
     */
    radius?: [number, number]

    /**
     * type为pie时有效，表示饼图开始弧度
     */
    beginDeg?: number

    /**
     * type为pie时有效，表示饼图跨越弧度
     */
    deg?: number
}