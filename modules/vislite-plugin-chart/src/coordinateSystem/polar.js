export default function (VISLite, cx, cy, radius, values, labels, label) {
    var aTexts = [], rTexts = [], aMasks = [], rMasks = [], i, deg, tp, ty, gapw;

    // 中心留白比例
    var nullLen = 0.1;

    if (label == "angle") {

        // 弧度轴

        gapw = Math.PI * 2 / labels.length;

        for (i = 0; i < labels.length; i++) {
            deg = gapw * (i + 0.5) - Math.PI * 0.5;
            tp = VISLite.rotate(cx, cy, deg, cx + radius, cy);

            aTexts.push({
                x: tp[0],
                y: tp[1],
                content: labels[i],
                deg: deg
            });
        }

        for (i = 0; i < labels.length + 1; i++) {
            deg = gapw * i - Math.PI * 0.5;
            tp = VISLite.rotate(cx, cy, deg, cx + radius, cy);

            aMasks.push({
                x: tp[0],
                y: tp[1]
            });

        }

        // 半径轴

        gapw = -1 * radius * (1 - nullLen) / (values.length - 1);

        for (i = 0; i < values.length; i++) {
            ty = cy + gapw * i - radius * nullLen;

            rTexts.push({
                x: cx,
                y: ty,
                content: values[i]
            });

            rMasks.push({
                x: cx,
                y: ty
            });
        }

    } else {

        // 弧度轴

        gapw = Math.PI * 2 / (values.length);

        for (i = 0; i < values.length; i++) {
            deg = gapw * i - Math.PI * 0.5;
            tp = VISLite.rotate(cx, cy, deg, cx + radius, cy);

            aTexts.push({
                x: tp[0],
                y: tp[1],
                content: values[i],
                deg: deg
            });

            aMasks.push({
                x: tp[0],
                y: tp[1]
            });
        }

        // 半径轴

        gapw = -1 * radius * (1 - nullLen) / labels.length;

        for (i = 0; i < labels.length; i++) {
            rTexts.push({
                x: cx,
                y: cy + (i + 0.5) * gapw - radius * nullLen,
                content: labels[i]
            });
        }

        for (i = 0; i < labels.length + 1; i++) {
            rMasks.push({
                x: cx,
                y: cy + i * gapw - radius * nullLen
            });
        }

    }

    return {
        label: label,
        angleAxis: {
            texts: aTexts,
            masks: aMasks,
            cx: cx,
            cy: cy,
            radius: radius,
            beginDeg: Math.PI * -0.5,
            deg: Math.PI * 2
        },
        radiusAxis: {
            texts: rTexts,
            masks: rMasks,
            cx: cx,
            cy: cy,
            begin: {
                x: cx,
                y: cy - radius * nullLen
            },
            end: {
                x: cx,
                y: cy - radius
            }
        }
    };
}