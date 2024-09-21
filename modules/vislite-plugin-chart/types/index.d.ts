import OptionType from "./option"
import VISLiteType from "vislite/types/index"

export default class ChartJs {

    /**
     * 创建图表对象
     * @param option 
     */
    constructor(option?: OptionType)

    /**
     * 注册地图数据
     * @param mapName 地图数据名称
     * @param mapData 地图数据内容
     */
    static registerMap(mapName: string, mapData: any): ChartJs

    /**
     * 安装依赖
     * @param VISLite 
     */
    static install(VISLite: VISLiteType): ChartJs

    /**
     * 修改配置项
     * @param option 
     */
    setOption(option: OptionType): this

}