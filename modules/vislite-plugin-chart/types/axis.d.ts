export default interface AxisType {
    /**
     * 刻度尺类型
     */
    type?: "category" | "value"

    /**
     * type为category时有效
     */
    data?: Array<string>
}