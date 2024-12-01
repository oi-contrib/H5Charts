import type CanvasType from "vislite/types/Canvas"
import type MapType from "vislite/types/Map"

import featureFactory from "../canvas/feature/index"

export function drawMap(painter: CanvasType, serie: any, map: MapType, cx: number, cy: number, option: any, dynamicOption: any) {
    let fullFeature = featureFactory(painter, "full")
    let geojson = serie.geojson

    let colors = option.getColors(1)

    painter.config({
        fillStyle: colors[0],
        strokeStyle: "#73909c"
    })

    let dataLink = null
    if (option.data) {
        dataLink = {}
        for (let item of option.data) {
            dataLink[item.name] = item.value
        }
    }

    for (let i = 0; i < geojson.features.length; i++) {
        let name = geojson.features[i].properties.name

        if (dataLink && dynamicOption.visualMap) {
            if (name in dataLink) {
                painter.config({
                    fillStyle: dynamicOption.visualMap(dataLink[name]),
                    lineWidth: 1,
                    strokeStyle: "#73909c"
                })
            } else {
                // todo
            }
        }

        fullFeature(map, geojson.features[i], cx, cy)
    }

    if (option.label.show) {
        for (let i = 0; i < geojson.features.length; i++) {
            let properties = geojson.features[i].properties

            let center: [number, number] = properties.centroid || properties.center || properties.cp

            if (center) {
                let name = properties.name
                let p = map.use(...center)

                painter.config({
                    fillStyle: "black",
                    fontSize: 10
                }).fillText(name, p[0] + cx, p[1] + cy)
            }
        }
    }

}