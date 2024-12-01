export default interface GridType {
    /**
     * 可选，默认50，表示左边留白
     */
    left?: number

    /**
     * 可选，默认50，表示右边留白
     */
    right?: number

    /**
     * 可选，默认50，表示顶部留白
     */
    top?: number

    /**
     * 可选，默认50，表示底部留白
     */
    bottom?: number

    /**
     * 必输，表示画布宽
     */
    width?: number

    /**
     * 必输，表示画布高
     */
    height?: number
}