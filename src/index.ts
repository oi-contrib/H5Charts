import type OptionType from "../types/option"
import type H5ChartsType from "../types/index"
import type ChartJsType from "./chart/index"
import type CanvasType from "./canvas/index"

import ChartJs from "./chart/index"
import optionFactory from "./option/index"
import resizeObserver from "./resizeObserver"
import mergeOption from "vislite/package/mergeOption/index"
import throttle from "vislite/package/throttle/index"
import Canvas from "vislite/package/Canvas/index"
import ruler from "vislite/package/ruler/index"
import Mercator from "vislite/package/Mercator/index"
import rotate from "vislite/package/rotate/index"

ChartJs.install({
    mergeOption,
    ruler,
    Mercator,
    rotate
})

export default class H5Charts implements H5ChartsType {

    private option: OptionType = {}
    private chartjs: ChartJsType
    private painter: CanvasType

    static registerMap(mapName: string, mapData: any) {
        ChartJs.registerMap(mapName, mapData)
    }

    constructor(el: HTMLElement, option: OptionType = {}) {
        mergeOption(this.option, option)
        this.chartjs = new ChartJs({})

        resizeObserver(el, throttle(() => {
            this.painter = new Canvas(el) as any
            this.chartjs.setOption(optionFactory(this.painter as any, this.option))
        }))

    }

    setOption(option: OptionType) {
        mergeOption(this.option, option)
        this.chartjs.setOption(optionFactory(this.painter as any, this.option))
        return this
    }

}

