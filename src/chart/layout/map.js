export default function (VISLite, width, height, minLongitude, maxLongitude, minLatitude, maxLatitude) {
    if (minLongitude) {
        var xScale = width * 0.72 / (maxLongitude - minLongitude);
        var yScale = height * 0.575 / (maxLatitude - minLatitude);

        return new VISLite.Mercator(xScale < yScale ? xScale : yScale, [
            (minLongitude + maxLongitude) * 0.5,
            (minLatitude + maxLatitude) * 0.5
        ]);
    } else {
        return null;
    }
}