export default function (serie) {
    var i, count = 0, arcs = [];

    for (i = 0; i < serie.data.length; i++)  count += serie.data[i];

    var beginDeg = serie.beginDeg, deg;
    for (i = 0; i < serie.data.length; i++) {
        deg = (serie.data[i] / count) * serie.deg;

        arcs.push({
            beginDeg: beginDeg,
            deg: deg,
            radius: serie.radius,
            cx: serie.center[0],
            cy: serie.center[1]
        });

        beginDeg += deg;
    }

    return {
        type: "pie",
        arcs: arcs,
        method: "arc"
    };
}