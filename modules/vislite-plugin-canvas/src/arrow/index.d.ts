import CanvasType from "vislite/types/Canvas"

export interface ArrowType<T> {
    (begin: [number, number], end: [number, number]): T
}

export default function (painter: CanvasType): ArrowType<void>