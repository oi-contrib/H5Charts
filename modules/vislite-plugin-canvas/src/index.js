import feature from "./feature/index";
import arrow from "./arrow/index";

function CanvasJs(painter) {
    this.painter = painter;
}

// 地图块
CanvasJs.prototype.fillFeature = function () {
    feature(this.painter, "fill").apply(null, arguments);
    return this;
};
CanvasJs.prototype.strokeFeature = function () {
    feature(this.painter, "stroke").apply(null, arguments);
    return this;
};
CanvasJs.prototype.fullFeature = function () {
    feature(this.painter, "full").apply(null, arguments);
    return this;
};

// 箭头
CanvasJs.prototype.arrow = function () {
    arrow(this.painter).apply(null, arguments);
    return this;
};

export default CanvasJs;