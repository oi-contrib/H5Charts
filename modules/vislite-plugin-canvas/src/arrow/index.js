import { move, rotate } from "../tool";

export default function (painter) {
    return function (begin, end) {

        // 主线
        painter.beginPath().moveTo(begin[0], begin[1]).lineTo(end[0], end[1]).stroke();

        // 两条侧线

        var deg = 0.5, len = 13;

        var dot = move(begin[0] - end[0], begin[1] - end[1], len, end[0], end[1]);

        var leftDot = rotate(end[0], end[1], deg, dot[0], dot[1]);
        var rightDot = rotate(end[0], end[1], -deg, dot[0], dot[1]);

        painter.beginPath().moveTo(leftDot[0], leftDot[1]).stroke().lineTo(end[0], end[1]).lineTo(rightDot[0], rightDot[1]).stroke();
    };
};