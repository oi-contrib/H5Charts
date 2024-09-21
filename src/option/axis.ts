import type CanvasType from "vislite/types/Canvas"

import move from "vislite/package/move/index"

export function initAxis(axis1: any, axis2: any) {
    if (axis1 && axis2) {
        if (!axis1.data) {
            return [{
                type: "value"
            }, {
                type: "category",
                data: axis2.data
            }]
        } else if (!axis2.data) {
            return [{
                type: "category",
                data: axis1.data
            }, {
                type: "value"
            }] 
        }
    } else if (axis1) {
        if (axis1.data) {
            return [{
                type: "category",
                data: axis1.data
            }, {
                type: "value"
            }];
        }
    } else if (axis2) {
        if (axis2.data) {
            return [{
                type: "value"
            }, {
                type: "category",
                data: axis2.data
            }];
        }
    }

    return [axis1, axis2]
}

export function drawXAxis(painter: CanvasType, axis: any, endY: number) {
    painter.config({
        fillStyle: "#000000",
        strokeStyle: "#aeaeae",
        fontSize: 12
    })

    for (let i = 0; i < axis.texts.length; i++) {
        let text = axis.texts[i]
        painter.config({
            textAlign: "center",
            textBaseline: "top"
        }).fillText(text.content, text.x, text.y + 10)
    }

    if (endY == -1) {
        painter.beginPath()
            .moveTo(axis.begin.x, axis.begin.y)
            .lineTo(axis.end.x, axis.end.y)
            .stroke()

        for (let i = 0; i < axis.masks.length; i++) {
            let mask = axis.masks[i]
            painter.beginPath().moveTo(mask.x, mask.y).lineTo(mask.x, mask.y + 5).stroke()
        }
    } else {
        for (let i = 1; i < axis.masks.length; i++) {
            let mask = axis.masks[i]
            painter.beginPath().moveTo(mask.x, mask.y).lineTo(mask.x, endY).stroke()
        }
    }
}

export function drawYAxis(painter: CanvasType, axis: any, endX: number) {

    painter.config({
        fillStyle: "#000000",
        strokeStyle: "#aeaeae",
        fontSize: 12
    })

    for (let i = 0; i < axis.texts.length; i++) {
        let text = axis.texts[i]
        painter.config({
            textAlign: "right",
            textBaseline: "middle"
        }).fillText(text.content, text.x - 10, text.y)
    }

    if (endX == -1) {
        painter.beginPath()
            .moveTo(axis.begin.x, axis.begin.y)
            .lineTo(axis.end.x, axis.end.y)
            .stroke()

        for (let i = 0; i < axis.masks.length; i++) {
            let mask = axis.masks[i]
            painter.beginPath().moveTo(mask.x, mask.y).lineTo(mask.x - 5, mask.y).stroke()
        }
    } else {
        for (let i = 1; i < axis.masks.length; i++) {
            let mask = axis.masks[i]
            painter.beginPath().moveTo(mask.x, mask.y).lineTo(endX, mask.y).stroke()
        }
    }
}

export function drawRadiusAxis(painter: CanvasType, axis: any, isLabel: boolean) {

    painter.config({
        fillStyle: "#000000",
        strokeStyle: "#aeaeae",
        fontSize: 12
    })

    for (let i = 0; i < axis.texts.length; i++) {
        let text = axis.texts[i]
        painter.config({
            textAlign: "right",
            textBaseline: "middle"
        }).fillText(text.content, text.x - 5, text.y)
    }

    painter.beginPath()
        .moveTo(axis.begin.x, axis.begin.y)
        .lineTo(axis.end.x, axis.end.y)
        .stroke()

    let cx = axis.cx, cy = axis.cy
    if (!isLabel) {

        for (let i = 0; i < axis.masks.length - 1; i++) {
            let mask = axis.masks[i]
            let radius = cy - mask.y

            painter.beginPath()
                .moveTo(cx + radius, cy)
                .arc(cx, cy, radius, 0, Math.PI * 2)
                .stroke()
        }
    } else {
        for (let i = 0; i < axis.masks.length; i++) {
            let mask = axis.masks[i]
            painter.beginPath().moveTo(mask.x, mask.y).lineTo(mask.x - 5, mask.y).stroke()
        }

        let mask = axis.masks[0]
        let radius = cy - mask.y

        painter.beginPath()
            .moveTo(cx + radius, cy)
            .arc(cx, cy, radius, 0, Math.PI * 2)
            .stroke()
    }
}

export function drawAngleAxis(painter: CanvasType, axis: any, isLabel: boolean) {

    painter.config({
        fillStyle: "#000000",
        strokeStyle: "#aeaeae",
        fontSize: 12,
        textAlign: "left",
        textBaseline: "middle"
    })

    for (let i = 0; i < axis.texts.length; i++) {
        let text = axis.texts[i]
        let p = move(text.x - axis.cx, text.y - axis.cy, 5, text.x, text.y)

        painter.fillText(text.content, p[0], p[1], text.deg)
    }

    painter.beginPath().moveTo(axis.cx + axis.radius, axis.cy).arc(axis.cx, axis.cy, axis.radius, 0, Math.PI * 2).stroke()

    if (!isLabel) {
        for (let i = 1; i < axis.masks.length; i++) {
            let mask = axis.masks[i]
            painter.beginPath().moveTo(mask.x, mask.y).lineTo(0.9 * (axis.cx - mask.x) + mask.x, 0.9 * (axis.cy - mask.y) + mask.y).stroke()
        }
    } else {
        for (let i = 0; i < axis.masks.length; i++) {
            let mask = axis.masks[i]
            let p = move(mask.x - axis.cx, mask.y - axis.cy, 5, mask.x, mask.y)

            painter.beginPath().moveTo(mask.x, mask.y).lineTo(p[0], p[1]).stroke()
        }
    }
}