/**
 * PptxGenJS: Slide Class
 */

import { CHART_NAME, ChartType, SHAPE_NAME, ShapeType } from './core-enums'
import {
	AddSlideProps,
	BackgroundProps,
	HexColor,
	IChartMulti,
	IChartOpts,
	IChartOptsLib,
	IOptsChartData,
	IOptsCustomChartData,
	IOptsCustomChartWaterfallData,
	ISlideObject,
	ISlideRel,
	ISlideRelChart,
	ISlideRelMedia,
	ImageProps,
	MediaProps,
	PresLayout,
	PresSlide,
	ShapeProps,
	SlideLayout,
	SlideNumberProps,
	TableProps,
	TableRow,
	TextProps,
	TextPropsOptions,
} from './core-interfaces'
import * as genObj from './gen-objects'

export default class Slide {
	private readonly _setSlideNum: (value: SlideNumberProps) => void

	public addSlide: (options?: AddSlideProps) => PresSlide
	public getSlide: (slideNum: number) => PresSlide
	public _name: string
	public _presLayout: PresLayout
	public _rels: ISlideRel[]
	public _relsChart: ISlideRelChart[]
	public _relsMedia: ISlideRelMedia[]
	public _rId: number
	public _slideId: number
	public _slideLayout: SlideLayout
	public _slideNum: number
	public _slideNumberProps: SlideNumberProps
	public _slideObjects: ISlideObject[]
	public _newAutoPagedSlides: PresSlide[]

	constructor(params: {
		addSlide: (options?: AddSlideProps) => PresSlide
		getSlide: (slideNum: number) => PresSlide
		presLayout: PresLayout
		setSlideNum: (value: SlideNumberProps) => void
		slideId: number
		slideRId: number
		slideNumber: number
		slideLayout?: SlideLayout
	}) {
		this.addSlide = params.addSlide
		this.getSlide = params.getSlide
		this._name = `Slide ${params.slideNumber}`
		this._presLayout = params.presLayout
		this._rId = params.slideRId
		this._rels = []
		this._relsChart = []
		this._relsMedia = []
		this._setSlideNum = params.setSlideNum
		this._slideId = params.slideId
		this._slideLayout = params.slideLayout || null
		this._slideNum = params.slideNumber
		this._slideObjects = []
		/** NOTE: Slide Numbers: In order for Slide Numbers to function they need to be in all 3 files: master/layout/slide
		 * `defineSlideMaster` and `addNewSlide.slideNumber` will add {slideNumber} to `this.masterSlide` and `this.slideLayouts`
		 * so, lastly, add to the Slide now.
		 */
		this._slideNumberProps = this._slideLayout?._slideNumberProps ? this._slideLayout._slideNumberProps : null
	}

	/**
	 * Background color
	 * @type {string|BackgroundProps}
	 * @deprecated in v3.3.0 - use `background` instead
	 */
	private _bkgd: string | BackgroundProps
	public set bkgd(value: string | BackgroundProps) {
		this._bkgd = value
		if (!this._background || !this._background.color) {
			if (!this._background) this._background = {}
			if (typeof value === 'string') this._background.color = value
		}
	}

	public get bkgd(): string | BackgroundProps {
		return this._bkgd
	}

	/**
	 * Background color or image
	 * @type {BackgroundProps}
	 * @example solid color `background: { color:'FF0000' }`
	 * @example color+trans `background: { color:'FF0000', transparency:0.5 }`
	 * @example base64 `background: { data:'image/png;base64,ABC[...]123' }`
	 * @example url `background: { path:'https://some.url/image.jpg'}`
	 * @since v3.3.0
	 */
	private _background: BackgroundProps
	public set background(props: BackgroundProps) {
		this._background = props
		// Add background (image data/path must be captured before `exportPresentation()` is called)
		if (props) genObj.addBackgroundDefinition(props, this)
	}

	public get background(): BackgroundProps {
		return this._background
	}

	/**
	 * Default font color
	 * @type {HexColor}
	 */
	private _color: HexColor
	public set color(value: HexColor) {
		this._color = value
	}

	public get color(): HexColor {
		return this._color
	}

	/**
	 * @type {boolean}
	 */
	private _hidden: boolean
	public set hidden(value: boolean) {
		this._hidden = value
	}

	public get hidden(): boolean {
		return this._hidden
	}

	/**
	 * @type {SlideNumberProps}
	 */
	public set slideNumber(value: SlideNumberProps) {
		// NOTE: Slide Numbers: In order for Slide Numbers to function they need to be in all 3 files: master/layout/slide
		this._slideNumberProps = value
		this._setSlideNum(value)
	}

	public get slideNumber(): SlideNumberProps {
		return this._slideNumberProps
	}

	public get newAutoPagedSlides(): PresSlide[] {
		return this._newAutoPagedSlides
	}

	/**
	 * Add chart to Slide
	 * @param {CHART_NAME|IChartMulti[]} type - chart type
	 * @param {object[]} data - data object
	 * @param {IChartOpts} options - chart options
	 * @return {Slide} this Slide
	 */
	addChart(type: CHART_NAME | IChartMulti[], data: IOptsChartData[] | IOptsCustomChartData[] | IOptsCustomChartWaterfallData, options?: IChartOpts): Slide {
		// FUTURE: TODO-VERSION-4: Remove first arg - only take data and opts, with "type" required on opts
		// Set `_type` on IChartOptsLib as its what is used as object is passed around
		if (type === ChartType.funnel) {
			this.generateFunnelChart(type, data as IOptsCustomChartData[], options);
		} else if(type === ChartType.waterfall) {
			this.generateWaterfallChart(data as IOptsCustomChartWaterfallData, options)
		} else {
			const optionsWithType: IChartOptsLib = options || {}
			optionsWithType._type = type
			genObj.addChartDefinition(this, type, data as IOptsChartData[], options)
		}
		return this;
	}

	generateWaterfallChart(data: IOptsCustomChartWaterfallData, options: any = {}): void {
		options.x = 0.5;
		options.y = 0.5;
		options.color = options.color ?? '000000';

		let labelYyAxisPos = 0.5;
		let labelYxAxisPos = 0.5;

		const labelsY = data[0].labelsY.sort((a, b) => b - a);
		const labelsX = data[0]?.labelsX;
		const values = data[0]?.values;

		const minY = Math.min(...labelsY);
		const maxY = Math.max(...labelsY);

		// Adjust Y position to account for negative values
		const yAxisZeroPos = labelYyAxisPos + (maxY / (maxY - minY)) * (labelsY.length - 1) * 0.4;

		// Y Axis Line & Text
		labelsY.forEach((labelY, index) => {
			this.addText(`${labelY}`, {
				x: labelYxAxisPos,
				y: labelYyAxisPos,
				color: '000000',
				fontSize: options?.fontSize ?? 12,
			});
			if (index !== labelsY?.length - 1) {
				labelYyAxisPos += 0.4;
			}
		});

		this.addShape(ShapeType.line, {
			x: options.x + 1,
			y: labelYxAxisPos - 0.2,
			h: labelYyAxisPos,
			w: 0.02,
			fill: { color: '000000' },
			line: { color: '000000' },
		});

		// X Axis Line & Text
		let labelXAxisPos = yAxisZeroPos;
		let labelXxAxisPos = 2;
		let xAxisLineY = yAxisZeroPos + 0.3;
		let xAxisLineWidth = labelXxAxisPos;
		const valuesXpos = [];

		labelsX.forEach((labelX, index) => {
			valuesXpos.push(labelXxAxisPos);
			this.addText(`${labelX}`, {
				x: labelXxAxisPos,
				y: xAxisLineY + 0.5,
				color: '000000',
				fontSize: options?.fontSize ?? 12,
			});
			if (index !== data[0]?.labelsX.length - 1) {
				labelXxAxisPos += 2;
				xAxisLineWidth += 2;
			}
		});

		this.addShape(ShapeType.line, {
			x: 1.5,
			y: xAxisLineY,
			h: 0.02,
			w: labelXxAxisPos - 0.5,
			line: { color: '000000' },
		});

		// Values Mapping & Boxes
		let cumulativeValue = 0;
		const yUnit = (labelsY[0] - labelsY[1]) / 0.4; // Calculate the unit height for the bars

		values.forEach((value, index) => {
			const difference = value - cumulativeValue; // y position
			const boxHeight = (Math.abs(difference) / yUnit); // box height
			// Calculating starting position of next box
			const boxYpos = difference >= 0
				? yAxisZeroPos - cumulativeValue / yUnit - boxHeight
				: yAxisZeroPos - cumulativeValue / yUnit;

			this.addShape(ShapeType.rect, {
				x: valuesXpos[index],
				y: boxYpos,
				w: 1, // Width of the bar
				h: boxHeight, // Height of the bar
				fill: { color: options.color },
				line: { color: '000000' },
			});

			if (values[1] - values[2] < 0) {
				// drawing line upward
				if (index < values.length - 1) {
					const nextValue = values[index + 1];
					const nextDifference = nextValue - (cumulativeValue + difference);
					const nextBoxHeight = (Math.abs(nextDifference) / yUnit);
					const nextBoxYpos = nextDifference >= 0
						? yAxisZeroPos - (cumulativeValue + difference) / yUnit - nextBoxHeight
						: yAxisZeroPos - (cumulativeValue + difference) / yUnit;

					this.addShape(ShapeType.line, {
						x: valuesXpos[index] + 1,
						y: boxYpos,
						w: valuesXpos[index + 1] - valuesXpos[index] - 1,
						h: 0.00,
						line: { color: '000000' },
					});
				}
			}

			// Update cumulative value
			cumulativeValue += difference;
		});
		if (values[1] - values[2] > 0) {
			// line downwards
			for (let index = 0; index < values.length - 1; index++) {

				const value = values[index];
				const difference = value - cumulativeValue;
				const boxHeight = Math.abs(difference) / yUnit;
				const boxYpos = difference >= 0
					? yAxisZeroPos - cumulativeValue / yUnit - boxHeight
					: yAxisZeroPos - cumulativeValue / yUnit;

				this.addShape(ShapeType.line, {
					x: valuesXpos[index] + 1,
					y: boxYpos,
					w: valuesXpos[index + 1] - valuesXpos[index] - 1,
					h: 0.00,
					line: { color: '000000' },
				});
			}
		}

	}

	generateFunnelChart(type: CHART_NAME | IChartMulti[], data: IOptsCustomChartData[], options?: IChartOpts): void {
		const slideWidth = 10; // Define the width of the slide
		const chartWidth = data.length * 1; // Define the width of the chart based on the number of steps (1 step = width 1)

		// Setting Options if not present
		options = options ?? {}
		options.align = options?.align ?? 'center' // Setting Alignment Center if not present
		options.x = 0.5 // X Coordinate cannot be changed
		options.y = Number(options.y ?? 1.5) // Y Coordinate cannot be changed
		options.color = options.color ?? 'ffffff'
		options.position = options.position ?? 'left'

		if(!options.chartColors || options.chartColors?.length === 0) {
			let colorsDefaultArr = []
			for(let i = 0; i < data.length;i++) {
				colorsDefaultArr.push(this.getRandomHexCode())
			}
			options.chartColors = colorsDefaultArr
		}
		if(options.position === 'right') {
			options.y= options.y + 1
		}

		let initialX = this.setInitialXPositionFunnelChart(options, slideWidth, chartWidth);

		let alignmentPosX = this.funnelChartAlignment(options.align, initialX);

		if(options.position === 'left') {
			data.sort((a, b) => b.value - a.value);
		} else if(options.position === 'right') {
			data.sort((a, b) => a.value - b.value);
		} else {
			data.sort((a, b) => b.value - a.value);
		}

		const globalOptions: any = {
			x: alignmentPosX,
			y: options?.y ?? 1.5,
			w: chartWidth,
			h: options?.h ?? 2
		};

		const barHeights = []

		let prevH = globalOptions.h; // Initialize previous height
		let prevY = globalOptions.y; // Initialize previous height

		data.forEach(()=>{
			barHeights.push(prevH)
			prevH -= 0.3
		})

		let prevX = globalOptions.x; // Initialize previous X position
		if(options.position === 'right') {
			barHeights.reverse()
		}
		data.forEach((info: IOptsCustomChartData, index: number) => {
			const optionsObj = {
				x: prevX, // Use previous X position
				y: prevY,
				h: barHeights[index], // Use previous height
				w: 1,
				color: options?.color ?? '000000',
				fontSize: options?.fontSize ?? 12,
				align: options?.align ?? 'left'
			};

			if (options.chartColors && options.chartColors?.length > 0) {
				Object.assign(optionsObj, {
					fill: {
						color: options.chartColors[index]
					}
				});
			} else {
				Object.assign(optionsObj, {
					fill: {
						color: '000000'
					}
				});
			}

			// Add text with updated options
			const text = info.type === 'percent' ? `${info.value}%` : `${info.value}`;
			this.addText(text, optionsObj);

			// Update previous Y position and height
			// prevH -= 0.3; // Adjust the decrement as needed for height
			// prevY += -(0.2);
			if(options.position === 'left') {
				prevY += 0.2;
			} else if(options.position === 'right') {
				prevY += -(0.2);
			}

			// Update previous X position for the next step
			prevX += 1;
		});
	}

	funnelChartAlignment(alignValue, initialX) {
		let alignmentPosX;

		switch (alignValue) {
			case 'left':
				alignmentPosX = initialX + 0.5
				break
			case 'right':
				alignmentPosX = initialX - 0.5
				break;
			case 'center':
				alignmentPosX = initialX
				break;
			default:
				alignmentPosX = initialX
				break
		}

		return alignmentPosX
	}

	setInitialXPositionFunnelChart(options, slideWidth, chartWidth): any {
		let initialX;
		if (options?.align === 'center') {
			initialX = (slideWidth - chartWidth) / 2; // Calculate the initial X position to center the chart
		} else if (options?.align === 'left') {
			initialX = 0; // Align chart to the left
		} else if (options?.align === 'right') {
			initialX = slideWidth - chartWidth; // Align chart to the right
		} else {
			initialX = options?.x ?? 0.5; // Default to provided x position if align value is not specified
		}

		return initialX;
	}

	getRandomHexCode() {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
		  color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	/**
	 * Add image to Slide
	 * @param {ImageProps} options - image options
	 * @return {Slide} this Slide
	 */
	addImage(options: ImageProps): Slide {
		genObj.addImageDefinition(this, options)
		return this
	}

	/**
	 * Add media (audio/video) to Slide
	 * @param {MediaProps} options - media options
	 * @return {Slide} this Slide
	 */
	addMedia(options: MediaProps): Slide {
		genObj.addMediaDefinition(this, options)
		return this
	}

	/**
	 * Add speaker notes to Slide
	 * @docs https://gitbrent.github.io/PptxGenJS/docs/speaker-notes.html
	 * @param {string} notes - notes to add to slide
	 * @return {Slide} this Slide
	 */
	addNotes(notes: string): Slide {
		genObj.addNotesDefinition(this, notes)
		return this
	}

	/**
	 * Add shape to Slide
	 * @param {SHAPE_NAME} shapeName - shape name
	 * @param {ShapeProps} options - shape options
	 * @return {Slide} this Slide
	 */
	addShape(shapeName: SHAPE_NAME, options?: ShapeProps): Slide {
		// NOTE: As of v3.1.0, <script> users are passing the old shape object from the shapes file (orig to the project)
		// But React/TypeScript users are passing the shapeName from an enum, which is a simple string, so lets cast
		// <script./> => `pptx.shapes.RECTANGLE` [string] "rect" ... shapeName['name'] = 'rect'
		// TypeScript => `pptxgen.shapes.RECTANGLE` [string] "rect" ... shapeName = 'rect'
		// let shapeNameDecode = typeof shapeName === 'object' && shapeName['name'] ? shapeName['name'] : shapeName
		genObj.addShapeDefinition(this, shapeName, options)
		return this
	}

	/**
	 * Add table to Slide
	 * @param {TableRow[]} tableRows - table rows
	 * @param {TableProps} options - table options
	 * @return {Slide} this Slide
	 */
	addTable(tableRows: TableRow[], options?: TableProps): Slide {
		// FUTURE: we pass `this` - we dont need to pass layouts - they can be read from this!
		this._newAutoPagedSlides = genObj.addTableDefinition(this, tableRows, options, this._slideLayout, this._presLayout, this.addSlide, this.getSlide)
		return this
	}

	/**
	 * Add text to Slide
	 * @param {string|TextProps[]} text - text string or complex object
	 * @param {TextPropsOptions} options - text options
	 * @return {Slide} this Slide
	 */
	addText(text: string | TextProps[], options?: TextPropsOptions): Slide {
		const textParam = typeof text === 'string' || typeof text === 'number' ? [{ text, options }] : text
		genObj.addTextDefinition(this, textParam, options, false)
		return this
	}
}
