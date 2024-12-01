import MapType from "vislite/types/Map"
import CanvasType from "vislite/types/Canvas"

export interface FeatureType<T> {
    (map: MapType, feature: any, cx: number, cy: number): T
}

export default function (painter: CanvasType, type: string): FeatureType<void>