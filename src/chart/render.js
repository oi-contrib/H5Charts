import barLayout from "./layout/bar";
import pieLayout from "./layout/pie";
import mapLayout from "./layout/map";

import cartesian2d from "./coordinateSystem/cartesian2d";
import polar from "./coordinateSystem/polar";

import { mllData } from "./tool/map";

export default function () {

    return function (VISLite, option, maps) {
        var i, j, mll, serie;

        var width = option.grid.width - option.grid.left - option.grid.right;
        var height = option.grid.height - option.grid.top - option.grid.bottom;
        var cx = width * 0.5 + option.grid.left;
        var cy = height * 0.5 + option.grid.top;

        // 收集必要的基础信息

        var minLongitude = null, maxLongitude = null, minLatitude = null, maxLatitude = null; // 地图经纬度最值
        var minZValue = null, maxZValue = null; // 数值最值（直角坐标系）
        var minPValue = null, maxPValue = null; // 数值最值（极坐标系）

        // 记录柱状图一个小条目内总个数
        var cartesian2d_bar_count = 0, polar_bar_count = 0;

        for (i = 0; i < option.series.length; i++) {
            serie = option.series[i];

            if (!serie.coordinateSystem && ["custom", "map", "pie"].indexOf(serie.type) < 0) {
                serie.coordinateSystem = "cartesian2d";
            }

            // 地图
            if (serie.type == "map") {
                if (!maps[serie.map].mll) maps[serie.map].mll = mllData(maps[serie.map].data);

                mll = maps[serie.map].mll;

                if (minLongitude == void 0 || minLongitude > mll[0]) minLongitude = mll[0];
                if (maxLongitude == void 0 || maxLongitude < mll[1]) maxLongitude = mll[1];
                if (minLatitude == void 0 || minLatitude > mll[2]) minLatitude = mll[2];
                if (maxLatitude == void 0 || maxLatitude < mll[3]) maxLatitude = mll[3];
            }

            // 饼图
            else if (serie.type == "pie") {
                if (!serie.center) serie.center = [cx, cy];
                if (!serie.radius) serie.radius = [0, Math.min(width, height) * 0.5];
                if (!("beginDeg" in serie)) serie.beginDeg = -Math.PI * 0.5;
                if (!serie.deg) serie.deg = Math.PI * 2;
            }

            // 极坐标系
            else if (serie.coordinateSystem == "polar") {
                for (j = 0; j < serie.data.length; j++) {
                    if (minPValue == void 0 || minPValue > serie.data[j]) minPValue = serie.data[j];
                    if (maxPValue == void 0 || maxPValue < serie.data[j]) maxPValue = serie.data[j];
                }

                if (serie.type == "bar") polar_bar_count += 1;
            }

            // 直角坐标系
            else if (serie.coordinateSystem == "cartesian2d") {
                for (j = 0; j < serie.data.length; j++) {
                    if (minZValue == void 0 || minZValue > serie.data[j]) minZValue = serie.data[j];
                    if (maxZValue == void 0 || maxZValue < serie.data[j]) maxZValue = serie.data[j];
                }

                if (serie.type == "bar") cartesian2d_bar_count += 1;
            }

        }

        var zruler;
        if (minZValue && maxZValue) {
            zruler = VISLite.ruler(maxZValue, minZValue, 5);
        }

        var pruler;
        if (minPValue && maxPValue) {
            pruler = VISLite.ruler(maxPValue, minPValue, 5);
        }

        // 如果存在地图，计算经纬度映射算法实例
        var map = mapLayout(VISLite, width, height, minLongitude, maxLongitude, minLatitude, maxLatitude);

        // 记录柱状图一个小条目内序号
        var polar_bar_index = 0, cartesian2d_bar_index = 0;

        // 一个个图表计算
        var seriesData = [];
        for (i = 0; i < option.series.length; i++) {
            serie = option.series[i];

            // 自定义
            if (serie.type == "custom") {
                seriesData.push({
                    type: "custom"
                });
            }

            // 地图
            else if (serie.type == "map") {
                seriesData.push({
                    type: "map",
                    geojson: maps[serie.map].data
                });
            }

            // 饼图
            else if (serie.type == "pie") {
                seriesData.push(pieLayout(serie));
            }

            // 柱状图
            else if (serie.type == "bar") {

                if (serie.coordinateSystem == "polar") {
                    seriesData.push(barLayout(
                        serie.data,
                        polar_bar_index,
                        polar_bar_count,
                        pruler,
                        {
                            cs: "polar",
                            label: option.radiusAxis.type == "value" ? "angle" : "radius",
                            cx: cx,
                            cy: cy,
                            radius: Math.min(width, height) * 0.5
                        }
                    ));
                    polar_bar_index += 1;
                } else if (serie.coordinateSystem == "cartesian2d") {
                    seriesData.push(barLayout(
                        serie.data,
                        cartesian2d_bar_index,
                        cartesian2d_bar_count,
                        zruler,
                        {
                            cs: "cartesian2d",
                            label: option.yAxis.type == "value" ? "x" : "y",
                            x: option.grid.left,
                            y: option.grid.top + height,
                            width: width,
                            height: height
                        }
                    ));
                    cartesian2d_bar_index += 1;
                }

            }

        }

        option.update({
            map: map,
            cx: cx,
            cy: cy,
            grid: option.grid,
            series: seriesData,
            polar: pruler ? polar(VISLite,
                cx,
                cy,
                Math.min(width, height) * 0.5,
                pruler,
                option.radiusAxis.type == "value" ? option.angleAxis.data : option.radiusAxis.data,
                option.radiusAxis.type == "value" ? "angle" : "radius"
            ) : null,
            cartesian2d: zruler ? cartesian2d(
                option.grid.left,
                option.grid.top + height,
                width,
                height,
                zruler,
                option.xAxis.type == "value" ? option.yAxis.data : option.xAxis.data,
                option.xAxis.type == "value" ? "y" : "x"
            ) : null
        });

    }
}