import type DataType from "../../modules/vislite-plugin-chart/types/data"
import type OptionType from "../../types/option"
import type CanvasType from "vislite/types/Canvas"
import type { CustomType } from "../../types/serie"

import { getColorsFactory, visualMapFactory } from "./color"
import { drawMap } from "./map"
import { initAxis, drawXAxis, drawYAxis, drawRadiusAxis, drawAngleAxis } from "./axis"
import { drawRectBar, drawArcBar } from "./bar"
import { drawPie } from "./pie"
import { drawTitle } from "./pendant"

export default function (painter: CanvasType, option: OptionType) {
    let info = painter.getInfo(), temp: any

    let getColors = getColorsFactory(painter, option.color)

    let params = {
        width: info.width,
        height: info.height
    }

    let evalFun = function (oralVal: any) {
        return typeof oralVal == 'function' ? oralVal(params) : oralVal
    }

    let series = [], serieOption = []
    if (option.series) option.series.forEach(serie => {

        // 自定义
        if (serie.type == "custom") {
            series.push({
                type: "custom"
            })
            serieOption.push({})
        }

        // 地图
        else if (serie.type == "map") {
            series.push({
                type: "map",
                map: serie.map
            })
            serieOption.push({
                label: serie.label || {
                    show: false
                },
                data: serie.data,
                getColors
            })
        }

        // 柱状图
        else if (serie.type == "bar") {
            series.push({
                type: "bar",
                coordinateSystem: serie.coordinateSystem || "cartesian2d",
                data: serie.data
            })
            serieOption.push({})
        }

        // 饼图
        else if (serie.type == "pie") {

            let data = []
            serie.data.forEach(item => {
                data.push(item.value)
            })

            let startAngle = "startAngle" in serie ? serie.startAngle : -90
            let angle = serie.angle || 360

            series.push({
                type: "pie",
                beginDeg: startAngle / 360 * Math.PI * 2,
                deg: angle / 360 * Math.PI * 2,
                data,
                radius: evalFun(serie.radius),
                center: evalFun(serie.center)
            })
            serieOption.push({
                data: serie.data,
                getColors
            })
        }

    });

    // grid

    let grid: any = {
        width: info.width,
        height: info.height
    }

    if ("grid" in option) {
        let _grid = option.grid

        if ("left" in _grid) grid.left = _grid.left
        if ("right" in _grid) grid.right = _grid.right
        if ("top" in _grid) grid.top = _grid.top
        if ("bottom" in _grid) grid.bottom = _grid.bottom
    }

    // 直角坐标系

    temp = initAxis(option.xAxis, option.yAxis)
    let xAxis = temp[0], yAxis = temp[1]

    // 极坐标系

    temp = initAxis(option.angleAxis, option.radiusAxis)
    let angleAxis = temp[0], radiusAxis = temp[1]

    return {
        grid,
        xAxis,
        yAxis,
        angleAxis,
        radiusAxis,
        series,
        update(data: DataType) {
            painter.clearRect(0, 0, info.width, info.height).setRegion(null)

            let colors = getColors(data.series.length)
            let visualMap = option.visualMap ? visualMapFactory(painter, option.visualMap) : null

            if (option.title) drawTitle(painter, option.title)

            // 直角坐标系
            if (data.cartesian2d) {
                drawXAxis(painter, data.cartesian2d.xAxis, data.cartesian2d.label == "x" ? -1 : data.cartesian2d.yAxis.end.y)
                drawYAxis(painter, data.cartesian2d.yAxis, data.cartesian2d.label == "y" ? -1 : data.cartesian2d.xAxis.end.x)
            }

            // 极坐标系
            if (data.polar) {
                drawRadiusAxis(painter, data.polar.radiusAxis, data.polar.label == "radius")
                drawAngleAxis(painter, data.polar.angleAxis, data.polar.label == "angle")
            }

            data.series.forEach((serie, index) => {
                painter.reset()

                if (serie.type == "custom") {
                    (option.series[index] as CustomType).draw.call(null, {
                        painter,
                        grid: data.grid,
                        cx: data.cx,
                        cy: data.cy
                    })
                }

                // 地图
                else if (serie.type == "map") {
                    drawMap(painter, serie, data.map, data.cx, data.cy, serieOption[index], {
                        visualMap
                    })
                }

                // 柱状图
                else if (serie.type == "bar") {
                    if (serie.method == "rect") {
                        drawRectBar(painter, serie, colors[serie.index])
                    } else {
                        drawArcBar(painter, serie, colors[serie.index])
                    }
                }

                // 饼图
                else if (serie.type == "pie") {
                    drawPie(painter, serie, serieOption[index])
                }

            })
        }
    }
}