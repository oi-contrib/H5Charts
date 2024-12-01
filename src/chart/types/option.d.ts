import GridType from "./grid"
import AxisType from "./axis"
import SerieType from "./serie"
import DataType from "./data"

export default interface OptionType {

    /**
     * 网格
     */
    grid?: GridType

    /**
     * x轴
     */
    xAxis?: AxisType

    /**
     * y轴
     */
    yAxis?: AxisType

    /**
     * 半径轴
     */
    radiusAxis?: AxisType

    /**
     * 弧度轴
     */
    angleAxis?: AxisType

    /**
     * 图表系列
     */
    series?: Array<SerieType>

    /**
     * 必输，绘制方法（根据data内容自定义绘制方法）
     */
    update?: (data: DataType) => void

}