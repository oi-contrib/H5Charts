const pkg = require("./package.json")

module.exports = {
    input: "./src/index.js",
    output: {
        name: 'CanvasJs',
        file: "./dist/canvas.js",
        format: "umd",
        banner: `/*!
 * @vislite/canvas v${pkg.version}
 * https://github.com/oi-contrib/VISLite/tree/master/modules/vislite-plugin-canvas
 */`
    }
}