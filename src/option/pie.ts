import type CanvasType from "vislite/types/Canvas"

import rotate from "vislite/src/rotate"

export function drawPie(painter: CanvasType, serie: any, option: any) {
    let colors = option.getColors(serie.arcs.length)
    for (let i = 0; i < serie.arcs.length; i++) {
        let arc = serie.arcs[i]

        painter.config({
            fillStyle: colors[i]
        }).fillArc(arc.cx, arc.cy, arc.radius[0], arc.radius[1], arc.beginDeg, arc.deg)

        let deg = arc.beginDeg + arc.deg * 0.5, radius = Math.max(arc.radius[0], arc.radius[1])
        let p1 = rotate(arc.cx, arc.cy, deg, arc.cx + radius, arc.cy)
        let p2 = rotate(arc.cx, arc.cy, deg, arc.cx + radius + 15, arc.cy)

        let flag = p1[0] > arc.cx ? 1 : -1

        painter.config({
            strokeStyle: colors[i],
            lineWidth: 1.5
        }).beginPath().moveTo(...p1).lineTo(...p2).lineTo(p2[0] + flag * 15, p2[1]).stroke()

        painter.config({
            fillStyle: "#929292",
            textAlign: p1[0] > arc.cx ? "left" : "right",
            fontSize: 12,
            fontWeight: 400
        }).fillText(option.data[i].name, p2[0] + flag * 20, p2[1])

    }

}