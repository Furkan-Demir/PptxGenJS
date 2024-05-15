/**
 *  :: pptxgen.ts ::
 *
 *  JavaScript framework that creates PowerPoint (pptx) presentations
 *  https://github.com/gitbrent/PptxGenJS
 *
 *  This framework is released under the MIT Public License (MIT)
 *
 *  PptxGenJS (C) 2015-present Brent Ely -- https://github.com/gitbrent
 *
 *  Some code derived from the OfficeGen project:
 *  github.com/Ziv-Barber/officegen/ (Copyright 2013 Ziv Barber)
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

/**
 * Units of Measure used in PowerPoint documents
 *
 * PowerPoint units are in `DXA` (except for font sizing)
 * - 1 inch is 1440 DXA
 * - 1 inch is 72 points
 * - 1 DXA is 1/20th's of a point
 * - 20 DXA is 1 point
 *
 * Another form of measurement using is an `EMU`
 * - 914400 EMUs is 1 inch
 * 12700 EMUs is 1 point
 *
 * @see https://startbigthinksmall.wordpress.com/2010/01/04/points-inches-and-emus-measuring-units-in-office-open-xml/
 */

/**
 * Object Layouts
 *
 * - 16x9 (10" x 5.625")
 * - 16x10 (10" x 6.25")
 * - 4x3 (10" x 7.5")
 * - Wide (13.33" x 7.5")
 * - [custom] (any size)
 *
 * @see https://docs.microsoft.com/en-us/office/open-xml/structure-of-a-presentationml-document
 * @see https://docs.microsoft.com/en-us/previous-versions/office/developer/office-2010/hh273476(v=office.14)
 */

import JSZip from 'jszip'
import Slide from './slide'
import {
	AlignH,
	AlignV,
	CHART_TYPE,
	ChartType,
	DEF_PRES_LAYOUT,
	DEF_PRES_LAYOUT_NAME,
	DEF_SLIDE_MARGIN_IN,
	EMU,
	OutputType,
	SCHEME_COLOR_NAMES,
	SHAPE_TYPE,
	SchemeColor,
	ShapeType,
	WRITE_OUTPUT_TYPE,
} from './core-enums'
import {
	AddSlideProps,
	IPresentationProps,
	PresLayout,
	PresSlide,
	SectionProps,
	SlideLayout,
	SlideMasterProps,
	SlideNumberProps,
	TableToSlidesProps,
	ThemeProps,
	WriteBaseProps,
	WriteFileProps,
	WriteProps,
} from './core-interfaces'
import * as genCharts from './gen-charts'
import * as genObj from './gen-objects'
import * as genMedia from './gen-media'
import * as genTable from './gen-tables'
import * as genXml from './gen-xml'

const VERSION = '3.13.0-beta.0-20230416-2140'

export default class PptxGenJS implements IPresentationProps {
	// Property getters/setters

	/**
	 * Presentation layout name
	 * Standard layouts:
	 * - 'LAYOUT_4x3'   (10"    x 7.5")
	 * - 'LAYOUT_16x9'  (10"    x 5.625")
	 * - 'LAYOUT_16x10' (10"    x 6.25")
	 * - 'LAYOUT_WIDE'  (13.33" x 7.5")
	 * Custom layouts:
	 * Use `pptx.defineLayout()` to create custom layouts (e.g.: 'A4')
	 * @type {string}
	 * @see https://support.office.com/en-us/article/Change-the-size-of-your-slides-040a811c-be43-40b9-8d04-0de5ed79987e
	 */
	private _layout: string
	public set layout (value: string) {
		const newLayout: PresLayout = this.LAYOUTS[value]

		if (newLayout) {
			this._layout = value
			this._presLayout = newLayout
		} else {
			throw new Error('UNKNOWN-LAYOUT')
		}
	}

	public get layout (): string {
		return this._layout
	}

	/**
	 * PptxGenJS Library Version
	 */
	private readonly _version: string = VERSION
	public get version (): string {
		return this._version
	}

	/**
	 * @type {string}
	 */
	private _author: string
	public set author (value: string) {
		this._author = value
	}

	public get author (): string {
		return this._author
	}

	/**
	 * @type {string}
	 */
	private _company: string
	public set company (value: string) {
		this._company = value
	}

	public get company (): string {
		return this._company
	}

	/**
	 * @type {string}
	 * @note the `revision` value must be a whole number only (without "." or "," - otherwise, PPT will throw errors upon opening!)
	 */
	private _revision: string
	public set revision (value: string) {
		this._revision = value
	}

	public get revision (): string {
		return this._revision
	}

	/**
	 * @type {string}
	 */
	private _subject: string
	public set subject (value: string) {
		this._subject = value
	}

	public get subject (): string {
		return this._subject
	}

	/**
	 * @type {ThemeProps}
	 */
	private _theme: ThemeProps
	public set theme (value: ThemeProps) {
		this._theme = value
	}

	public get theme (): ThemeProps {
		return this._theme
	}

	/**
	 * @type {string}
	 */
	private _title: string
	public set title (value: string) {
		this._title = value
	}

	public get title (): string {
		return this._title
	}

	/**
	 * Whether Right-to-Left (RTL) mode is enabled
	 * @type {boolean}
	 */
	private _rtlMode: boolean
	public set rtlMode (value: boolean) {
		this._rtlMode = value
	}

	public get rtlMode (): boolean {
		return this._rtlMode
	}

	/** master slide layout object */
	private readonly _masterSlide: PresSlide
	public get masterSlide (): PresSlide {
		return this._masterSlide
	}

	/** this Presentation's Slide objects */
	private readonly _slides: PresSlide[]
	public get slides (): PresSlide[] {
		return this._slides
	}

	/** this Presentation's sections */
	private readonly _sections: SectionProps[]
	public get sections (): SectionProps[] {
		return this._sections
	}

	/** slide layout definition objects, used for generating slide layout files */
	private readonly _slideLayouts: SlideLayout[]
	public get slideLayouts (): SlideLayout[] {
		return this._slideLayouts
	}

	private LAYOUTS: { [key: string]: PresLayout }

	// Exposed class props
	private readonly _alignH = AlignH
	public get AlignH (): typeof AlignH {
		return this._alignH
	}

	private readonly _alignV = AlignV
	public get AlignV (): typeof AlignV {
		return this._alignV
	}

	private readonly _chartType = ChartType
	public get ChartType (): typeof ChartType {
		return this._chartType
	}

	private readonly _outputType = OutputType
	public get OutputType (): typeof OutputType {
		return this._outputType
	}

	private _presLayout: PresLayout
	public get presLayout (): PresLayout {
		return this._presLayout
	}

	private readonly _schemeColor = SchemeColor
	public get SchemeColor (): typeof SchemeColor {
		return this._schemeColor
	}

	private readonly _shapeType = ShapeType
	public get ShapeType (): typeof ShapeType {
		return this._shapeType
	}

	/**
	 * @depricated use `ChartType`
	 */
	private readonly _charts = CHART_TYPE
	public get charts (): typeof CHART_TYPE {
		return this._charts
	}

	/**
	 * @depricated use `SchemeColor`
	 */
	private readonly _colors = SCHEME_COLOR_NAMES
	public get colors (): typeof SCHEME_COLOR_NAMES {
		return this._colors
	}

	/**
	 * @depricated use `ShapeType`
	 */
	private readonly _shapes = SHAPE_TYPE
	public get shapes (): typeof SHAPE_TYPE {
		return this._shapes
	}

	constructor () {
		const layout4x3: PresLayout = { name: 'screen4x3', width: 9144000, height: 6858000 }
		const layout16x9: PresLayout = { name: 'screen16x9', width: 9144000, height: 5143500 }
		const layout16x10: PresLayout = { name: 'screen16x10', width: 9144000, height: 5715000 }
		const layoutWide: PresLayout = { name: 'custom', width: 12192000, height: 6858000 }
		// Set available layouts
		this.LAYOUTS = {
			LAYOUT_4x3: layout4x3,
			LAYOUT_16x9: layout16x9,
			LAYOUT_16x10: layout16x10,
			LAYOUT_WIDE: layoutWide,
		}

		// Core
		this._author = 'PptxGenJS'
		this._company = 'PptxGenJS'
		this._revision = '1' // Note: Must be a whole number
		this._subject = 'PptxGenJS Presentation'
		this._title = 'PptxGenJS Presentation'
		// PptxGenJS props
		this._presLayout = {
			name: this.LAYOUTS[DEF_PRES_LAYOUT].name,
			_sizeW: this.LAYOUTS[DEF_PRES_LAYOUT].width,
			_sizeH: this.LAYOUTS[DEF_PRES_LAYOUT].height,
			width: this.LAYOUTS[DEF_PRES_LAYOUT].width,
			height: this.LAYOUTS[DEF_PRES_LAYOUT].height,
		}
		this._rtlMode = false
		//
		this._slideLayouts = [
			{
				_margin: DEF_SLIDE_MARGIN_IN,
				_name: DEF_PRES_LAYOUT_NAME,
				_presLayout: this._presLayout,
				_rels: [],
				_relsChart: [],
				_relsMedia: [],
				_slide: null,
				_slideNum: 1000,
				_slideNumberProps: null,
				_slideObjects: [],
			},
		]
		this._slides = []
		this._sections = []
		this._masterSlide = {
			addChart: null,
			addImage: null,
			addMedia: null,
			addNotes: null,
			addShape: null,
			addTable: null,
			addText: null,
			//
			_name: null,
			_presLayout: this._presLayout,
			_rId: null,
			_rels: [],
			_relsChart: [],
			_relsMedia: [],
			_slideId: null,
			_slideLayout: null,
			_slideNum: null,
			_slideNumberProps: null,
			_slideObjects: [],
		}
	}

	/**
	 * Provides an API for `addTableDefinition` to create slides as needed for auto-paging
	 * @param {AddSlideProps} options - slide masterName and/or sectionTitle
	 * @return {PresSlide} new Slide
	 */
	private readonly addNewSlide = (options?: AddSlideProps): PresSlide => {
		// Continue using sections if the first slide using auto-paging has a Section
		const sectAlreadyInUse =
			this.sections.length > 0 &&
			this.sections[this.sections.length - 1]._slides.filter(slide => slide._slideNum === this.slides[this.slides.length - 1]._slideNum).length > 0

		options.sectionTitle = sectAlreadyInUse ? this.sections[this.sections.length - 1].title : null

		return this.addSlide(options)
	}

	/**
	 * Provides an API for `addTableDefinition` to get slide reference by number
	 * @param {number} slideNum - slide number
	 * @return {PresSlide} Slide
	 * @since 3.0.0
	 */
	private readonly getSlide = (slideNum: number): PresSlide => this.slides.filter(slide => slide._slideNum === slideNum)[0]

	/**
	 * Enables the `Slide` class to set PptxGenJS [Presentation] master/layout slidenumbers
	 * @param {SlideNumberProps} slideNum - slide number config
	 */
	private readonly setSlideNumber = (slideNum: SlideNumberProps): void => {
		// 1: Add slideNumber to slideMaster1.xml
		this.masterSlide._slideNumberProps = slideNum

		// 2: Add slideNumber to DEF_PRES_LAYOUT_NAME layout
		this.slideLayouts.filter(layout => layout._name === DEF_PRES_LAYOUT_NAME)[0]._slideNumberProps = slideNum
	}

	/**
	 * Create all chart and media rels for this Presentation
	 * @param {PresSlide | SlideLayout} slide - slide with rels
	 * @param {JSZip} zip - JSZip instance
	 * @param {Promise<string>[]} chartPromises - promise array
	 */
	private readonly createChartMediaRels = (slide: PresSlide | SlideLayout, zip: JSZip, chartPromises: Array<Promise<string>>): void => {
		slide._relsChart.forEach(rel => chartPromises.push(genCharts.createExcelWorksheet(rel, zip)))
		slide._relsMedia.forEach(rel => {
			if (rel.type !== 'online' && rel.type !== 'hyperlink') {
				// A: Loop vars
				let data: string = rel.data && typeof rel.data === 'string' ? rel.data : ''

				// B: Users will undoubtedly pass various string formats, so correct prefixes as needed
				if (!data.includes(',') && !data.includes(';')) data = 'image/png;base64,' + data
				else if (!data.includes(',')) data = 'image/png;base64,' + data
				else if (!data.includes(';')) data = 'image/png;' + data

				// C: Add media
				zip.file(rel.Target.replace('..', 'ppt'), data.split(',').pop(), { base64: true })
			}
		})
	}

	/**
	 * Create and export the .pptx file
	 * @param {string} exportName - output file type
	 * @param {Blob} blobContent - Blob content
	 * @return {Promise<string>} Promise with file name
	 */
	private readonly writeFileToBrowser = async (exportName: string, blobContent: Blob): Promise<string> => {
		// STEP 1: Create element
		const eleLink = document.createElement('a')
		eleLink.setAttribute('style', 'display:none;')
		eleLink.dataset.interception = 'off' // @see https://docs.microsoft.com/en-us/sharepoint/dev/spfx/hyperlinking
		document.body.appendChild(eleLink)

		// STEP 2: Download file to browser
		// DESIGN: Use `createObjectURL()` to D/L files in client browsers (FYI: synchronously executed)
		if (window.URL.createObjectURL) {
			const url = window.URL.createObjectURL(new Blob([blobContent], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }))
			eleLink.href = url
			eleLink.download = exportName
			eleLink.click()

			// Clean-up (NOTE: Add a slight delay before removing to avoid 'blob:null' error in Firefox Issue#81)
			setTimeout(() => {
				window.URL.revokeObjectURL(url)
				document.body.removeChild(eleLink)
			}, 100)

			// Done
			return await Promise.resolve(exportName)
		}
	}

	/**
	 * Create and export the .pptx file
	 * @param {WRITE_OUTPUT_TYPE} outputType - output file type
	 * @return {Promise<string | ArrayBuffer | Blob | Buffer | Uint8Array>} Promise with data or stream (node) or filename (browser)
	 */
	private readonly exportPresentation = async (props: WriteProps): Promise<string | ArrayBuffer | Blob | Buffer | Uint8Array> => {
		const arrChartPromises: Array<Promise<string>> = []
		let arrMediaPromises: Array<Promise<string>> = []
		const zip = new JSZip()

		// STEP 1: Read/Encode all Media before zip as base64 content, etc. is required
		this.slides.forEach(slide => {
			arrMediaPromises = arrMediaPromises.concat(genMedia.encodeSlideMediaRels(slide))
		})
		this.slideLayouts.forEach(layout => {
			arrMediaPromises = arrMediaPromises.concat(genMedia.encodeSlideMediaRels(layout))
		})
		arrMediaPromises = arrMediaPromises.concat(genMedia.encodeSlideMediaRels(this.masterSlide))

		// STEP 2: Wait for Promises (if any) then generate the PPTX file
		return await Promise.all(arrMediaPromises).then(async () => {
			// A: Add empty placeholder objects to slides that don't already have them
			this.slides.forEach(slide => {
				if (slide._slideLayout) genObj.addPlaceholdersToSlideLayouts(slide)
			})

			// B: Add all required folders and files
			zip.folder('_rels')
			zip.folder('docProps')
			zip.folder('ppt').folder('_rels')
			zip.folder('ppt/charts').folder('_rels')
			zip.folder('ppt/embeddings')
			zip.folder('ppt/media')
			zip.folder('ppt/slideLayouts').folder('_rels')
			zip.folder('ppt/slideMasters').folder('_rels')
			zip.folder('ppt/slides').folder('_rels')
			zip.folder('ppt/theme')
			zip.folder('ppt/notesMasters').folder('_rels')
			zip.folder('ppt/notesSlides').folder('_rels')
			zip.file('[Content_Types].xml', genXml.makeXmlContTypes(this.slides, this.slideLayouts, this.masterSlide)) // TODO: pass only `this` like below! 20200206
			zip.file('_rels/.rels', genXml.makeXmlRootRels())
			zip.file('docProps/app.xml', genXml.makeXmlApp(this.slides, this.company)) // TODO: pass only `this` like below! 20200206
			zip.file('docProps/core.xml', genXml.makeXmlCore(this.title, this.subject, this.author, this.revision)) // TODO: pass only `this` like below! 20200206
			zip.file('ppt/_rels/presentation.xml.rels', genXml.makeXmlPresentationRels(this.slides))
			zip.file('ppt/theme/theme1.xml', genXml.makeXmlTheme(this))
			zip.file('ppt/presentation.xml', genXml.makeXmlPresentation(this))
			zip.file('ppt/presProps.xml', genXml.makeXmlPresProps())
			zip.file('ppt/tableStyles.xml', genXml.makeXmlTableStyles())
			zip.file('ppt/viewProps.xml', genXml.makeXmlViewProps())

			// C: Create a Layout/Master/Rel/Slide file for each SlideLayout and Slide
			this.slideLayouts.forEach((layout, idx) => {
				zip.file(`ppt/slideLayouts/slideLayout${idx + 1}.xml`, genXml.makeXmlLayout(layout))
				zip.file(`ppt/slideLayouts/_rels/slideLayout${idx + 1}.xml.rels`, genXml.makeXmlSlideLayoutRel(idx + 1, this.slideLayouts))
			})
			this.slides.forEach((slide, idx) => {
				zip.file(`ppt/slides/slide${idx + 1}.xml`, genXml.makeXmlSlide(slide))
				zip.file(`ppt/slides/_rels/slide${idx + 1}.xml.rels`, genXml.makeXmlSlideRel(this.slides, this.slideLayouts, idx + 1))
				// Create all slide notes related items. Notes of empty strings are created for slides which do not have notes specified, to keep track of _rels.
				zip.file(`ppt/notesSlides/notesSlide${idx + 1}.xml`, genXml.makeXmlNotesSlide(slide))
				zip.file(`ppt/notesSlides/_rels/notesSlide${idx + 1}.xml.rels`, genXml.makeXmlNotesSlideRel(idx + 1))
			})
			zip.file('ppt/slideMasters/slideMaster1.xml', genXml.makeXmlMaster(this.masterSlide, this.slideLayouts))
			zip.file('ppt/slideMasters/_rels/slideMaster1.xml.rels', genXml.makeXmlMasterRel(this.masterSlide, this.slideLayouts))
			zip.file('ppt/notesMasters/notesMaster1.xml', genXml.makeXmlNotesMaster())
			zip.file('ppt/notesMasters/_rels/notesMaster1.xml.rels', genXml.makeXmlNotesMasterRel())

			// D: Create all Rels (images, media, chart data)
			this.slideLayouts.forEach(layout => {
				this.createChartMediaRels(layout, zip, arrChartPromises)
			})
			this.slides.forEach(slide => {
				this.createChartMediaRels(slide, zip, arrChartPromises)
			})
			this.createChartMediaRels(this.masterSlide, zip, arrChartPromises)

			// E: Wait for Promises (if any) then generate the PPTX file
			return await Promise.all(arrChartPromises).then(async () => {
				if (props.outputType === 'STREAM') {
					// A: stream file
					return await zip.generateAsync({ type: 'nodebuffer', compression: props.compression ? 'DEFLATE' : 'STORE' })
				} else if (props.outputType) {
					// B: Node [fs]: Output type user option or default
					return await zip.generateAsync({ type: props.outputType })
				} else {
					// C: Browser: Output blob as app/ms-pptx
					return await zip.generateAsync({ type: 'blob', compression: props.compression ? 'DEFLATE' : 'STORE' })
				}
			})
		})
	}

	// EXPORT METHODS

	/**
	 * Export the current Presentation to stream
	 * @param {WriteBaseProps} props - output properties
	 * @returns {Promise<string | ArrayBuffer | Blob | Buffer | Uint8Array>} file stream
	 */
	async stream (props?: WriteBaseProps): Promise<string | ArrayBuffer | Blob | Buffer | Uint8Array> {
		return await this.exportPresentation({
			compression: props?.compression,
			outputType: 'STREAM',
		})
	}

	/**
	 * Export the current Presentation as JSZip content with the selected type
	 * @param {WriteProps} props output properties
	 * @returns {Promise<string | ArrayBuffer | Blob | Buffer | Uint8Array>} file content in selected type
	 */
	async write (props?: WriteProps | WRITE_OUTPUT_TYPE): Promise<string | ArrayBuffer | Blob | Buffer | Uint8Array> {
		// DEPRECATED: @deprecated v3.5.0 - outputType - [[remove in v4.0.0]]
		const propsOutpType = typeof props === 'object' && props?.outputType ? props.outputType : props ? (props as WRITE_OUTPUT_TYPE) : null
		const propsCompress = typeof props === 'object' && props?.compression ? props.compression : false

		return await this.exportPresentation({
			compression: propsCompress,
			outputType: propsOutpType,
		})
	}

	/**
	 * Export the current Presentation. Writes file to local file system if `fs` exists, otherwise, initiates download in browsers
	 * @param {WriteFileProps} props - output file properties
	 * @returns {Promise<string>} the presentation name
	 */
	async writeFile (props?: WriteFileProps | string): Promise<string> {
		const fs = typeof require !== 'undefined' && typeof window === 'undefined' ? require('fs') : null // NodeJS
		// DEPRECATED: @deprecated v3.5.0 - fileName - [[remove in v4.0.0]]
		if (typeof props === 'string') console.log('Warning: `writeFile(filename)` is deprecated - please use `WriteFileProps` argument (v3.5.0)')
		const propsExpName = typeof props === 'object' && props?.fileName ? props.fileName : typeof props === 'string' ? props : ''
		const propsCompress = typeof props === 'object' && props?.compression ? props.compression : false
		const fileName = propsExpName ? (propsExpName.toString().toLowerCase().endsWith('.pptx') ? propsExpName : propsExpName + '.pptx') : 'Presentation.pptx'

		return await this.exportPresentation({
			compression: propsCompress,
			outputType: fs ? 'nodebuffer' : null,
		}).then(async content => {
			if (fs) {
				// Node: Output
				return await new Promise<string>((resolve, reject) => {
					fs.writeFile(fileName, content, err => {
						if (err) {
							reject(err)
						} else {
							resolve(fileName)
						}
					})
				})
			} else {
				// Browser: Output blob as app/ms-pptx
				return await this.writeFileToBrowser(fileName, content as Blob)
			}
		})
	}

	// PRESENTATION METHODS

	/**
	 * Add a new Section to Presentation
	 * @param {ISectionProps} section - section properties
	 * @example pptx.addSection({ title:'Charts' });
	 */
	addSection (section: SectionProps): void {
		if (!section) console.warn('addSection requires an argument')
		else if (!section.title) console.warn('addSection requires a title')

		const newSection: SectionProps = {
			_type: 'user',
			_slides: [],
			title: section.title,
		}

		if (section.order) this.sections.splice(section.order, 0, newSection)
		else this._sections.push(newSection)
	}

	/**
	 * Add a new Slide to Presentation
	 * @param {AddSlideProps} options - slide options
	 * @returns {PresSlide} the new Slide
	 */
	addSlide (options?: AddSlideProps): PresSlide {
		// TODO: DEPRECATED: arg0 string "masterSlideName" dep as of 3.2.0
		const masterSlideName = typeof options === 'string' ? options : options?.masterName ? options.masterName : ''
		let slideLayout: SlideLayout = {
			_name: this.LAYOUTS[DEF_PRES_LAYOUT].name,
			_presLayout: this.presLayout,
			_rels: [],
			_relsChart: [],
			_relsMedia: [],
			_slideNum: this.slides.length + 1,
		}

		if (masterSlideName) {
			const tmpLayout = this.slideLayouts.filter(layout => layout._name === masterSlideName)[0]
			if (tmpLayout) slideLayout = tmpLayout
		}

		const newSlide = new Slide({
			addSlide: this.addNewSlide,
			getSlide: this.getSlide,
			presLayout: this.presLayout,
			setSlideNum: this.setSlideNumber,
			slideId: this.slides.length + 256,
			slideRId: this.slides.length + 2,
			slideNumber: this.slides.length + 1,
			slideLayout,
		})

		// A: Add slide to pres
		this._slides.push(newSlide)

		// B: Sections
		// B-1: Add slide to section (if any provided)
		// B-2: Handle slides without a section when sections are already is use ("loose" slides arent allowed, they all need a section)
		if (options?.sectionTitle) {
			const sect = this.sections.filter(section => section.title === options.sectionTitle)[0]
			if (!sect) console.warn(`addSlide: unable to find section with title: "${options.sectionTitle}"`)
			else sect._slides.push(newSlide)
		} else if (this.sections && this.sections.length > 0 && (!options?.sectionTitle)) {
			const lastSect = this._sections[this.sections.length - 1]

			// CASE 1: The latest section is a default type - just add this one
			if (lastSect._type === 'default') lastSect._slides.push(newSlide)
			// CASE 2: There latest section is NOT a default type - create the defualt, add this slide
			else {
				this._sections.push({
					title: `Default-${this.sections.filter(sect => sect._type === 'default').length + 1}`,
					_type: 'default',
					_slides: [newSlide],
				})
			}
		}

		return newSlide
	}

	/**
	 * Create a custom Slide Layout in any size
	 * @param {PresLayout} layout - layout properties
	 * @example pptx.defineLayout({ name:'A3', width:16.5, height:11.7 });
	 */
	defineLayout (layout: PresLayout): void {
		// @see https://support.office.com/en-us/article/Change-the-size-of-your-slides-040a811c-be43-40b9-8d04-0de5ed79987e
		if (!layout) console.warn('defineLayout requires `{name, width, height}`')
		else if (!layout.name) console.warn('defineLayout requires `name`')
		else if (!layout.width) console.warn('defineLayout requires `width`')
		else if (!layout.height) console.warn('defineLayout requires `height`')
		else if (typeof layout.height !== 'number') console.warn('defineLayout `height` should be a number (inches)')
		else if (typeof layout.width !== 'number') console.warn('defineLayout `width` should be a number (inches)')

		this.LAYOUTS[layout.name] = {
			name: layout.name,
			_sizeW: Math.round(Number(layout.width) * EMU),
			_sizeH: Math.round(Number(layout.height) * EMU),
			width: Math.round(Number(layout.width) * EMU),
			height: Math.round(Number(layout.height) * EMU),
		}
	}

	/**
	 * Create a new slide master [layout] for the Presentation
	 * @param {SlideMasterProps} props - layout properties
	 */
	defineSlideMaster (props: SlideMasterProps): void {
		if (!props.title) throw new Error('defineSlideMaster() object argument requires a `title` value. (https://gitbrent.github.io/PptxGenJS/docs/masters.html)')

		const newLayout: SlideLayout = {
			_margin: props.margin || DEF_SLIDE_MARGIN_IN,
			_name: props.title,
			_presLayout: this.presLayout,
			_rels: [],
			_relsChart: [],
			_relsMedia: [],
			_slide: null,
			_slideNum: 1000 + this.slideLayouts.length + 1,
			_slideNumberProps: props.slideNumber || null,
			_slideObjects: [],
			background: props.background || null,
			bkgd: props.bkgd || null,
		}

		// STEP 1: Create the Slide Master/Layout
		genObj.createSlideMaster(props, newLayout)

		// STEP 2: Add it to layout defs
		this.slideLayouts.push(newLayout)

		// STEP 3: Add background (image data/path must be captured before `exportPresentation()` is called)
		if (props.background || props.bkgd) genObj.addBackgroundDefinition(props.background, newLayout)

		// STEP 4: Add slideNumber to master slide (if any)
		if (newLayout._slideNumberProps && !this.masterSlide._slideNumberProps) this.masterSlide._slideNumberProps = newLayout._slideNumberProps
	}

	// HTML-TO-SLIDES METHODS

	/**
	 * Reproduces an HTML table as a PowerPoint table - including column widths, style, etc. - creates 1 or more slides as needed
	 * @param {string} eleId - table HTML element ID
	 * @param {TableToSlidesProps} options - generation options
	 */
	tableToSlides (eleId: string, options: TableToSlidesProps = {}): void {
		// @note `verbose` option is undocumented; used for verbose output of layout process
		genTable.genTableToSlides(
			this,
			eleId,
			options,
			options?.masterSlideName ? this.slideLayouts.filter(layout => layout._name === options.masterSlideName)[0] : null
		)
	}

	generateSlides(): string {
		let pptx = this
		pptx.layout = 'LAYOUT_WIDE';
		this.slide2(pptx);
		this.slide3(pptx);
		this.slide4(pptx);
		this.slide5(pptx);
		this.slide6(pptx);
		this.slide7(pptx);
		this.slide8(pptx);
		this.slide9(pptx);
		this.slide10(pptx);
		this.slide11(pptx);
		this.slide12(pptx);
		this.slide13(pptx);
		this.slide14(pptx);
		this.slide15(pptx);

		const fileName = 'custom_slides.pptx';
		pptx.writeFile({ fileName })
		return fileName
	}

	slide2(pptx) {
		let slide = pptx.addSlide();

		/*   let verticalTextOpts = {
			x: '5%', // Adjust the x position as needed
			y: 0, // Adjust the y position as needed
			align: 'left',
			font_size: 12,
			color: '363636',
			margin: [0, 0, 0, 0], // Set margin to zero to align with the table
			rotate: -90, // Rotate the text vertically
		  };
		  slide.addText('Vertical Text', verticalTextOpts); */
		let tableData = [
			["", "", "Positive", "Negative", "Score"],
			["1", "Item", "47.19%", "-10.59%", "36.60%"],
			["2", "Item", "45.22%", "-8.97%", "36.25%"],
			["3", "Item", "37.87%", "-8.56%", "29.31%"],
			["4", "Item", "34.48%", "-16.53%", "17.95%"],
			["5", "Item", "23.95%", "-19.22%", "4.73%"],
			["6", "Item", "25.18%", "-25.54%", "-0.36%"],
			["7", "Item", "24.17%", "-25.11%", "-0.94%"],
			// ... add data for other rows
		];

		const headingTexts = [
			{
				title: 'Subheadline: Splitname and Total (N=)',
				options: {
					x: '5%', // Set x position to 5% from the left
					y: '12%', // Set y position to 5% from the top
					w: '100%', // Set width to 40% of slide width
					align: 'left', // Align text to the left
					fontSize: 14,
					font_weight: '300',
					color: '000000', // Black color
					marginBottom: '15px'
				}
			},
			{
				title: 'Max Diff Table',
				options: {
					x: '5%', // Set x position to 5% from the left
					y: '5%', // Set y position to 5% from the top
					w: '40%', // Set width to 40% of slide width
					align: 'left', // Align text to the left
					fontSize: 20,
					font_weight: 'bold',
					color: '000000', // Black color
				}
			},
			{
				title: 'appinio',
				options: {
					x: '5%', // Left align with the table
					y: '90%', // Adjust position below the tabl
					align: 'left', // Left align the text
					font_size: 12,
					color: '363636',
				}
			},
			{
				title: 'Original Question from the Questionnaire (N=) | Original Question from the Questionnaire (N=)',
				options: {
					x: '30%', // Left align with the table
					y: '90%', // Adjust position below the tabl
					align: 'left', // Left align the text
					fontSize: 8,
					color: '363636',
				}
			}
		]

		// Table Options (customize these to match your design)
		let tableOpts: any = {
			x: '10%', // Set x position to 0
			y: '20%', // Set y position to 0
			w: "80%", // Set width to 100% of slide
			h: "20%", // Set height to 100% of slide
			fill: 'F7F7F7',
			font_size: 12,
			color: '363636',
			// border: {
			// 	pt: 0,
			// 	color: 'none'
			// }
		};
		//slide.addTable(tableData, tableOpts);
		let table = slide.addTable(tableData, tableOpts);
		// Change color of odd-numbered rows
		table._slideObjects.forEach((slideObject) => {
			if (slideObject._type === 'table') {
				slideObject.arrTabRows.forEach((row, index) => {
					if (index % 2 == 0) { // Odd-numbered row
						row.forEach(cell => {
							cell.options.fill = 'F5FAFD'; // Change fill color to light gray
						});
					}
				});
			}
		});

		headingTexts.forEach((heading) => {
			slide.addText(heading.title, heading.options);
		})
	}

	slide3(pptx) {
		let slide = pptx.addSlide();

		let waterfallData = [
			{
				labelsY: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
				labelsX: [1, 2, 3], // Category labels for X-axis
				values: [55, 80, 90], // Data values for each category
			},
		];

		const waterFallOptions = {
			color: '7fa1f9',
		}

		slide.addChart(pptx.ChartType.waterfall, waterfallData, waterFallOptions);
	}

	slide4(pptx) {
		let slide = pptx.addSlide();

		let headingTextOpts = {
			align: 'left',
			fontSize: 14,
			font_weight: '300',
			color: '000000',
			marginBottom: '15px'
		};

		let tableData1 = [
			["Rank", "Flavour Combination", "Reach", "Frequency"],
			["1", "Orange", "64%", "-10.59%", "1"],
			["2", "Apple", "62%", "-8.97%", "1"],
			["3", "Peach", "51%", "-8.97%", "1"],
		];

		let tableData2 = [
			["Rank", "Flavour Combination", "Reach", "Frequency"],
			["1", "Orange", "64%", "-10.59%", "1"],
			["2", "Apple", "62%", "-8.97%", "1"],
			["3", "Peach", "51%", "-8.97%", "1"],
		];

		let tableOpts: any = {
			w: "40%", // Set width to 40% of slide for each table
			h: "20%", // Set height to 100% of slide for each table
			fill: 'F7F7F7',
			font_size: 12,
			color: '363636',
			// border: { // This removes borders
			// 	pt: 0,
			// 	color: 'none'
			// },
			gridLineColor: 'none'
		};

		const headingTexts = [
			{
				title: 'Portfolio Size: 1 Flavour',
				options: { ...headingTextOpts, x: '15%', y: '17%', }
			},
			{
				title: 'Portfolio Size: 2 Flavours',
				options: { ...headingTextOpts, x: '65%', y: '17%', }
			},
			{
				title: 'Portfolio Size: 3 Flavours',
				options: { ...headingTextOpts, x: '15%', y: '51%', }
			},
			{
				title: 'Portfolio Size: 4 Flavours',
				options: { ...headingTextOpts, x: '65%', y: '51%', }
			},
			{
				title: 'Subheadline: Splitname and Total (N=)',
				options: {
					x: '5%',
					y: '12%',
					w: '100%',
					align: 'left',
					fontSize: 14,
					font_weight: '300',
					color: '000000',
					marginBottom: '15px'
				}
			},
			{
				title: 'TURF Analysis (Optimal number of flavor combinations',
				options: {
					x: '5%',
					y: '5%',
					w: '100%',
					align: 'left',
					fontSize: 20,
					font_weight: 'bold',
					color: '000000',
				}
			},
			{
				title: 'appinio',
				options: {
					x: '5%',
					y: '85%', // Adjust position below the tables
					align: 'left',
					font_size: 12,
					color: '363636',
				}
			},
			{
				title: 'Original Question from the Questionnaire (N=) | Original Question from the Questionnaire (N=)',
				options: {
					x: '55%',
					y: '85%', // Adjust position below the tables
					align: 'left',
					fontSize: 8,
					color: '363636',
				}
			}
		]

		// First Col
		let table1 = slide.addTable(tableData1, { ...tableOpts, x: '5%', y: '20%' });
		let table2 = slide.addTable(tableData2, { ...tableOpts, x: '55%', y: '20%' });

		// Second Col
		let table3 = slide.addTable(tableData1, { ...tableOpts, x: '5%', y: '55%' });
		let table4 = slide.addTable(tableData2, { ...tableOpts, x: '55%', y: '55%' });

		// Change color of odd-numbered rows for all tables
		[table1, table2, table3, table4].forEach(table => {
			table._slideObjects.forEach((slideObject) => {
				if (slideObject._type === 'table') {
					slideObject.arrTabRows.forEach((row, index) => {
						if (index === 0) {
							row.forEach(cell => {
								cell.options.fill = '444790';
								cell.options.color = 'FFFFFF'
							});
						} else {
							row.forEach(cell => {
								cell.options.fill = 'f3f7fc';
							});
						}
					});
				}
			});
		});

		headingTexts.forEach((heading) => {
			slide.addText(heading.title, heading.options)
		})
	}

	slide5(pptx) {
		let slide = pptx.addSlide();
		let funnelChartData = [
			{
				name: 'Funnel Step 1',
				value: 100,
				type: 'percent'
			},
			{
				name: 'Funnel Step 2',
				value: 80,
				type: 'percent'
			},
			{
				name: 'Funnel Step 3',
				value: 13,
				type: 'percent'
			},
			{
				name: 'Funnel Step 4',
				value: 10,
				type: 'percent'
			},
		]

		const chartOptions = {
			h: 2,   // height of the chart
			color: 'ffffff', // Text Color
			chartColors: ['7FA1F9', 'F9B27E', '885EE0', '8ED19C'], // Bar Colors
			align: 'left',
			fontSize: 12,
			position: 'left',
			y: 2.5
		};
		slide.addChart(pptx.ChartType.funnel, funnelChartData, chartOptions);

		let tableData = [
			["", "Absolute", "Relative", "Conversion Rate"],
			["Total", "X", "X%", ''],
			["Funnel Step 1", "X", "X%", "X%"],
			["Funnel Step 2", "X", "X%", "X%"],
			["Funnel Step 3", "X", "X%", "X%"],
		]

		slide.addText("hello", {
			w: '5%',
			h: '15%',
			x: '52%',
			y: '20%',
			color: '779DFF',
			fill: '779DFF'
		})

		slide.addText("hello", {
			w: '5%',
			h: '15%',
			x: '52%',
			y: '35%',
			color: 'F9B27E',
			fill: 'F9B27E'
		})

		slide.addText("hello", {
			w: '5%',
			h: '15%',
			x: '52%',
			y: '50%',
			color: '885EE0',
			fill: '885EE0'
		})

		slide.addText("hello", {
			w: '5%',
			h: '15%',
			x: '52%',
			y: '65%',
			color: '8ED19C',
			fill: '8ED19C'
		})

		let tableOpts: any = {
			w: "40%", // Set width to 40% of slide for each table
			h: "60%", // Set height to 100% of slide for each table
			fill: 'F7F7F7',
			font_size: 12,
			color: '363636',
			// border: { // This removes borders
			// 	pt: 0,
			// 	color: 'none'
			// },
			// gridLineColor: 'none'
		};

		let Table = slide.addTable(tableData, { ...tableOpts, x: '55%', y: '20%' });
		[Table].forEach(table => {
			table._slideObjects.forEach((slideObject) => {
				if (slideObject._type === 'table') {
					slideObject.arrTabRows.forEach((row, index) => {
						if (index === 0) {
							row.forEach(cell => {
								cell.options.fill = 'ffffff';
								cell.options.color = '000000'
							});
						}
						if (index % 2 == 0 && index !== 0) { // Odd-numbered row
							row.forEach(cell => {
								cell.options.fill = 'F5FAFD';
							});
						}
					});
				}
			});
		});
	}

	slide6(pptx) {
		let slide = pptx.addSlide();
		let headingTextOpts = {
			align: 'left',
			fontWeight: 'bold',
			color: '000000',
			marginBottom: '15px'
		};

		const headingsText = [
			{
				title: 'INSIGHT REPORT',
				options: { ...headingTextOpts, y: '20%', fontSize: 70 }
			},
			{
				title: 'Project Name',
				options: { ...headingTextOpts, y: '50%', fontSize: 45, color: '0270C0' }
			},
			{
				title: 'Date',
				options: { ...headingTextOpts, y: '60%', fontSize: 35 }
			},
			{
				title: 'appinio',
				options: { ...headingTextOpts, y: '85%', fontSize: 30, fontFamily: 'Aeonik Light' }
			},
			{
				title: 'Month Year',
				options: { ...headingTextOpts, x: '25%', y: '85%', fontSize: 25 }
			}
		]

		headingsText.forEach((heading) => {
			slide.addText(heading.title, heading.options)
		})
	}

	slide7(pptx) {
		let slide = pptx.addSlide();

		let slideWidth = 960; // Adjust based on your slide size
		let slideHeight = 720; // Adjust based on your slide size

		// Define left section width (percentage)
		let leftSectionWidth = 40;

		// Create left section background shape
		let leftSection = slide.addShape('rect', {
			x: 0,
			y: 0,
			w: slideWidth * (leftSectionWidth / 100),
			h: slideHeight,
			fill: '000000', // Adjust background color as needed
		});

		// Add content text on the left side
		let contentText = [
			"Agenda",
			"01 Study Design",
			"02 Executive Summary",
			"03 Detailed Results",
			"05 Contact"
		];

		let textOpts: any = {
			align: 'left',
			fontWeight: 'bold',
			marginBottom: '15px',
			height: '100%',
		};

		const textopt = {
			x: '5%',
			h: '100%',
			w: '25%',
			fill: "F3F7FC",
			fontSize: 24,
		}

		let yPosition = 10; // Starting y position for text
		slide.addText('', {
			x: 0,
			h: '200%',
			w: '33%',
			fill: "F3F7FC",
			fontSize: 24,
		});

		contentText.forEach((text, index) => {
			console.log('text', text, yPosition)
			if (index === 0) {
				slide.addText(text, { ...textopt, y: '-45%', x: '5%', fontSize: 12 });
			} else {
				slide.addText(text, { ...textOpts, y: yPosition + '%', x: '5%' });
			}
			yPosition += 10; // Update y position for next text
		});

		// Add lorem ipsum text on the right side
		let loremIpsum = "This is dummy text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At imperdiet dui accumsan sit amet nulla. Bibendum at varius vel pharetra vel turpis nunc eget. Sagittis purus sit amet volutpat consequat mauris nunc congue. Eu facilisis sed odio morbi quis commodo odio aenean. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Enim eu turpis egestas pretium aenean pharetra magna ac. Tincidunt ornare massa eget egestas. In fermentum posuere urna nec tincidunt praesent. Lorem mollis aliquam ut porttitor leo a. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. Porttitor rhoncus dolor purus non enim praesent elementum. Aenean pharetra magna ac placerat";

		const loremIpsumText2 = "Non consectetur a erat nam at. Tortor consequat id porta nibh venenatis cras. Et ligula ullamcorper malesuada proin libero nunc consequat. At tellus at urna condimentum mattis. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Sed sed risus pretium quam. Suspendisse faucibus interdum posuere lorem ipsum. Ultricies mi eget mauris pharetra et ultrices neque ornare. Faucibus scelerisque eleifend donec pretium vulputate sapien. Scelerisque fermentum dui faucibus in ornare quam. Faucibus pulvinar elementum integer enim neque. Urna duis convallis convallis tellus id interdum velit laoreet id. Vehicula ipsum a arcu cursus vitae. Quam lacus suspendisse faucibus interdum posuere. Massa enim nec dui nunc. Ultrices tincidunt arcu non sodales. Tempus iaculis urna id volutpat lacus laoreet non. Ac turpis egestas integer eget aliquet. Cum sociis natoque penatibus et magnis dis."

		let loremIpsumTextOpts = {
			align: 'left',
			color: '000000'
		};
		slide.addText('Introduction to Study', { ...loremIpsumTextOpts, x: `${leftSectionWidth - 5}%`, y: '10%', w: '65%', marginBottom: 20 })

		slide.addText(loremIpsum, { ...loremIpsumTextOpts, x: '35%', fontSize: 12, y: '40%', w: '30%' });

		slide.addText(loremIpsumText2, { ...loremIpsumTextOpts, x: '65%', fontSize: 12, y: '40%', w: '30%' });
	}

	slide8(pptx) {
		let slide = pptx.addSlide();
		slide.background = { color: 'E0E9FD' }

		const textopt = {
			x: '5%',
		}

		const headingsText = [
			{
				title: '01',
				options: {
					...textopt, y: '10%', fontSize: 70
				}
			},
			{
				title: 'Chapter Slide',
				options: {
					...textopt, y: '30%', fontSize: 70
				}
			},
			{
				title: 'appinio',
				options: {
					...textopt, y: '90%', fontSize: 24,
				}
			}
		]

		headingsText.forEach((heading) => {
			slide.addText(heading.title, heading.options)
		})
	}

	slide9(pptx) {
		let slide = pptx.addSlide();

		const textopt = {
			fontSize: 20,
		};

		const card1 = [
			{
				title: 'Study Design',
				options: { y: '10%', fontSize: 20 }
			},
			{
				title: 'Method & Data Collection',
				options: {
					...textopt, x: '10%', w: '15%', fill: "F5FAFD", y: '22%', h: '10%'
				}
			},
			{
				image: 'https://res.cloudinary.com/drascgtap/image/upload/v1715060877/Qibble%20App/d7orwyzdkyxgtemc2pdp.png',
				options: {
					h: '10%', y: '22%', x: '25%', w: '10%'
				}
			},
			{
				title: 'Objective of the survey/General method used. Mobile questionnaire played out via the Appinio app',
				options: { ...textopt, y: '31%', x: '10%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%' }
			},
			{
				title: 'Number of Questions',
				options: { ...textopt, y: '40%', x: '10%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%' }
			},
			{
				title: 'The survey took place from January 9th, 2023 to January 17th, 2023',
				options: { ...textopt, y: '49%', x: '10%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%' }
			},
			{
				title: 'The survey took place from January 9th, 2023 to January 17th, 2023',
				options: { ...textopt, y: '49%', x: '10%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%' }
			}
		]

		const card2 = [
			{
				title: 'Sample',
				options: { ...textopt, x: '40%', w: '15%', fill: "F5FAFD", y: '22%', h: '10%' }
			},
			{
				image: 'https://res.cloudinary.com/drascgtap/image/upload/v1715060842/Qibble%20App/kf5rpwcom9yiyaranevn.png',
				options: { h: '10%', y: '22%', x: '55%', w: '10%' }
			},
			{
				title: 'Country/Location details',
				options: { ...textopt, y: '31%', x: '40%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%' }
			},
			{
				title: 'Details on the total N (Age/Sample)',
				options: { ...textopt, y: '40%', x: '40%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%' }
			},
			{
				title: 'Quota Specifics/distribution',
				options: { ...textopt, y: '49%', x: '40%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%' }
			}
		]

		const card3 = [
			{
				title: 'Questionnaire',
				options: { ...textopt, x: '70%', w: '15%', fill: "F5FAFD", y: '22%', h: '10%' }
			},
			{
				image: 'https://res.cloudinary.com/drascgtap/image/upload/v1715060808/Qibble%20App/xi1l9dycmj7k3hkkxxct.png',
				options: { h: '12%', y: '22%', x: '85%', w: '10%' }
			},
			{
				title: 'First goal of questionnair',
				options: { ...textopt, y: '31%', x: '70%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%', margin: 5 }
			},
			{
				title: 'Second goal of questionnair',
				options: { ...textopt, y: '40%', x: '70%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%', margin: 5 }
			},
			{
				title: 'Third goal of questionnair',
				options: { ...textopt, y: '49%', x: '70%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%', margin: 5 }
			}, {
				title: 'appinio',
				options: { ...textopt, y: '90%', fontSize: 24 }
			}
		]

		card1.forEach((card) => {
			if (card.title) {
				slide.addText(card.title, card.options)
			} else if (card.image) {
				const imageOptions = {
					path: card.image,
					...card.options
				}
				slide.addImage(imageOptions)
			}
		})

		card2.forEach((card) => {
			if (card.title) {
				slide.addText(card.title, card.options)
			} else if (card.image) {
				const imageOptions = {
					path: card.image,
					...card.options
				}
				slide.addImage(imageOptions)
			}
		})

		card3.forEach((card) => {
			if (card.title) {
				slide.addText(card.title, card.options)
			} else if (card.image) {
				const imageOptions = {
					path: card.image,
					...card.options
				}
				console.log('imageOptions', imageOptions)
				slide.addImage(imageOptions)
			}
		})

	}

	slide10(pptx) {
		let slide = pptx.addSlide();
		const headingsText = [
			{
				title: 'Sample Overview',
				options: { y: '10%', x: '5%', fontSize: 20 }
			},
			{
				title: '1000',
				options: { y: '25%', x: '5%', fontSize: 50 }
			},
			{
				title: 'Participants',
				options: { y: '30%', x: '5%', fontSize: 10, color: '777777' }
			},
			{
				title: '39.5',
				options: { y: '25%', x: '20%', fontSize: 50 }
			},
			{
				title: 'Average Ages in years',
				options: { y: '30%', x: '20%', fontSize: 10, color: '777777' }
			},
			{
				title: 'Age & Gender',
				options: { y: '40%', x: '5%', fontSize: 20 }
			},
			{
				title: 'United States',
				options: { y: '75%', x: "55%", fontSize: 50 }
			},
			{
				title: 'United States',
				options: { y: '75%', x: "55%", fontSize: 50 }
			},
			{
				title: '10.04.22',
				options: { y: '90%', x: "55%", fontSize: 16 }
			},
			{
				title: 'Start Date',
				options: { y: '93%', x: "55%", fontSize: 8, color: '777777' }
			},
			{
				title: '7 Days',
				options: { y: '90%', x: "65%", fontSize: 16 }
			},
			{
				title: 'Field Time',
				options: { y: '93%', x: "65%", fontSize: 8, color: '777777' }
			},
			{
				title: '34',
				options: { y: '90%', x: "75%", fontSize: 16 }
			},
			{
				title: 'Number of Questions',
				options: { y: '93%', x: "75%", fontSize: 8, color: '777777' }
			},
			{
				title: 'appinio',
				options: { y: '95%', x: "5%", fontSize: 14 }
			},
			{
				image: 'https://res.cloudinary.com/drascgtap/image/upload/v1715068058/Qibble%20App/c5xay6vcb96euuryamp7.png',
				options: { y: '10%', x: '50%', h: '60%', w: '50%' }
			}
		]

		headingsText.forEach((heading) => {
			if (heading.title) {
				slide.addText(heading.title, heading.options)
			} else if (heading.image) {
				slide.addImage({ path: heading.image, ...heading.options })
			}
		})

		const chartData =
		{
			names: ['16-24', '25-34', '35-44', '45-54', '55-65'],
			labels: ['Women', 'Men'],
			values: [{ women: '200', men: '200' }, { women: '200', men: '200' }, { women: '200', men: '200' }, { women: '200', men: '200' }, { women: '200', men: '200' }]
		}


		let namesYpos = 50;
		let namesXpos = 5;

		let valuesYpos = 48;

		chartData.names.forEach((name) => {
			slide.addText(name, { y: `${namesYpos}%`, x: `${namesXpos}%`, fontSize: 12 })
			namesYpos = namesYpos + 7
		});

		chartData.values.map((value) => {
			let valuesXpos = 20;

			slide.addText(value.women, { y: `${valuesYpos}%`, x: `${valuesXpos}%`, fontSize: 12, h: '5%', w: '15%', fill: '8260D9', align: 'center' })

			valuesXpos = valuesXpos + 15

			slide.addText(value.men, { y: `${valuesYpos}%`, x: `${valuesXpos}%`, fontSize: 12, h: '5%', w: '15%', fill: 'EA8B54', align: 'center' })

			valuesYpos = valuesYpos + 7

		})

		let labelsYpos = valuesYpos
		let labelsXpos = 20

		chartData.labels.map((label) => {
			slide.addText(label, { y: `${labelsYpos}%`, x: `${labelsXpos}%`, fontSize: 12, h: '5%', w: '15%', align: 'center' })
			labelsXpos = labelsXpos + 15
		})
	}

	slide11(pptx) {
		let slide = pptx.addSlide();

		const textopt = {
			x: '5%',
		}

		let loremIpsumTextOpts = {
			align: 'left',
			color: '000000'
		};

		const headingsText = [
			{
				title: 'Executive Summary',
				options: {
					x: 0, y: '10%', fontSize: 20,
				}
			},
			{
				title: 'Only have one big key insight in the summary? This is a nice space to highlight the main insight or just introduce the insight summary.',
				options: {
					...textopt, y: '30%', fontSize: 20, w: '50%',
				}
			},
			{
				title: 'This is dummy text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At imperdiet dui accumsan sit amet nulla. Bibendum at varius vel pharetra vel turpis nunc eget. Sagittis purus sit amet volutpat consequat mauris nunc congue. Eu facilisis sed odio morbi quis commodo odio aenean. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Enim eu turpis egestas pretium aenean pharetra magna ac. Tincidunt ornare massa eget egestas. In fermentum posuere urna nec tincidunt praesent. Lorem mollis aliquam ut porttitor leo a. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. Porttitor rhoncus dolor purus non enim praesent elementum. Aenean pharetra magna ac placerat',
				options: { ...loremIpsumTextOpts, x: '5%', fontSize: 10, y: '55%', w: '30%' }
			},
			{
				title: 'vestibulum lectus mauris ultrices eros. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Massa tincidunt dui ut ornare lectus sit. Vulputate sapien nec sagittis aliquam malesuada. Elementum sagittis vitae et leo duis ut diam. Nec feugiat in fermentum posuere urna nec tincidunt praesent semper.Est sit amet facilisis magna etiam tempor orci. Non consectetur a erat nam at. Tortor consequat id porta nibh venenatis cras. Et ligula ullamcorper malesuada proin libero nunc consequat. At tellus at urna condimentum mattis. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper.',
				options: { ...loremIpsumTextOpts, x: '35%', fontSize: 10, y: '52%', w: '30%' }
			},
			{
				title: 'Sed sed risus pretium quam. Suspendisse faucibus interdum posuere lorem ipsum. Ultricies mi eget mauris pharetra et ultrices neque ornare. Faucibus scelerisque eleifend donec pretium vulputate sapien. Scelerisque fermentum dui faucibus in ornare quam.',
				options: { ...loremIpsumTextOpts, x: '5%', fontSize: 10, y: '82%', w: '30%' }
			},
			{
				title: 'appinio',
				options: {
					x: 0, y: '95%', fontSize: 16,
				}
			}
		]

		headingsText.forEach((heading) => {
			slide.addText(heading.title, heading.options)
		})
	}

	slide12(pptx) {
		let slide = pptx.addSlide();

		const headingsText = [
			{
				title: 'Any questions? We are happy to help!',
				options: { fontSize: 20, y: '10%', x: '5%' }
			},
			{
				image: 'https://res.cloudinary.com/drascgtap/image/upload/v1715070468/Qibble%20App/dvcpusdcg5jpnh4nvhlj.png',
				options: { w: '10%', h: '20%', y: '20%', x: '10%' }
			},
			{
				title: 'Name',
				options: { fontSize: 40, y: '25%', x: '20%' }
			},
			{
				title: 'Position',
				options: { fontSize: 20, y: '30%', x: '20%' }
			},
			{
				title: 'Office',
				options: { fontSize: 8, y: '35%', x: '20%', color: '777777' }
			},
			{
				title: '+49',
				options: { fontSize: 8, y: '35%', x: '25%', color: '777777' }
			},
			{
				title: 'Mail',
				options: { fontSize: 8, y: '37%', x: '20%', color: '777777' }
			},
			{
				title: 'Louise.leitsch@appinio.com',
				options: { fontSize: 8, y: '37%', x: '25%', color: '777777' }
			},
			{
				image: 'https://res.cloudinary.com/drascgtap/image/upload/v1715070468/Qibble%20App/dvcpusdcg5jpnh4nvhlj.png',
				options: { w: '10%', h: '20%', y: '50%', x: '10%' }
			},
			{
				title: 'Name',
				options: { fontSize: 40, y: '55%', x: '20%' }
			},
			{
				title: 'Position',
				options: { fontSize: 20, y: '60%', x: '20%' }
			},
			{
				title: 'Office',
				options: { fontSize: 8, y: '65%', x: '20%', color: '777777' }
			},
			{
				title: '+49',
				options: { fontSize: 8, y: '65%', x: '25%', color: '777777' }
			},
			{
				title: 'Mail',
				options: { fontSize: 8, y: '67%', x: '20%', color: '777777' }
			},
			{
				title: 'Louise.leitsch@appinio.com',
				options: { fontSize: 8, y: '67%', x: '25%', color: '777777' }
			},
			{
				title: 'appinio',
				options: { fontSize: 14, y: '90%', x: '5%' }
			},
			{
				title: 'Appinio Germany Grobe Theaterstrabe 31 20354 Hamburg',
				options: { fontSize: 10, y: '90%', x: '25%', w: '10%' }
			},
			{
				title: 'Appinio Germany Grobe Theaterstrabe 31 20354 Hamburg',
				options: { fontSize: 10, y: '90%', x: '65%', w: '10%' }
			},
			{
				title: 'appinio.com',
				options: { fontSize: 10, y: '90%', x: '85%', w: '10%' }
			},
		]

		headingsText.forEach((heading) => {
			if (heading.title) {
				slide.addText(heading.title, heading.options)
			} else if (heading.image) {
				slide.addImage({ path: heading.image, ...heading.options })
			}
		})
	}

	slide13(pptx) {
		let slide = pptx.addSlide();

		const headingsText = [
			{
				title: 'Are you planning to go on vacation this year?',
				options: {
					y: '10%',
					x: '5%',
					fontSize: 20
				}
			},
			{
				title: 'Total: (N = 1000)',
				options: {
					y: '13%',
					x: '5%',
					fontSize: 10
				}
			},
			{
				title: 'Insights',
				options: {
					y: '18%',
					x: '60%',
					w: '100%',
					fontSize: 8,
					color: '777777',
				}
			},
			{
				title: 'Insight Headline in Aeonik Medium​ Write the copy of the insight in Aeonik light. Try to not highlight any part of the copy. The Headline functions as the highlighted part.',
				options: {
					y: '30%',
					x: '60%',
					fontSize: 12,
					w: '18%',
					color: '777777',
				}
			},
			{
				title: 'Insight Headline in Aeonik Medium​ Write the copy of the insight in Aeonik light. Try to not highlight any part of the copy. The Headline functions as the highlighted part.',
				options: {
					y: '52%',
					x: '60%',
					fontSize: 12,
					w: '18%',
					color: '777777',
				}
			},
			{
				title: 'appinio',
				options: {
					y: '95%',
					x: '5%',
					fontSize: 20,
				}
			},
			{
				title: 'Are you planning to go on vacation this year?: N =1000',
				options: {
					y: '93%',
					x: '15%',
					fontSize: 8,
				}
			}
		]

		headingsText.forEach((heading) => {
			slide.addText(heading.title, heading.options)
		})

		let dataChartBar = [
			{
				name: "Actual Sales",
				labels: [["Yes", "No", "I donot know yet"]],
				values: [54, 23, 24],
			},
		];


		const chartOptions = {
			// Set grid and axis line colors to white (almost invisible)
			gridLineColor: 'ffffff',
			catAxisLineColor: 'ffffff',
			valAxisLineColor: 'ffffff',
			catGridLineColor: 'ffffff',
			valGridLineColor: 'ffffff',
			catGridLine: { style: 'none' },
			valGridLine: { style: 'none' },
			valAxisHidden: true,
			barGapWidthPct: 20,
			showValueAxis: false,
			chartColors: ['779DFF'],
			valAxis: {
				label: { // Configure value label properties
					font: {
						size: 1 // Adjust font size as needed (smaller for less visibility)
					}
				}
			}
		};

		slide.addChart(pptx.ChartType.bar, dataChartBar, chartOptions);
	}

	slide14(pptx) {
		let slide = pptx.addSlide();
		const headingsText = [
			{
				title: 'Are you planning to go on vacation this year?',
				options: {
					y: '10%',
					x: '5%',
					fontSize: 20
				}
			},
			{
				title: 'Total: (N = 1000)',
				options: {
					y: '13%',
					x: '5%',
					fontSize: 10
				}
			},
			{
				title: 'Insights',
				options: {
					y: '18%',
					x: '10%',
					w: '100%',
					fontSize: 8,
					color: '777777',
				}
			},
			{
				title: 'Insight Headline in Aeonik Medium​ Write the copy of the insight in Aeonik light. Try to not highlight any part of the copy. The Headline functions as the highlighted part.',
				options: {
					y: '30%',
					x: '10%',
					fontSize: 12,
					w: '18%',
					color: '777777',
				}
			},
			{
				title: 'Insight Headline in Aeonik Medium​ Write the copy of the insight in Aeonik light. Try to not highlight any part of the copy. The Headline functions as the highlighted part.',
				options: {
					y: '52%',
					x: '10%',
					fontSize: 12,
					w: '18%',
					color: '777777',
				}
			},
			{
				title: 'appinio',
				options: {
					y: '95%',
					x: '5%',
					fontSize: 20,
				}
			},
			{
				title: 'Are you planning to go on vacation this year?: N =1000',
				options: {
					y: '93%',
					x: '15%',
					fontSize: 8,
				}
			}
		]

		headingsText.forEach((heading) => {
			slide.addText(heading.title, heading.options)
		})

		let dataChartBar = [
			{
				name: "Actual Sales",
				labels: [["Yes", "No", "I donot know yet"]],
				values: [54, 23, 24],
			},
		];


		const chartOptions = {
			// Set grid and axis line colors to white (almost invisible)
			gridLineColor: 'ffffff',
			catAxisLineColor: 'ffffff',
			valAxisLineColor: 'ffffff',
			catGridLineColor: 'ffffff',
			valGridLineColor: 'ffffff',
			catGridLine: { style: 'none' },
			valGridLine: { style: 'none' },
			valAxisHidden: true,
			barGapWidthPct: 20,
			showValueAxis: false,
			chartColors: ['779DFF'],
			x: 5
		};

		slide.addChart(pptx.ChartType.bar, dataChartBar, chartOptions);
	}

	slide15(pptx) {
		let slide = pptx.addSlide();

		const headingsText = [
			{
				title: 'Are you planning to go on vacation this year?',
				options: {
					y: '10%',
					x: '5%',
					fontSize: 20
				}
			},
			{
				title: 'Total: (N = 1000) / Split: Age Groups',
				options: {
					y: '13%',
					x: '5%',
					fontSize: 10
				}
			},
			{
				title: 'Insights',
				options: {
					y: '20%',
					x: '60%',
					w: '100%',
					fontSize: 8,
					color: '777777',
				}
			},
			{
				title: 'Insight Headline in Aeonik Medium Write the copy of the insight in Aeonik light. Try to not highlight any part of the copy. The Headline functions as the highlighted part.',
				options: {
					y: '32%',
					x: '60%',
					fontSize: 12,
					w: '18%',
					color: '777777',
				}
			},
			{
				title: 'Insight Headline in Aeonik Medium Write the copy of the insight in Aeonik light. Try to not highlight any part of the copy. The Headline functions as the highlighted part.',
				options: {
					y: '54%',
					x: '60%',
					fontSize: 12,
					w: '18%',
					color: '777777',
				}
			},
			{
				title: '',
				options: {
					y: '80%',
					x: '20%',
					h: "3%",
					w: "2%",
					fill: {
						color: 'B6C9FF'
					},
					color: 'FFFFFF'
				}
			},
			{
				title: '16-24',
				options: {
					y: '82%',
					x: '23%',
				}
			},
			{
				title: '',
				options: {
					y: '80%',
					x: '30%',
					h: "3%",
					w: "2%",
					fill: {
						color: '769DFF'
					},
					color: 'FFFFFF'
				}
			},
			{
				title: '25-34',
				options: {
					y: '82%',
					x: '33%',
				}
			},
			{
				title: '',
				options: {
					y: '80%',
					x: '40%',
					h: "3%",
					w: "2%",
					fill: {
						color: '3C6FFF'
					},
					color: 'FFFFFF'
				}
			},
			{
				title: '35-44',
				options: {
					y: '82%',
					x: '43%',
				}
			},
			{
				title: '',
				options: {
					y: '80%',
					x: '50%',
					h: "3%",
					w: "2%",
					fill: {
						color: '2D54C2'
					},
					color: 'FFFFFF'
				}
			},
			{
				title: '45-54',
				options: {
					y: '82%',
					x: '53%',
				}
			},
			{
				title: '',
				options: {
					y: '80%',
					x: '60%',
					h: "3%",
					w: "2%",
					fill: {
						color: '1E3A84'
					},
					color: 'FFFFFF'
				}
			},
			{
				title: '55-65',
				options: {
					y: '82%',
					x: '63%',
				}
			},
			{
				title: 'appinfo',
				options: {
					y: '95%',
					x: '5%',
					fontSize: 20,
				}
			},
			{
				title: 'Are you planning to go on vacation this year?: N =1000',
				options: {
					y: '93%',
					x: '15%',
					fontSize: 8,
				}
			}
		]

		headingsText.forEach((heading) => {
			slide.addText(heading.title, heading.options)
		})

		let dataChartBar = [
			{
				labels: [["Category 1", "Category 2", "Category 3"]],
				values: [100, 100, 100, 100, 100, 100],
			},
			{
				labels: [["Category 1", "Category 2", "Category 3"]],
				values: [100, 100, 100, 100, 100, 100],
			},
			{
				labels: [["Category 1", "Category 2", "Category 3"]],
				values: [100, 100, 100, 100, 100, 100],
			},
			{
				labels: [["Category 1", "Category 2", "Category 3"]],
				values: [100, 100, 100, 100, 100, 100],
			},
			{
				labels: [["Category 1", "Category 2", "Category 3"]],
				values: [100, 100, 100, 100, 100, 100],
			},
			// ... add more categories if needed
		];


		const chartOptions = {
			// Set grid and axis line colors to white (almost invisible)
			gridLineColor: 'ffffff',
			catAxisLineColor: 'ffffff',
			valAxisLineColor: 'ffffff',
			catGridLineColor: 'ffffff',
			valGridLineColor: 'ffffff',
			catGridLine: { style: 'none' },
			valGridLine: { style: 'none' },
			barGapWidthPct: 200,
			valAxisHidden: true,
			showValueAxis: false,
			chartColors: ['B6C9FF', '769DFF', '3C6FFF', '2D54C2', '1E3A84'],
			// x: 5,
			y: 2
		};

		slide.addChart(pptx.ChartType.bar, dataChartBar, chartOptions);
	}
}
