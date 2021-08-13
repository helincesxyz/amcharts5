import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const root = am5.Root.new("chartdiv");

root.setThemes([
  am5themes_Animated.new(root)
]);

const chart = root.container.children.push(am5xy.XYChart.new(root, { panX: false, panY: false, wheelX: "panX", wheelY: "zoomX" }));
const cursor = chart.set("cursor", am5xy.XYCursor.new(root, { behavior: "zoomX" }));
cursor.lineY.set("visible", false);

let date = new Date();
date.setHours(0, 0, 0, 0);
let value = 100;

function generateData() {
  value = Math.round((Math.random() * 10 - 5) + value);
  am5.time.add(date, "day", 1);
  return { date: date.getTime(), value: value };
}

function generateDatas(count: number) {
  const data = [];
  for (let i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}

const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, { maxDeviation: 0, baseInterval: { timeUnit: "day", count: 1 }, renderer: am5xy.AxisRendererX.new(root, {}) }));
const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { renderer: am5xy.AxisRendererY.new(root, {}) }));

xAxis.set("tooltip", am5.Tooltip.new(root, { themeTags: ["axis"], animationDuration: 200 }))

const series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, { name: "Series", xAxis: xAxis, yAxis: yAxis, valueYField: "value", valueXField: "date" }));
series.fills.template.setAll({visible:true, fillOpacity:0.2})
series.bullets.push(() => {
  return am5.Bullet.new(root, {locationY:0, sprite: am5.Circle.new(root, { radius: 4, stroke:root.interfaceColors.get("background"), strokeWidth:2, fill: series.get("fill") }) })
})

const tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
tooltip.label.set("text", "{valueY}");

chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));

let data = generateDatas(50);
series.data.setAll(data);

series.appear();
chart.appear();