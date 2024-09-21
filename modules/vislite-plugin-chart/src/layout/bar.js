export default function (data, index, count, masks, view) {
    var i, rects = [], method;

    // 中心留白比例
    var nullLen = 0.1;

    var labelBegin, labelLen, valueLen;
    if (view.cs == 'polar') {
        method = "arc";
        if (view.label == "angle") {
            labelBegin = Math.PI * -0.5;
            labelLen = Math.PI * 2;
            valueLen = view.radius * (1 - nullLen);
        } else {
            labelBegin = view.radius * nullLen;
            labelLen = view.radius * (1 - nullLen);
            valueLen = Math.PI * 2;
        }
    } else if (view.cs == "cartesian2d") {
        method = "rect";
        if (view.label == "x") {
            labelBegin = view.x;
            labelLen = view.width;
            valueLen = -1 * view.height;
        } else {
            labelBegin = view.y;
            labelLen = -1 * view.height;
            valueLen = view.width;
        }
    }

    var labelWidth = labelLen / data.length; // 刻度间距离
    var gapWidth = labelWidth * (1 - 0.7) * 0.5; // 单边间隙宽
    var rectWidth = (labelWidth - gapWidth * 2) / count; // 单个柱子宽

    var helpMaskDist = 0;
    var getValueLen = function (value) {
        return (value - masks[0]) / (masks[masks.length - 1] - masks[0] + helpMaskDist) * valueLen;
    };

    var getLabelIndex = function (i) {
        return labelBegin + labelWidth * i + gapWidth + rectWidth * index;
    };

    if (view.cs == 'polar') {
        if (view.label == "angle") {
            for (i = 0; i < data.length; i++) {
                rects.push({
                    beginDeg: getLabelIndex(i),
                    deg: rectWidth,
                    radius: [nullLen * view.radius, nullLen * view.radius + getValueLen(data[i])],
                    cx: view.cx,
                    cy: view.cy,
                    value: "radius"
                });
            }
        } else {

            // 为了更美观，多补一个格子
            helpMaskDist = masks[1] - masks[0];

            for (i = 0; i < data.length; i++) {
                rects.push({
                    beginDeg: Math.PI * -0.5,
                    deg: getValueLen(data[i]),
                    radius: [getLabelIndex(i), getLabelIndex(i) + rectWidth],
                    cx: view.cx,
                    cy: view.cy,
                    value: "deg"
                });
            }
        }
    } else if (view.cs == "cartesian2d") {
        if (view.label == "x") {
            for (i = 0; i < data.length; i++) {
                rects.push({
                    x: getLabelIndex(i),
                    y: view.y,
                    width: rectWidth,
                    height: getValueLen(data[i]),
                    value: "height"
                });
            }
        } else {
            for (i = 0; i < data.length; i++) {
                rects.push({
                    x: view.x,
                    y: getLabelIndex(i),
                    width: getValueLen(data[i]),
                    height: rectWidth,
                    value: "width"
                });
            }
        }
    }

    return {
        type: "bar",
        rects: rects,
        method: method,
        index: index
    };
}