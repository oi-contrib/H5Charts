export default function (x, y, width, height, values, labels, label) {
    var xTexts = [], yTexts = [], xMasks = [], yMasks = [], i, tx, ty, gapw;

    if (label == "x") {

        // x轴

        gapw = width / labels.length;

        for (i = 0; i < labels.length; i++) {
            xTexts.push({
                x: gapw * (i + 0.5) + x,
                y: y,
                content: labels[i]
            });
        }

        for (i = 0; i < labels.length + 1; i++) {
            xMasks.push({
                x: gapw * i + x,
                y: y
            });
        }

        // y轴

        gapw = -1 * height / (values.length - 1);

        for (i = 0; i < values.length; i++) {
            ty = y + gapw * i;

            yTexts.push({
                x: x,
                y: ty,
                content: values[i]
            });

            yMasks.push({
                x: x,
                y: ty
            });
        }

    } else {

        // x轴

        gapw = width / (values.length - 1);

        for (i = 0; i < values.length; i++) {
            tx = x + gapw * i;

            xTexts.push({
                x: tx,
                y: y,
                content: values[i]
            });

            xMasks.push({
                x: tx,
                y: y
            });
        }

        // y轴

        gapw = -1 * height / labels.length;

        for (i = 0; i < labels.length; i++) {
            yTexts.push({
                x: x,
                y: gapw * (i + 0.5) + y,
                content: labels[i]
            });
        }

        for (i = 0; i < labels.length + 1; i++) {
            yMasks.push({
                x: x,
                y: gapw * i + y
            });
        }
    }

    return {
        label: label,
        xAxis: {
            texts: xTexts,
            masks: xMasks,
            begin: {
                x: x,
                y: y
            },
            end: {
                x: x + width,
                y: y
            }
        },
        yAxis: {
            texts: yTexts,
            masks: yMasks,
            begin: {
                x: x,
                y: y
            },
            end: {
                x: x,
                y: y - height
            }
        }
    };
}