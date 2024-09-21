import render from "./render";

var maps = {}; // 注册的地图数据
var VISLite = null;

function Chart(option) {

    this._option = {
        grid: {
            left: 50,
            right: 50,
            top: 50,
            bottom: 50
        },

        // 直角坐标系
        xAxis: {
            type: "category"
        },
        yAxis: {
            type: "value"
        },

        // 极坐标系
        radiusAxis: {
            type: "value"
        },
        angleAxis: {
            type: "category"
        },

        series: []
    };
    this._hasTask = false;
    this.$render = render();

    if (option) this.setOption(option);
}

Chart.registerMap = function (mapName, mapData) {
    maps[mapName] = {
        data: mapData,
        mll: null
    };
    return Chart;
};

Chart.install = function (_VISLite) {
    VISLite = _VISLite;
    return Chart;
};

Chart.prototype.setOption = function (option) {
    var _this = this;

    VISLite.mergeOption(this._option, option);

    if (this._option.update) {

        if (!this._hasTask) {
            this._hasTask = true;

            setTimeout(function () {
                _this.$render(VISLite, _this._option, maps);
                _this._hasTask = false;
            }, 0)

        }

    }
};

export default Chart;