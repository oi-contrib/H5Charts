import type CanvasType from "vislite/types/Canvas"

export function drawRectBar(painter: CanvasType, serie: any, color: string) {
    painter.config({
        fillStyle: color
    })

    serie.rects.forEach((rect: any) => {
        painter.fillRect(rect.x, rect.y, rect.width, rect.height)
    })
}

export function drawArcBar(painter: CanvasType, serie: any, color: string) {
    painter.config({
        fillStyle: color
    })

    serie.rects.forEach((arc: any) => {
        painter.fillArc(arc.cx, arc.cy, arc.radius[0], arc.radius[1], arc.beginDeg, arc.deg)
    })
}