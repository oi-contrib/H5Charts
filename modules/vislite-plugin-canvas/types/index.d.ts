import CanvasType from "vislite/types/Canvas"

import { FeatureType } from "../src/feature/index"
import { ArrowType } from "../src/arrow/index"

export default class {

    constructor(painter: CanvasType)

    fillFeature: FeatureType<this>
    strokeFeature: FeatureType<this>
    fullFeature: FeatureType<this>

    arrow: ArrowType<this>
}