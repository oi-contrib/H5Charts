// 点（x,y）沿着向量（ax,ay）方向移动距离d
export function move(ax, ay, d, x, y) {
    var sqrt = Math.sqrt(ax * ax + ay * ay);
    return [
        ax * d / sqrt + x,
        ay * d / sqrt + y
    ];
}

// 点（x,y）围绕中心（cx,cy）旋转deg度
export function rotate(cx, cy, deg, x, y) {
    var cos = Math.cos(deg), sin = Math.sin(deg);
    return [
        (x - cx) * cos - (y - cy) * sin + cx,
        (x - cx) * sin + (y - cy) * cos + cy
    ];
}