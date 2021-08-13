import { Theme } from "../core/Theme";
import { percent, p100, p50 } from "../core/util/Percent";
import { ColorSet } from "../core/util/ColorSet";
import { Color } from "../core/util/Color";
import * as $ease from "../core/util/Ease";
import * as $type from "../core/util/Type";
import * as $math from "../core/util/Math";
import * as $object from "../core/util/Object";
import * as $array from "../core/util/Array";
import { geoMercator } from "d3-geo";
import { GridLayout } from "../core/render/GridLayout"
import type { ITimeInterval } from "../core/util/Time";
import type { DataItem } from "../core/render/Component";
import type { IValueAxisDataItem, ValueAxis } from "../charts/xy/axes/ValueAxis";
import type { AxisRenderer } from "../charts/xy/axes/AxisRenderer";
import type { DateAxis } from "../charts/xy/axes/DateAxis";
import type { ICategoryAxisDataItem } from "../charts/xy/axes/CategoryAxis";
import type { IFlowNodesDataItem } from "../charts/flow/FlowNodes";

/**
 * @ignore
 */
export class DefaultTheme extends Theme {
	protected setupDefaultRules() {
		super.setupDefaultRules();

		const language = this._root.language;

		const ic = this._root.interfaceColors;

		const stroke = Color.fromHex(0xe5e5e5);
		const fill = Color.fromHex(0xf3f3f3);
		const primaryButton = Color.fromHex(0x6794dc);
		const primaryButtonHover = Color.fromHex(0x6771dc);
		const primaryButtonDown = Color.fromHex(0x33f2c9);
		const primaryButtonActive = Color.fromHex(0x68dc75);
		const primaryButtonText = Color.fromHex(0xFFFFFF);
		const primaryButtonStroke = Color.fromHex(0xFFFFFF);
		const secondaryButton = Color.fromHex(0xd9d9d9);
		const secondaryButtonHover = Color.fromHex(0xa3a3a3);
		const secondaryButtonDown = Color.fromHex(0x8d8d8d);
		const secondaryButtonActive = Color.fromHex(0xe6e6e6);
		const secondaryButtonText = Color.fromHex(0x000000);
		const secondaryButtonStroke = Color.fromHex(0xFFFFFF);
		const grid = Color.fromHex(0x000000);
		const background = Color.fromHex(0xffffff);
		const alternativeBackground = Color.fromHex(0x000000);
		const text = Color.fromHex(0x000000);
		const alternativeText = Color.fromHex(0xFFFFFF);
		const disabled = Color.fromHex(0xadadad);
		const positive = Color.fromHex(0x50b300);
		const negative = Color.fromHex(0xb30000);

		ic.setAll({
			stroke,
			fill,
			primaryButton,
			primaryButtonHover,
			primaryButtonDown,
			primaryButtonActive,
			primaryButtonText,
			primaryButtonStroke,
			secondaryButton,
			secondaryButtonHover,
			secondaryButtonDown,
			secondaryButtonActive,
			secondaryButtonText,
			secondaryButtonStroke,
			grid,
			background,
			alternativeBackground,
			text,
			alternativeText,
			disabled,
			positive,
			negative
		});


		const horizontalLayout = this._root.horizontalLayout;
		const verticalLayout = this._root.verticalLayout;
		const gridLayout = this._root.gridLayout;


		/**
		 * ========================================================================
		 * core
		 * ========================================================================
		 */

		this.rule("Entity").setAll({
			stateAnimationDuration: 0,
			stateAnimationEasing: $ease.out($ease.cubic)
		})

		this.rule("Component").setAll({
			interpolationDuration: 0,
			interpolationEasing: $ease.out($ease.cubic)
		})


		this.rule("Sprite").setAll({
			visible: true,
			scale: 1,
			opacity: 1,
			rotation: 0,
			position: "relative",
			tooltipX: p50,
			tooltipY: p50,
			tooltipPosition: "fixed",
			isMeasured: true
		});

		this.rule("Sprite").states.create("default", { "visible": true, opacity: 1 });

		this.rule("Container").setAll({
			interactiveChildren: true,
			setStateOnChildren: false
		});

		this.rule("Graphics").setAll({
			strokeWidth: 1
		});


		/**
		 * ------------------------------------------------------------------------
		 * core: alignment
		 * ------------------------------------------------------------------------
		 */

		this.rule("Sprite", ["horizontal", "center"]).setAll({
			centerX: p50,
			x: p50
		});

		this.rule("Sprite", ["vertical", "center"]).setAll({
			centerY: p50,
			y: p50
		});

		this.rule("Container", ["horizontal", "layout"]).setAll({
			layout: horizontalLayout
		});

		this.rule("Container", ["vertical", "layout"]).setAll({
			layout: verticalLayout
		});

		/**
		 * ------------------------------------------------------------------------
		 * core: patterns
		 * ------------------------------------------------------------------------
		 */

		this.rule("Pattern").setAll({
			repetition: "repeat",
			width: 50,
			height: 50,
			rotation: 0,
			fillOpacity: 1
		});

		this.rule("LinePattern").setAll({
			gap: 6,
			colorOpacity: 1,
			width: 49,
			height: 49
		});

		this.rule("RectanglePattern").setAll({
			gap: 6,
			checkered: false,
			centered: true,
			maxWidth: 5,
			maxHeight: 5,
			width: 48,
			height: 48,
			strokeWidth: 0
		});

		this.rule("CirclePattern").setAll({
			gap: 5,
			checkered: false,
			centered: false,
			radius: 3,
			strokeWidth: 0,
			width: 45,
			height: 45
		});

		/**
		 * ------------------------------------------------------------------------
		 * core: gradients
		 * ------------------------------------------------------------------------
		 */

		this.rule("LinearGradient").setAll({
			rotation: 90
		});


		/**
		 * ------------------------------------------------------------------------
		 * core: Legend
		 * ------------------------------------------------------------------------
		 */

		this.rule("Legend").setAll({
			fillField: "fill",
			strokeField: "stroke",
			nameField: "name",
			layout: GridLayout.new(this._root, {}),
			layer: 30
		});

		// Class: Container
		this.rule("Container", ["legend", "item"]).setAll({
			toggleKey: "disabled",
			paddingLeft: 5,
			paddingRight: 5,
			paddingBottom: 5,
			paddingTop: 5,
			layout: horizontalLayout,
			setStateOnChildren: true,
			interactiveChildren: false,
			ariaChecked: true,
			focusable: true,
			cursorOverStyle: "pointer",
			ariaLabel: language.translate("Press ENTER to toggle")
		});

		this.rule("Rectangle", ["legend", "item", "background"]).setAll({
			fillOpacity: 0,
			fill: background
		});

		this.rule("Container", ["legend", "marker"]).setAll({
			setStateOnChildren: true,
			centerY: p50,
			paddingLeft: 0,
			paddingRight: 0,
			paddingBottom: 0,
			paddingTop: 0
		});

		this.rule("RoundedRectangle", ["legend", "marker", "rectangle"]).setAll({
			width: 18,
			height: 18,
			cornerRadiusBL: 3,
			cornerRadiusTL: 3,
			cornerRadiusBR: 3,
			cornerRadiusTR: 3
		});

		this.rule("RoundedRectangle", ["legend", "marker", "rectangle"]).states.create("disabled", { fill: disabled, stroke: disabled });

		this.rule("Label", ["legend", "label"]).setAll({
			centerY: p50,
			marginLeft: 5,
			paddingRight: 0,
			paddingLeft: 0,
			paddingTop: 0,
			paddingBottom: 0,
			populateText: true
		});

		this.rule("Label", ["legend", "label"]).states.create("disabled", { fill: disabled });

		this.rule("Label", ["legend", "value", "label"]).setAll({
			centerY: p50,
			marginLeft: 5,
			paddingRight: 0,
			paddingLeft: 0,
			paddingTop: 0,
			paddingBottom: 0,
			width: 50,
			centerX: p100,
			x: p100,
			populateText: true
		});

		this.rule("Label", ["legend", "value", "label"]).states.create("disabled", { fill: disabled });



		/**
		 * ------------------------------------------------------------------------
		 * core: HeatLegend
		 * ------------------------------------------------------------------------
		 */

		this.rule("HeatLegend").setAll({
			stepCount: 1
		});

		this.rule("Container", ["heatlegend", "marker"]).setAll({
		});

		this.rule("RoundedRectangle", ["heatlegend", "marker", "background"]).setAll({
			cornerRadiusTR: 0,
			cornerRadiusBR: 0,
			cornerRadiusTL: 0,
			cornerRadiusBL: 0
		});

		this.rule("Container", ["vertical", "heatlegend", "marker"]).setAll({
			height: p100,
			width: 15
		});

		this.rule("Container", ["horizontal", "heatlegend", "marker"]).setAll({
			width: p100,
			height: 15
		});

		this.rule("HeatLegend", ["vertical"]).setAll({
			height: p100
		});

		this.rule("HeatLegend", ["horizontal"]).setAll({
			width: p100
		});

		this.rule("Label", ["heatlegend", "start"]).setAll({
			paddingLeft: 5,
			paddingRight: 5,
			paddingTop: 5,
			paddingBottom: 5
		});

		this.rule("Label", ["heatlegend", "end"]).setAll({
			paddingLeft: 5,
			paddingRight: 5,
			paddingTop: 5,
			paddingBottom: 5
		});


		/**
		 * ------------------------------------------------------------------------
		 * core: Labels
		 * ------------------------------------------------------------------------
		 */

		this.rule("Label").setAll({
			layout: horizontalLayout,
			paddingTop: 8,
			paddingBottom: 8,
			paddingLeft: 10,
			paddingRight: 10,
			fill: ic.get("text"),
			fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
			fontSize: "1em",
			populateText: false
		});

		this.rule("RadialLabel").setAll({
			textType: "regular",
			centerY: p50,
			centerX: p50,
			inside: false,
			radius: 0,
			orientation: "auto",
			textAlign: "center"
		});


		/**
		 * ------------------------------------------------------------------------
		 * core: Elements and shapes
		 * ------------------------------------------------------------------------
		 */

		this.rule("RoundedRectangle").setAll({
			cornerRadiusTL: 8,
			cornerRadiusBL: 8,
			cornerRadiusTR: 8,
			cornerRadiusBR: 8
		});

		this.rule("PointedRectangle").setAll({
			pointerBaseWidth: 15,
			pointerLength: 10,
			cornerRadius: 8
		});

		this.rule("Slice").setAll({
			shiftRadius: 0
		});

		this.rule("Tick").setAll({
			stroke: ic.get("grid"),
			strokeOpacity: .15,
			isMeasured: false,
			length: 5,
			position: "absolute"
		});

		this.rule("Bullet").setAll({
			locationX: 0.5,
			locationY: 0.5
		});


		/**
		 * ------------------------------------------------------------------------
		 * core: Tooltip
		 * ------------------------------------------------------------------------
		 */

		this.rule("Tooltip").setAll({
			position: "absolute",
			getFillFromSprite: true,
			getStrokeFromSprite: false,
			autoTextColor: true,
			paddingTop: 9,
			paddingBottom: 8,
			paddingLeft: 10,
			paddingRight: 10,
			marginBottom: 5,
			pointerOrientation: "vertical",
			centerX: p50,
			centerY: p50,
			animationEasing: $ease.out($ease.cubic)
			//layer: 100
		});

		this.rule("PointedRectangle", ["tooltip", "background"]).setAll({
			stroke: background,
			strokeOpacity: 0.9,
			cornerRadius: 4,
			pointerLength: 4,
			pointerBaseWidth: 8,
			fillOpacity: 0.9
		});

		this.rule("Label", ["tooltip"]).setAll({
			role: "tooltip",
			populateText: true,
			fill: alternativeText,
			paddingRight: 0,
			paddingTop: 0,
			paddingLeft: 0,
			paddingBottom: 0
		});


		/**
		 * ------------------------------------------------------------------------
		 * core: Button
		 * ------------------------------------------------------------------------
		 */

		this.rule("Button").setAll({
			paddingTop: 8,
			paddingBottom: 8,
			paddingLeft: 10,
			paddingRight: 10,
			interactive: true,
			layout: horizontalLayout,
			interactiveChildren: false,
			setStateOnChildren: true,
			focusable: true
		});

		this.rule("Button").states.create("hover", {});
		this.rule("Button").states.create("down", { stateAnimationDuration: 0 });
		this.rule("Button").states.create("active", {});

		this.rule("RoundedRectangle", ["button", "background"]).setAll({
			fill: primaryButton,
			stroke: primaryButtonStroke
		});
		this.rule("RoundedRectangle", ["button", "background"]).states.create("hover", { fill: primaryButtonHover });
		this.rule("RoundedRectangle", ["button", "background"]).states.create("down", { fill: primaryButtonDown, stateAnimationDuration: 0 });
		this.rule("RoundedRectangle", ["button", "background"]).states.create("active", { fill: primaryButtonActive });

		this.rule("Graphics", ["button", "icon"]).setAll({
			stroke: primaryButtonText
		});

		this.rule("Label", ["button"]).setAll({
			fill: primaryButtonText
		});


		/**
		 * ------------------------------------------------------------------------
		 * core: ResizeButton
		 * ------------------------------------------------------------------------
		 */

		this.rule("Button", ["resize"]).setAll({
			paddingTop: 9,
			paddingBottom: 9,
			paddingLeft: 13,
			paddingRight: 13,
			draggable: true,
			centerX: p50,
			centerY: p50,
			position: "absolute",
			role: "slider",
			ariaLabel: language.translate("Use up and down arrows to move selection")
		});

		this.rule("RoundedRectangle", ["background", "resize", "button"]).setAll({
			fill: secondaryButton,
			cornerRadiusBL: 40,
			cornerRadiusBR: 40,
			cornerRadiusTL: 40,
			cornerRadiusTR: 40
		});

		this.rule("Graphics", ["background", "resize", "button"]).states.create("hover", { fill: secondaryButtonHover });
		this.rule("Graphics", ["background", "resize", "button"]).states.create("down", { fill: secondaryButtonDown, stateAnimationDuration: 0 });

		this.rule("Graphics", ["resize", "button", "icon"]).setAll({
			stroke: secondaryButtonText,
			strokeOpacity: 0.7,
			draw: (display: any) => {
				display.moveTo(0, 0);
				display.lineTo(0, 12);
				display.moveTo(4, 0);
				display.lineTo(4, 12);
			}
		});

		this.rule("Button", ["resize", "vertical"]).setAll({
			rotation: 90,
			cursorOverStyle: "ns-resize"
		});

		this.rule("Button", ["resize", "horizontal"]).setAll({
			cursorOverStyle: "ew-resize"
		});



		/**
		 * ------------------------------------------------------------------------
		 * core: PlayButton
		 * ------------------------------------------------------------------------
		 */

		this.rule("Button", ["play"]).setAll({
			paddingTop: 13,
			paddingBottom: 13,
			paddingLeft: 14,
			paddingRight: 14,
			ariaLabel: language.translate("Play"),
			toggleKey: "active"
		});

		this.rule("RoundedRectangle", ["play", "background"]).setAll({
			fill: primaryButton,
			strokeOpacity: 0.5,
			cornerRadiusBL: 100,
			cornerRadiusBR: 100,
			cornerRadiusTL: 100,
			cornerRadiusTR: 100
		});

		this.rule("Graphics", ["play", "icon"]).setAll({
			fill: primaryButtonText,
			stateAnimationDuration: 0,
			dx: 1,
			draw: (display: any) => {
				display.moveTo(0, -5);
				display.lineTo(8, 0);
				display.lineTo(0, 5);
				display.lineTo(0, -5);
			}
		});

		this.rule("Graphics", ["play", "icon"]).states.create("default", {
			stateAnimationDuration: 0
		})

		this.rule("Graphics", ["play", "icon"]).states.create("active", {
			stateAnimationDuration: 0,
			draw: (display: any) => {
				display.moveTo(-4, -5);
				display.lineTo(-1, -5);
				display.lineTo(-1, 5);
				display.lineTo(-4, 5);
				display.lineTo(-4, -5);

				display.moveTo(4, -5);
				display.lineTo(1, -5);
				display.lineTo(1, 5);
				display.lineTo(4, 5);
				display.lineTo(4, -5);
			}
		})


		/**
		 * ------------------------------------------------------------------------
		 * core: SwitchButton
		 * ------------------------------------------------------------------------
		 */

		this.rule("Button", ["switch"]).setAll({
			paddingTop: 4,
			paddingBottom: 4,
			paddingLeft: 4,
			paddingRight: 4,
			ariaLabel: language.translate("Press ENTER to toggle"),
			toggleKey: "active",
			width: 40,
			height: 24
		});

		this.rule("RoundedRectangle", ["switch", "background"]).setAll({
			fill: primaryButton,
			strokeOpacity: 0.5,
			cornerRadiusBL: 100,
			cornerRadiusBR: 100,
			cornerRadiusTL: 100,
			cornerRadiusTR: 100
		});

		this.rule("Circle", ["switch", "icon"]).setAll({
			fill: primaryButtonText,
			radius: 8,
			centerY: 0,
			centerX: 0,
			dx: 0
		});

		this.rule("Graphics", ["switch", "icon"]).states.create("active", {
			dx: 16
		});


		/**
		 * ------------------------------------------------------------------------
		 * core: Scrollbar
		 * ------------------------------------------------------------------------
		 */

		this.rule("Scrollbar").setAll({
			start: 0,
			end: 1,
			layer: 5
		});

		this.rule("Scrollbar", ["vertical"]).setAll({
			marginRight: 13,
			marginLeft: 13,
			minWidth: 12,
			height: p100
		});

		this.rule("Scrollbar", ["horizontal"]).setAll({
			marginTop: 13,
			marginBottom: 13,
			minHeight: 12,
			width: p100
		});

		this.rule("RoundedRectangle", ["scrollbar", "background"]).setAll({
			cornerRadiusTL: 8,
			cornerRadiusBL: 8,
			cornerRadiusTR: 8,
			cornerRadiusBR: 8,
			fillOpacity: 0.8,
			fill: fill
		});

		this.rule("RoundedRectangle", ["scrollbar", "thumb"]).setAll({
			role: "slider",
			ariaLive: "polite",
			position: "absolute",
			fill: secondaryButton,
			draggable: true
		});
		this.rule("RoundedRectangle", ["scrollbar", "thumb"]).states.create("hover", { fill: secondaryButtonHover });
		this.rule("RoundedRectangle", ["scrollbar", "thumb"]).states.create("down", { fill: secondaryButtonDown, stateAnimationDuration: 0 });

		this.rule("RoundedRectangle", ["scrollbar", "thumb", "vertical"]).setAll({
			x: p50,
			width: p100,
			centerX: p50,
			ariaLabel: language.translate("Use up and down arrows to move selection")
		});

		this.rule("RoundedRectangle", ["scrollbar", "thumb", "horizontal"]).setAll({
			y: p50,
			centerY: p50,
			height: p100,
			ariaLabel: language.translate("Use left and right arrows to move selection")
		});

		// @todo: is this needed? used to be "ContentScrollbar"
		// this.rule("Scrollbar", ["content?"]).setAll({
		// 	marginRight: 0,
		// 	marginLeft: 5,
		// 	layer: 5
		// });


		/**
		 * ========================================================================
		 * charts/xy
		 * ========================================================================
		 */

		this.rule("XYChart").setAll({
			colors: ColorSet.new(this._root, {}),
			paddingLeft: 20,
			paddingRight: 20,
			paddingTop: 15,
			paddingBottom: 15,
			panX: false,
			panY: false,
			wheelStep: 0.25
		});

		/**
		 * ------------------------------------------------------------------------
		 * charts/xy: ZoomOutButton
		 * ------------------------------------------------------------------------
		 */

		this.rule("Button", ["zoom"]).setAll({
			paddingTop: 18,
			paddingBottom: 18,
			paddingLeft: 12,
			paddingRight: 12,
			draggable: true,
			centerX: 46,
			centerY: -10,
			y: 0,
			x: p100,
			role: "button",
			ariaLabel: language.translate("Zoom Out"),
			layer: 40
		});

		this.rule("RoundedRectangle", ["background", "button", "zoom"]).setAll({
			fill: primaryButton,
			cornerRadiusBL: 40,
			cornerRadiusBR: 40,
			cornerRadiusTL: 40,
			cornerRadiusTR: 40
		});

		this.rule("RoundedRectangle", ["background", "button", "zoom"]).states.create("hover", { fill: primaryButtonHover });
		this.rule("RoundedRectangle", ["background", "button", "zoom"]).states.create("down", { fill: primaryButtonDown, stateAnimationDuration: 0 });

		this.rule("Graphics", ["icon", "button", "zoom"]).setAll({
			stroke: primaryButtonText,
			strokeOpacity: 0.7,
			draw: (display: any) => {
				display.moveTo(0, 0);
				display.lineTo(12, 0);
			}
		});


		/**
		 * ------------------------------------------------------------------------
		 * charts/xy: XYChartScrollbar
		 * ------------------------------------------------------------------------
		 */

		this.rule("XYChart", ["scrollbar", "chart"]).setAll({
			paddingBottom: 0,
			paddingLeft: 0,
			paddingTop: 0,
			paddingRight: 0,
			colors: ColorSet.new(this._root, {
				saturation: 0
			})
		});

		this.rule("Graphics", ["scrollbar", "overlay"]).setAll({
			fillOpacity: 0.5,
			fill: background
		});

		// Class: RoundedRectangle
		this.rule("RoundedRectangle", ["xy", "scrollbar", "thumb"]).setAll({
			cornerRadiusTR: 0,
			cornerRadiusTL: 0,
			cornerRadiusBR: 0,
			cornerRadiusBL: 0,
			fillOpacity: 0,
			focusable: true
		});

		this.rule("RoundedRectangle", ["xy", "scrollbar", "thumb"]).states.create("hover", { fillOpacity: 0.4 });

		this.rule("RoundedRectangle", ["xy", "scrollbar", "chart", "background"]).setAll({
			cornerRadiusTL: 0,
			cornerRadiusBL: 0,
			cornerRadiusTR: 0,
			cornerRadiusBR: 0
		});

		this.rule("AxisRendererX", ["xy", "chart", "scrollbar"]).setAll({
			strokeOpacity: 0,
			inside: true
		});

		this.rule("AxisRendererY", ["xy", "chart", "scrollbar"]).setAll({
			strokeOpacity: 0,
			inside: true,
			minGridDistance: 5
		});

		this.rule("AxisLabel", ["xy", "scrollbar", "x"]).setAll({
			opacity: 0.5,
			centerY: p100,
			minPosition: 0.01,
			maxPosition: 0.99,
			fontSize: "0.8em"
		});

		this.rule("AxisLabel", ["xy", "scrollbar", "y"]).setAll({
			visible: false
		});

		// Class: Grid
		this.rule("Grid", ["xy", "scrollbar", "y"]).setAll({
			visible: false
		});

		// Class: Grid
		this.rule("Grid", ["xy", "scrollbar", "x"]).setAll({
			opacity: 0.5
		});


		/**
		 * ------------------------------------------------------------------------
		 * charts/xy: Cursor
		 * ------------------------------------------------------------------------
		 */

		this.rule("XYCursor").setAll({
			behavior: "none",
			layer: 20
		});

		this.rule("Grid", ["cursor", "x"]).setAll({
			strokeOpacity: 0.8,
			stroke: alternativeBackground,
			strokeDasharray: [2, 2]
		});

		this.rule("Grid", ["cursor", "y"]).setAll({
			strokeOpacity: 0.8,
			stroke: alternativeBackground,
			strokeDasharray: [2, 2]
		});

		this.rule("Graphics", ["cursor", "selection"]).setAll({
			fillOpacity: 0.15,
			fill: alternativeBackground
		});


		/**
		 * ------------------------------------------------------------------------
		 * charts/xy: Axes
		 * ------------------------------------------------------------------------
		 */

		this.rule("Axis").setAll({
			start: 0,
			end: 1,
			minZoomCount: 1,
			maxZoomCount: Infinity,
			maxZoomFactor: 1000,
			maxDeviation: 0.1,
			snapTooltip: true,
			tooltipLocation: 0.5,
			panX: true,
			panY: true,
			zoomX: true,
			zoomY: true,
			fixAxisSize: true
		});

		this.rule("AxisLabel").setAll({
			location: 0.5,
			multiLocation: 0,
			centerX: p50,
			centerY: p50,
			paddingTop: 3,
			paddingBottom: 3,
			paddingLeft: 5,
			paddingRight: 5
		});

		this.rule("AxisLabel", ["y"]).setAll({
			textAlign: "right"
		});

		this.rule("AxisLabel", ["y", "opposite"]).setAll({
			textAlign: "left"
		});

		this.rule("Container", ["axis", "header"]).setAll({
			layer: 30
		});

		this.rule("AxisRenderer").setAll({
			stroke: grid,
			strokeOpacity: 0
		});

		this.rule("AxisRendererX").setAll({
			minGridDistance: 120,
			opposite: false,
			inversed: false,
			cellStartLocation: 0,
			cellEndLocation: 1
		});

		this.rule("AxisRendererY").setAll({
			minGridDistance: 40,
			opposite: false,
			inversed: false,
			cellStartLocation: 0,
			cellEndLocation: 1
		});

		this.rule("Grid").setAll({
			location: 0,
			strokeOpacity: 0.15,
			stroke: grid
		});

		this.rule("Grid", ["base"]).setAll({
			strokeOpacity: 0.3
		});

		this.rule("Graphics", ["axis", "fill"]).setAll({
			visible: false,
			isMeasured: false,
			position: "absolute",
			fillOpacity: 0.05,
			fill: alternativeBackground
		});

		this.rule("PointedRectangle", ["axis", "tooltip", "background"]).setAll({
			cornerRadius: 0,
			fill: alternativeBackground
		});

		this.rule("Label", ["axis", "tooltip"]).setAll({
			role: undefined
		});

		this.rule("AxisTick").setAll({
			location: 0.5,
			multiLocation: 0,
			stroke: grid,
			strokeOpacity: 1,
			isMeasured: false,
			position: "absolute",
			visible: false
		});

		this.rule("CategoryAxis").setAll({
			startLocation: 0,
			endLocation: 1,
			fillRule: (dataItem: DataItem<ICategoryAxisDataItem>, index?: number) => {
				const axisFill = dataItem.get("axisFill");
				if (axisFill) {
					if (!$type.isNumber(index) || index % 2 == 0) {
						axisFill.setPrivate("visible", true);
					}
					else {
						axisFill.setPrivate("visible", false);
					}
				}
			}
		});

		const gridIntervals: Array<ITimeInterval> = [
			{ timeUnit: "millisecond", count: 1 },
			{ timeUnit: "millisecond", count: 5 },
			{ timeUnit: "millisecond", count: 10 },
			{ timeUnit: "millisecond", count: 50 },
			{ timeUnit: "millisecond", count: 100 },
			{ timeUnit: "millisecond", count: 500 },
			{ timeUnit: "second", count: 1 },
			{ timeUnit: "second", count: 5 },
			{ timeUnit: "second", count: 10 },
			{ timeUnit: "second", count: 30 },
			{ timeUnit: "minute", count: 1 },
			{ timeUnit: "minute", count: 5 },
			{ timeUnit: "minute", count: 10 },
			{ timeUnit: "minute", count: 15 },
			{ timeUnit: "minute", count: 30 },
			{ timeUnit: "hour", count: 1 },
			{ timeUnit: "hour", count: 3 },
			{ timeUnit: "hour", count: 6 },
			{ timeUnit: "hour", count: 12 },
			{ timeUnit: "day", count: 1 },
			{ timeUnit: "day", count: 2 },
			{ timeUnit: "day", count: 3 },
			{ timeUnit: "day", count: 4 },
			{ timeUnit: "day", count: 5 },
			{ timeUnit: "week", count: 1 },
			{ timeUnit: "month", count: 1 },
			{ timeUnit: "month", count: 2 },
			{ timeUnit: "month", count: 3 },
			{ timeUnit: "month", count: 6 },
			{ timeUnit: "year", count: 1 },
			{ timeUnit: "year", count: 2 },
			{ timeUnit: "year", count: 5 },
			{ timeUnit: "year", count: 10 },
			{ timeUnit: "year", count: 50 },
			{ timeUnit: "year", count: 100 },
			{ timeUnit: "year", count: 200 },
			{ timeUnit: "year", count: 500 },
			{ timeUnit: "year", count: 1000 },
			{ timeUnit: "year", count: 2000 },
			{ timeUnit: "year", count: 5000 },
			{ timeUnit: "year", count: 10000 },
			{ timeUnit: "year", count: 100000 }
		];

		const dateFormats = {
			"millisecond": language.translate("_date_millisecond"),
			"second": language.translate("_date_second"),
			"minute": language.translate("_date_minute"),
			"hour": language.translate("_date_hour"),
			"day": language.translate("_date_day"),
			"week": language.translate("_date_day"),
			"month": language.translate("_date_month"),
			"year": language.translate("_date_year"),
		};

		const periodChangeDateFormats = {
			"millisecond": language.translate("_date_millisecond"),
			"second": language.translate("_date_second"),
			"minute": language.translate("_date_minute"),
			"hour": language.translate("_date_day"),
			"day": language.translate("_date_day"),
			"week": language.translate("_date_day"),
			"month": language.translate("_date_month") + " " + language.translate("_date_year"),
			"year": language.translate("_date_year")
		};

		this.rule("CategoryDateAxis").setAll({
			markUnitChange: true,
			gridIntervals: $array.copy(gridIntervals),
			dateFormats: $object.copy(dateFormats),
			periodChangeDateFormats: $object.copy(periodChangeDateFormats)
		});

		this.rule("DateAxis").setAll({

			strictMinMax: true,
			startLocation: 0,
			endLocation: 1,
			markUnitChange: true,
			groupData: false,
			groupCount: 500,
			gridIntervals: $array.copy(gridIntervals),
			dateFormats: $object.copy(dateFormats),
			periodChangeDateFormats: $object.copy(periodChangeDateFormats),

			groupIntervals: [
				{ timeUnit: "millisecond", count: 1 },
				{ timeUnit: "millisecond", count: 10 },
				{ timeUnit: "millisecond", count: 100 },
				{ timeUnit: "second", count: 1 },
				{ timeUnit: "second", count: 10 },
				{ timeUnit: "minute", count: 1 },
				{ timeUnit: "minute", count: 10 },
				{ timeUnit: "hour", count: 1 },
				{ timeUnit: "day", count: 1 },
				{ timeUnit: "week", count: 1 },
				{ timeUnit: "month", count: 1 },
				{ timeUnit: "year", count: 1 }
			],

			fillRule: (dataItem: DataItem<IValueAxisDataItem>) => {
				const axisFill = dataItem.get("axisFill");
				if (axisFill) {
					const axis = <DateAxis<AxisRenderer>>dataItem.component;
					const value = dataItem.get("value");
					const step = axis.getPrivate("step");
					const min = axis.getPrivate("min", 0);
					const intervalDuration = axis.intervalDuration();

					if ($type.isNumber(value) && $type.isNumber(step)) {
						if (Math.round((value - min) / intervalDuration) / 2 == Math.round(Math.round((value - min) / intervalDuration) / 2)) {
							axisFill.setPrivate("visible", true);
						}
						else {
							axisFill.setPrivate("visible", false);
						}
					}
				}
			}
		});


		this.rule("ValueAxis").setAll({

			baseValue: 0,
			logarithmic: false,
			extraMin: 0,
			extraMax: 0,
			strictMinMax: false,

			fillRule: (dataItem: DataItem<IValueAxisDataItem>) => {
				const axisFill = dataItem.get("axisFill");
				if (axisFill) {
					const axis = <ValueAxis<AxisRenderer>>dataItem.component;
					const value = dataItem.get("value");
					const step = axis.getPrivate("step");

					if ($type.isNumber(value) && $type.isNumber(step)) {
						if ($math.round(value / step / 2, 5) == Math.round(value / step / 2)) {
							axisFill.setPrivate("visible", false);
						}
						else {
							axisFill.setPrivate("visible", true);
						}
					}
				}
			}
		});


		/**
		 * ------------------------------------------------------------------------
		 * charts/xy: Series
		 * ------------------------------------------------------------------------
		 */

		this.rule("Series").setAll({
			"maxFocusItems": 100
		});

		this.rule("XYSeries").setAll({
			stackToNegative: true,

			locationX: 0.5,
			locationY: 0.5,

			snapTooltip: false,

			openValueXGrouped: "open",
			openValueYGrouped: "open",
			valueXGrouped: "close",
			valueYGrouped: "close"
		});

		this.rule("ColumnSeries").setAll({
			clustered: true
		});

		this.rule("RoundedRectangle", ["series", "column"]).setAll({
			position: "absolute",
			isMeasured: false,
			width: percent(70),
			height: percent(70),
			strokeWidth: 1,
			strokeOpacity: 1,
			cornerRadiusBL: 0,
			cornerRadiusTL: 0,
			cornerRadiusBR: 0,
			cornerRadiusTR: 0,
			fillOpacity: 1,
			role: "figure"
		});

		this.rule("LineSeries").setAll({
			connect: true,
			autoGapCount: 1.1,
			stackToNegative: false
		});

		this.rule("Graphics", ["series", "stroke"]).setAll({
			position: "absolute",
			strokeWidth: 1,
			strokeOpacity: 1,
			isMeasured: false
		});

		this.rule("Graphics", ["series", "fill"]).setAll({
			visible: false,
			fillOpacity: 0.2,
			position: "absolute",
			strokeWidth: 0,
			strokeOpacity: 0,
			isMeasured: false
		});

		this.rule("Graphics", ["line", "series", "legend", "marker", "stroke"]).setAll({
			draw: (display: any, sprite: any) => {
				const parent = sprite.parent;
				if (parent) {
					const h = parent.height();
					const w = parent.width();
					display.moveTo(0, h / 2);
					display.lineTo(w, h / 2);
				}
			}
		});

		this.rule("Graphics", ["line", "series", "legend", "marker", "stroke"]).states.create("disabled", { stroke: disabled });

		this.rule("Graphics", ["line", "series", "legend", "marker", "fill"]).setAll({
			draw: (display: any, sprite: any) => {
				const parent = sprite.parent;
				if (parent) {
					const h = parent.height();
					const w = parent.width();
					display.moveTo(0, 0);
					display.lineTo(w, 0);
					display.lineTo(w, h);
					display.lineTo(0, h);
					display.lineTo(0, 0);
				}
			}
		});

		this.rule("Graphics", ["line", "series", "legend", "marker", "fill"]).states.create("disabled", { stroke: disabled });

		this.rule("SmoothedXYLineSeries").setAll({
			tension: 0.5
		});

		this.rule("SmoothedXLineSeries").setAll({
			tension: 0.5
		});

		this.rule("SmoothedYLineSeries").setAll({
			tension: 0.5
		});

		this.rule("Candlestick").setAll({
			position: "absolute",
			isMeasured: false,
			width: percent(50),
			height: percent(50),
			strokeWidth: 1,
			strokeOpacity: 1,
			cornerRadiusBL: 0,
			cornerRadiusTL: 0,
			cornerRadiusBR: 0,
			cornerRadiusTR: 0,
			fillOpacity: 1,
			role: "figure"
		});

		this.rule("OHLC").setAll({
			width: percent(80),
			height: percent(80)
		});

		this.rule("CandlestickSeries").setAll({
			lowValueXGrouped: "low",
			lowValueYGrouped: "low",
			highValueXGrouped: "high",
			highValueYGrouped: "high",
			openValueXGrouped: "open",
			openValueYGrouped: "open",
			valueXGrouped: "close",
			valueYGrouped: "close"
		})

		// These rules can be used for regular columns, too
		this.rule("Rectangle", ["column", "autocolor"]).states.create("riseFromOpen", { fill: positive, stroke: positive });
		this.rule("Rectangle", ["column", "autocolor"]).states.create("dropFromOpen", { fill: negative, stroke: negative });

		this.rule("Rectangle", ["column", "autocolor", "pro"]).states.create("riseFromPrevious", { fillOpacity: 1 });
		this.rule("Rectangle", ["column", "autocolor", "pro"]).states.create("dropFromPrevious", { fillOpacity: 0 });

		/**
		 * ========================================================================
		 * charts/percent
		 * ========================================================================
		 */

		this.rule("PercentSeries").setAll({
			legendLabelText: "{category}",
			legendValueText: "{valuePercentTotal.formatNumber('0.00')}%",
			colors: ColorSet.new(this._root, {}),
			width: p100,
			height: p100
		});

		/**
		 * ========================================================================
		 * charts/pie
		 * ========================================================================
		 */

		this.rule("PieChart").setAll({
			radius: percent(80),
			startAngle: -90,
			endAngle: 270
		})

		this.rule("PieSeries").setAll({
			alignLabels: true,
			startAngle: -90,
			endAngle: 270
		});

		this.rule("PieSeries").states.create("hidden", { endAngle: -90, opacity: 0 });

		this.rule("Slice", ["pie"]).setAll({
			position: "absolute",
			isMeasured: false,
			x: 0,
			y: 0,
			toggleKey: "active",
			tooltipText: "{category}: {valuePercentTotal.formatNumber('0.00')}%",
			strokeWidth: 1,
			strokeOpacity: 1,
			role: "figure"
		});

		this.rule("Slice", ["pie"]).states.create("active", { shiftRadius: 20 });
		this.rule("Slice", ["pie"]).states.create("hover", { scale: 1.05 });

		this.rule("RadialLabel", ["pie"]).setAll({
			textType: "aligned",
			radius: 10,
			text: "{category}: {valuePercentTotal.formatNumber('0.00')}%",
			paddingTop: 5,
			paddingBottom: 5,
			populateText: true
		});

		this.rule("Tick", ["pie"]).setAll({
			location: 1
		});


		/**
		 * ========================================================================
		 * charts/funnel
		 * ========================================================================
		 */

		this.rule("SlicedChart").setAll({
			paddingLeft: 10,
			paddingRight: 10,
			paddingTop: 10,
			paddingBottom: 10
		});

		/**
		 * ------------------------------------------------------------------------
		 * charts/funnel: Funnel
		 * ------------------------------------------------------------------------
		 */

		this.rule("FunnelSeries").setAll({
			startLocation: 0,
			endLocation: 1,
			orientation: "vertical",
			alignLabels: true,
			sequencedInterpolation: true
		});

		this.rule("FunnelSlice").setAll({
			interactive: true,
			expandDistance: 0,
			//tooltipText: "{category}: {valuePercentTotal.formatNumber('0.00')}%"
		});

		this.rule("FunnelSlice").states.create("hover", { expandDistance: 0.15 })

		this.rule("Label", ["funnel"]).setAll({
			populateText: true,
			text: "{category}: {valuePercentTotal.formatNumber('0.00')}%",
			centerY: p50
		});

		this.rule("Label", ["funnel", "horizontal"]).setAll({
			centerX: 0,
			centerY: p50,
			rotation: -90
		});

		// Class: Label
		this.rule("Label", ["funnel", "vertical"]).setAll({
			centerY: p50,
			centerX: 0
		});

		this.rule("Tick", ["funnel"]).setAll({
			location: 1
		});

		this.rule("FunnelSlice", ["funnel", "link"]).setAll({
			fillOpacity: 0.5,
			expandDistance: -0.1
		});

		this.rule("FunnelSlice", ["funnel", "link", "vertical"]).setAll({
			height: 10,
		});

		this.rule("FunnelSlice", ["funnel", "link", "horizontal"]).setAll({
			width: 10
		});


		/**
		 * ------------------------------------------------------------------------
		 * charts/funnel: Pyramid
		 * ------------------------------------------------------------------------
		 */

		this.rule("PyramidSeries").setAll({
			valueIs: "area"
		});

		this.rule("FunnelSlice", ["pyramid", "link"]).setAll({
			fillOpacity: 0.5
		});

		this.rule("FunnelSlice", ["pyramid", "link", "vertical"]).setAll({
			height: 0
		});

		this.rule("FunnelSlice", ["pyramid", "link", "horizontal"]).setAll({
			width: 0
		});

		this.rule("FunnelSlice", ["pyramid"]).setAll({
			interactive: true,
			expandDistance: 0
		});

		this.rule("FunnelSlice", ["pyramid"]).states.create("hover", { expandDistance: 0.15 });

		this.rule("Label", ["pyramid"]).setAll({
			populateText: true,
			text: "{category}: {valuePercentTotal.formatNumber('0.00')}%",
			centerY: p50
		});

		this.rule("Label", ["pyramid", "horizontal"]).setAll({
			centerX: 0,
			centerY: p50,
			rotation: -90
		});

		this.rule("Label", ["pyramid", "vertical"]).setAll({
			centerY: p50,
			centerX: 0
		});

		this.rule("Tick", ["pyramid"]).setAll({
			location: 1
		});


		/**
		 * ------------------------------------------------------------------------
		 * charts/funnel: Pictorial
		 * ------------------------------------------------------------------------
		 */

		// Class: FunnelSlice
		this.rule("FunnelSlice", ["pictorial"]).setAll({
			interactive: true,
			tooltipText: "{category}: {valuePercentTotal.formatNumber('0.00')}%"
		});

		this.rule("Label", ["pictorial"]).setAll({
			populateText: true,
			text: "{category}: {valuePercentTotal.formatNumber('0.00')}%",
			centerY: p50
		});

		this.rule("Label", ["pictorial", "horizontal"]).setAll({
			centerX: 0,
			centerY: p50,
			rotation: -90
		});

		this.rule("Label", ["pictorial", "vertical"]).setAll({
			centerY: p50,
			centerX: 0
		});

		this.rule("FunnelSlice", ["pictorial", "link"]).setAll({
			fillOpacity: 0.5,
			width: 0,
			height: 0
		});

		this.rule("Tick", ["pictorial"]).setAll({
			location: 0.5
		});


		/**
		 * ========================================================================
		 * charts/radar
		 * ========================================================================
		 */

		this.rule("RadarChart").setAll({
			radius: percent(80),
			innerRadius: 0,
			startAngle: -90,
			endAngle: 270
		});

		this.rule("RadarColumnSeries").setAll({
			clustered: true
		});

		this.rule("Slice", ["radar", "column", "series"]).setAll({
			width: percent(80),
			height: percent(80)
		});

		this.rule("RadarLineSeries").setAll({
			connectEnds: true
		});

		this.rule("SmoothedRadarLineSeries").setAll({
			tension: 0.5
		});

		this.rule("AxisRendererRadial").setAll({
			minGridDistance: 40,
			axisAngle: -90,
			inversed: false,
			cellStartLocation: 0,
			cellEndLocation: 1
		});

		this.rule("AxisRendererCircular").setAll({
			minGridDistance: 100,
			inversed: false,
			cellStartLocation: 0,
			cellEndLocation: 1
		});

		this.rule("RadialLabel", ["circular"]).setAll({
			textType: "circular",
			paddingTop: 1,
			paddingRight: 0,
			paddingBottom: 1,
			paddingLeft: 0,
			centerX: 0,
			centerY: 0,
			radius: 8
		});

		this.rule("RadialLabel", ["radial"]).setAll({
			textType: "regular",
			centerX: 0,
			textAlign: "right"
		});

		this.rule("RadarChart", ["gauge"]).setAll({
			startAngle: 180,
			endAngle: 360,
			innerRadius: percent(90)
		});

		this.rule("ClockHand").setAll({
			topWidth: 1,
			bottomWidth: 10,
			radius: percent(90),
			pinRadius: 10
		});

		this.rule("Graphics", ["clock", "hand"]).setAll({
			fill: alternativeBackground,
			fillOpacity: 1
		});

		this.rule("Graphics", ["clock", "pin"]).setAll({
			fill: alternativeBackground,
			fillOpacity: 1
		});


		/**
		 * ========================================================================
		 * charts/map
		 * ========================================================================
		 */

		this.rule("MapChart").setAll({
			projection: geoMercator(),
			panX: "translateX",
			panY: "translateY",
			zoomStep: 2,
			zoomLevel: 1,
			rotationX: 0,
			rotationY: 0,
			rotationZ: 0,
			maxZoomLevel: 32,
			minZoomLevel: 1,
			wheelY: "zoom",
			animationEasing: $ease.out($ease.cubic),
			wheelEasing: $ease.out($ease.cubic),
			wheelDuration: 0,
			wheelSensitivity: 1,
			maxPanOut: 0.4
		});

		this.rule("MapLine").setAll({
			precision: 0.5,
			role: "figure",
			stroke: grid
		});

		this.rule("MapPolygon").setAll({
			precision: 0.5,
			isMeasured: false,
			role: "figure",
			fillOpacity: 1,
			fill: primaryButton,
			position: "absolute",
			strokeWidth: 0.2,
			strokeOpacity: 1,
			stroke: background
		});


		/**
		 * ------------------------------------------------------------------------
		 * charts/map: Series
		 * ------------------------------------------------------------------------
		 */

		this.rule("GraticuleSeries").setAll({
			step: 10
		});


		/**
		 * ========================================================================
		 * charts/hierarchy
		 * ========================================================================
		 */

		this.rule("Hierarchy").setAll({
			legendLabelText: "{category}",
			legendValueText: "{sum.formatNumber('#.#')}",
			width: p100,
			height: p100,
			colors: ColorSet.new(this._root, { step: 2 }),
			downDepth: 1,
			initialDepth: 5,
			singleBranchOnly: true,
			maskContent: true,
			animationEasing: $ease.out($ease.cubic)
		});

		this.rule("HierarchyNode").setAll({
			toggleKey: "disabled",
			setStateOnChildren: true,
			position: "absolute",
			isMeasured: false,
			cursorOverStyle: "pointer",
			tooltipText: "{category}: {sum}"
		});

		this.rule("Label", ["hierarchy", "node"]).setAll({
			centerX: p50,
			centerY: p50,
			position: "absolute",
			paddingBottom: 1,
			paddingTop: 1,
			paddingRight: 4,
			paddingLeft: 4,
			fill: alternativeText,
			text: "{category}",
			populateText: true,
			oversizedBehavior: "fit",
			minScale: 0.3
		});

		this.rule("HierarchyLink").setAll({
			isMeasured: false,
			position: "absolute",
			strokeWidth: 1,
			strokeOpacity: 1,
			stroke: grid,
			strength: 0.9,
			distance: 1.1
		});

		this.rule("Circle", ["linkedhierarchy", "shape"]).setAll({
			position: "absolute",
			fillOpacity: 1,
			strokeOpacity: 0,
			radius: 15,
			tooltipY: 0
		});

		this.rule("Circle", ["linkedhierarchy", "shape", "outer"]).setAll({
			position: "absolute",
			opacity: 1,
			fillOpacity: 0,
			strokeDasharray: 0,
			strokeWidth: 1,
			strokeOpacity: 1,
			radius: 15,
			scale: 1.1,
			interactive: false
		})

		this.rule("Circle", ["linkedhierarchy", "shape", "outer"]).states.create("disabled", { opacity: 1, strokeWidth: 1, scale: 1.1, strokeDasharray: 2 });
		this.rule("Circle", ["linkedhierarchy", "shape", "outer"]).states.create("hoverDisabled", { strokeWidth: 1, scale: 1.2, opacity: 1, strokeDasharray: 2 });
		this.rule("Circle", ["linkedhierarchy", "shape", "outer"]).states.create("hover", { strokeWidth: 1, scale: 1.05, strokeDasharray: 0 });
		this.rule("Circle", ["linkedhierarchy", "shape", "outer"]).states.create("hidden", { opacity: 0, strokeDasharray: 0 });


		/**
		 * ------------------------------------------------------------------------
		 * charts/hierarchy: BreadcrumbBar
		 * ------------------------------------------------------------------------
		 */

		this.rule("BreadcrumbBar").setAll({
			paddingLeft: 8,
			layout: gridLayout
		});

		this.rule("Label", ["breadcrumb"]).setAll({
			paddingRight: 4,
			paddingLeft: 4,
			cursorOverStyle: "pointer",
			populateText: true,
			text: "{category}:",
			fill: primaryButton
		});

		this.rule("Label", ["breadcrumb"]).states.create("hover", { fill: primaryButtonHover });
		this.rule("Label", ["breadcrumb"]).states.create("down", { fill: primaryButtonDown, stateAnimationDuration: 0 });

		this.rule("Label", ["breadcrumb", "last"]).setAll({
			populateText: true,
			text: "{category}",
			fontWeight: "bold",
			fill: primaryButton,
			cursorOverStyle: "default"
		});

		this.rule("RoundedRectangle", ["breadcrumb", "label", "background"]).setAll({
			fillOpacity: 0,
			fill: background
		});


		/**
		 * ------------------------------------------------------------------------
		 * charts/hierarchy: Partition
		 * ------------------------------------------------------------------------
		 */

		this.rule("Partition").setAll({
			downDepth: 1,
			upDepth: 0,
			initialDepth: 5
		});

		this.rule("HierarchyNode", ["partition"]).setAll({
			setStateOnChildren: false
		});

		this.rule("HierarchyNode", ["partition"]).states.create("hidden", {
			opacity: 1,
			visible: true
		});

		this.rule("Label", ["partition", "node"]).setAll({
			x: p50,
			y: p50,
			centerY: p50,
			centerX: p50,
			paddingBottom: 1,
			paddingTop: 1,
			paddingLeft: 1,
			paddingRight: 1,
			rotation: 90,
			populateText: true,
			fill: alternativeText,
			text: "{category}",
			oversizedBehavior: "fit",
			minScale: 0.4
		});

		this.rule("Label", ["horizontal", "partition", "node"]).setAll({
			rotation: 0
		});

		this.rule("RoundedRectangle", ["partition", "node", "shape"]).setAll({
			strokeOpacity: 1,
			strokeWidth: 1,
			stroke: background,
			cornerRadiusBR: 0,
			cornerRadiusTR: 0,
			cornerRadiusBL: 0,
			cornerRadiusTL: 0
		});

		this.rule("RoundedRectangle", ["partition", "node", "shape", "last"]).setAll({
			fillOpacity: 0.75
		});


		/**
		 * ------------------------------------------------------------------------
		 * charts/hierarchy: Sunburst
		 * ------------------------------------------------------------------------
		 */

		this.rule("Sunburst").setAll({
			singleBranchOnly: true
		});

		this.rule("HierarchyNode", ["sunburst"]).setAll({
			setStateOnChildren: false
		});

		this.rule("Slice", ["sunburst", "node", "shape"]).setAll({
			strokeOpacity: 1,
			strokeWidth: 1,
			stroke: background,
			cornerRadius: 0
		});

		this.rule("Slice", ["sunburst", "node", "shape", "last"]).setAll({
			fillOpacity: 0.75
		});

		this.rule("RadialLabel", ["sunburst", "node"]).setAll({
			textType: "radial",
			paddingBottom: 1,
			paddingTop: 1,
			paddingLeft: 1,
			paddingRight: 1,
			centerX: p50,
			populateText: true,
			fill: alternativeText,
			text: "{category}",
			oversizedBehavior: "fit",
			minScale: 0.4
		});


		/**
		 * ------------------------------------------------------------------------
		 * charts/hierarchy: ForceDirected
		 * ------------------------------------------------------------------------
		 */

		this.rule("ForceDirected").setAll({
			minRadius: percent(1),
			maxRadius: percent(8),
			initialFrames: 500,
			centerStrength: 0.5,
			manyBodyStrength: -15,
			velocityDecay: 0.5,
			linkWithStrength: 0.5,
			showOnFrame: 10,
			singleBranchOnly: false,
			upDepth: Infinity,
			downDepth: 1,
			initialDepth: 5,
			topDepth: 0
		});

		/**
		 * ------------------------------------------------------------------------
		 * charts/hierarchy: Tree
		 * ------------------------------------------------------------------------
		 */

		this.rule("Tree").setAll({
			orientation: "vertical",
			paddingLeft: 20,
			paddingRight: 20,
			paddingTop: 20,
			paddingBottom: 20,
			singleBranchOnly: false,
			upDepth: Infinity,
			downDepth: 1,
			initialDepth: 5,
			topDepth: 0
		});


		/**
		 * ------------------------------------------------------------------------
		 * charts/hierarchy: Pack
		 * ------------------------------------------------------------------------
		 */

		this.rule("Pack").setAll({
			paddingLeft: 20,
			paddingTop: 20,
			paddingBottom: 20,
			paddingRight: 20
		});

		this.rule("Label", ["pack", "node"]).setAll({
			centerY: p50,
			centerX: p50,
			paddingBottom: 1,
			paddingTop: 1,
			paddingLeft: 1,
			paddingRight: 1,
			populateText: true,
			fill: alternativeText,
			text: "{category}",
			oversizedBehavior: "fit",
			minScale: 0.4
		});

		this.rule("Circle", ["pack", "node", "shape"]).setAll({
			strokeOpacity: 0.5,
			fillOpacity: 0.8,
			strokeWidth: 1,
			stroke: background
		});


		this.rule("LinkedHierarchyNode").setAll({
			draggable: true
		});

		this.rule("LinkedHierarchyNode").states.create("hidden", { scale: 0, opacity: 1 });


		/**
		 * ------------------------------------------------------------------------
		 * charts/hierarchy: Treemap
		 * ------------------------------------------------------------------------
		 */

		this.rule("Treemap").setAll({
			upDepth: 0,
			layoutAlgorithm: "binary"
		});

		this.rule("Label", ["treemap", "node"]).setAll({
			x: p50,
			y: p50,
			centerY: p50,
			centerX: p50,
			paddingBottom: 1,
			paddingTop: 1,
			paddingLeft: 1,
			paddingRight: 1,
			populateText: true,
			fill: alternativeText,
			text: "{category}",
			oversizedBehavior: "fit",
			minScale: 0.4
		});

		this.rule("HierarchyNode", ["treemap", "node"]).setAll({
			tooltipY: percent(40)
		})

		this.rule("RoundedRectangle", ["treemap", "node", "shape"]).setAll({
			strokeOpacity: 1,
			strokeWidth: 1,
			stroke: background,
			cornerRadiusBR: 0,
			cornerRadiusTR: 0,
			cornerRadiusBL: 0,
			cornerRadiusTL: 0,
			fillOpacity: 1
		});


		/**
		 * ========================================================================
		 * charts/flow
		 * ========================================================================
		 */

		this.rule("Flow").setAll({
			width: p100,
			height: p100,
			paddingLeft: 10,
			paddingRight: 10,
			paddingTop: 10,
			paddingBottom: 10
		});

		this.rule("FlowNodes").setAll({
			colors: ColorSet.new(this._root, {}),
			legendLabelText: "{name}",
			legendValueText: "{sumOutgoing.formatNumber('#.#')}"
		});

		this.rule("FlowNode").setAll({

		});

		this.rule("FlowNode", ["unknown"]).setAll({
			draggable: false,
			opacity: 0
		});

		this.rule("RadialLabel", ["flow", "node"]).setAll({
			text: "{name}",
			populateText: true
		});

		this.rule("FlowLink").setAll({
			fillStyle: "gradient",
			strokeStyle: "gradient"
		});

		this.rule("FlowLink", ["source", "unknown"]).setAll({
		});

		this.rule("FlowLink", ["target", "unknown"]).setAll({
		});


		this.rule("FlowNode").events.on("pointerover", (e) => {
			const dataItem = e.target.dataItem as DataItem<IFlowNodesDataItem>;
			if (dataItem) {
				const outgoing = dataItem.get("outgoingLinks")
				if (outgoing) {
					$array.each(outgoing, (linkDataItem) => {
						const link = (linkDataItem as any).get("link");
						link.hover();
						link.hideTooltip();
					})
				}
				const incoming = dataItem.get("incomingLinks")
				if (incoming) {
					$array.each(incoming, (linkDataItem) => {
						const link = (linkDataItem as any).get("link");
						link.hover();
						link.hideTooltip();
					})
				}
			}

			let rectangle = (<any>dataItem).get("slice") || (<any>dataItem).get("rectangle");
			if (rectangle && rectangle.get("tooltipText")) {
				rectangle.showTooltip();
			}
		});

		this.rule("FlowNode").events.on("pointerout", (e) => {
			const dataItem = e.target.dataItem as DataItem<IFlowNodesDataItem>;
			if (dataItem) {
				const outgoing = dataItem.get("outgoingLinks")
				if (outgoing) {
					$array.each(outgoing, (linkDataItem) => {
						(linkDataItem as any).get("link").unhover();
					})
				}
				const incoming = dataItem.get("incomingLinks")
				if (incoming) {
					$array.each(incoming, (linkDataItem) => {
						(linkDataItem as any).get("link").unhover();
					})
				}
			}
		});


		/**
		 * ------------------------------------------------------------------------
		 * charts/flow: Sankey
		 * ------------------------------------------------------------------------
		 */

		this.rule("Sankey").setAll({
			orientation: "horizontal",
			nodeAlign: "justify",
			linkTension: 0.5,
			nodePadding: 10,
			nodeWidth: 10
		});

		// Class: RoundedRectangle
		this.rule("RoundedRectangle", ["sankey", "node", "shape"]).setAll({
			cornerRadiusTL: 0,
			cornerRadiusBL: 0,
			cornerRadiusTR: 0,
			cornerRadiusBR: 0
		});

		this.rule("SankeyLink").setAll({
			controlPointDistance: 0.2
		});

		this.rule("FlowNode", ["sankey"]).setAll({
			draggable: true
		});

		this.rule("Graphics", ["sankey", "link"]).setAll({
			fill: grid,
			fillOpacity: 0.2,
			strokeOpacity: 0,
			interactive: true,
			tooltipText: "{sourceId} - {targetId}: {value}"
		});

		this.rule("Graphics", ["sankey", "link"]).states.create("hover", { fillOpacity: 0.5 });

		this.rule("Label", ["sankey", "node"]).setAll({
			text: "{name}",
			populateText: true
		});

		this.rule("Label", ["sankey", "horizontal"]).setAll({
			y: p50,
			centerY: p50,
			paddingLeft: 15
		});

		this.rule("Label", ["sankey", "vertical"]).setAll({
			x: p50,
			centerX: p50,
			paddingTop: 15
		});

		/**
		 * ------------------------------------------------------------------------
		 * charts/flow: Chord
		 * ------------------------------------------------------------------------
		 */

		this.rule("Chord").setAll({
			radius: percent(90),
			nodeWidth: 10,
			padAngle: 1,
			startAngle: 0,
			sort: "descending"
		});

		this.rule("ChordDirected").setAll({
			linkHeadRadius: 10
		});

		this.rule("ChordNodes").setAll({
			x: p50,
			y: p50
		});

		this.rule("FlowNode", ["chord"]).setAll({
			draggable: true
		});

		this.rule("ChordLink").setAll({
			sourceRadius: p100,
			targetRadius: p100,
			fillStyle: "solid",
			strokeStyle: "solid",
			tooltipText: "{sourceId} - {targetId}: {value}"
		});

		this.rule("Slice", ["chord", "node", "shape"]).setAll({
			cornerRadius: 0
		})

		this.rule("RadialLabel", ["chord", "node"]).setAll({
			radius: 5,
			textType: "circular"
		});

		this.rule("ChordLinkDirected").setAll({
			headRadius: 10
		});

		// Class: Graphics
		this.rule("Graphics", ["chord", "link", "shape"]).setAll({
			fill: grid,
			fillOpacity: 0.2,
			strokeOpacity: 0,
			stroke: grid,
			interactive: true
		});

		this.rule("Graphics", ["chord", "link", "shape"]).states.create("hover", { fillOpacity: 0.5 });

		this.rule("ChordNonRibbon").setAll({
			linkType: "curve" // "line" | "curve"
		})

		this.rule("ChordLink", ["basic"]).setAll({
			fillStyle: "none",
			strokeStyle: "source"
		});

		this.rule("Graphics", ["chord", "link", "shape", "basic"]).setAll({
			strokeOpacity: 0.4
		});

		this.rule("Graphics", ["chord", "link", "shape", "basic"]).states.create("hover", { strokeWidth: 2, strokeOpacity: 1 });


		/**
		 * ------------------------------------------------------------------------
		 * Shapes
		 * ------------------------------------------------------------------------
		 */

		// Class: Graphics
		this.rule("Star").setAll({
			spikes: 5,
			innerRadius: 5,
			radius: 10
		})
	}
}