const pkg = require("./package.json")

module.exports = {
    input: "./src/index.js",
    output: {
        name: 'ChartJs',
        file: "./dist/chart.js",
        format: "umd",
        banner: `/*!
 * @vislite/chart v${pkg.version}
 * https://github.com/oi-contrib/VISLite/tree/master/modules/vislite-plugin-chart
 */`
    }
}