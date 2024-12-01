export default function (painter, type) {
    return function (map, feature, cx, cy) {
        var drawPolygon = function (coordinates) {
            for (var j = 0; j < coordinates.length; j++) {
                painter.beginPath();
                for (var k = 0; k < coordinates[j].length; k++) {
                    var dxy = map.use(coordinates[j][k][0], coordinates[j][k][1]);
                    painter.lineTo(dxy[0] + cx, dxy[1] + cy);
                }
                painter[type]();
            }
        }

        if (feature.geometry.type == "Polygon") {
            drawPolygon(feature.geometry.coordinates);
        } else if (feature.geometry.type == "MultiPolygon") {
            for (var i = 0; i < feature.geometry.coordinates.length; i++) {
                drawPolygon(feature.geometry.coordinates[i]);
            }
        } else {
            //    todo
        }

    }
};