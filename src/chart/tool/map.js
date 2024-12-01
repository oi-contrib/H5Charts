export function mllData(geoJson) {
    var minLongitude = null, maxLongitude = null, minLatitude = null, maxLatitude = null;

    var forPolygon = function (coordinates) {
        for (var j = 0; j < coordinates.length; j++) {
            for (var k = 0; k < coordinates[j].length; k++) {
                var longitude = coordinates[j][k][0], latitude = coordinates[j][k][1];

                if (minLongitude == void 0 || minLongitude > longitude) minLongitude = longitude;
                if (maxLongitude == void 0 || maxLongitude < longitude) maxLongitude = longitude;

                if (minLatitude == void 0 || minLatitude > latitude) minLatitude = latitude;
                if (maxLatitude == void 0 || maxLatitude < latitude) maxLatitude = latitude;
            }
        }
    };

    var features = geoJson.features;
    for (var i = 0; i < features.length; i++) {
        if (features[i].geometry.type == "Polygon") {
            forPolygon(features[i].geometry.coordinates);
        } else if (features[i].geometry.type == "MultiPolygon") {
            for (var j = 0; j < features[i].geometry.coordinates.length; j++) {
                forPolygon(features[i].geometry.coordinates[j]);
            }
        }
    }

    return [minLongitude, maxLongitude, minLatitude, maxLatitude];
}