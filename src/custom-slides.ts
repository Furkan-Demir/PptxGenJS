import { slide10Data, slide11Data, slide12Data, slide13Data, slide14Data, slide15Data, slide1Data, slide2Data, slide3Data, slide4Data, slide5Data, slide6Data, slide7Data, slide8Data, slide9Data } from "./mock-data";

function slide1(pptx) {
    let slide = pptx.addSlide();
    const headingTexts = slide1Data.headingTexts

    headingTexts.forEach((heading) => {
        slide.addText(heading.title, heading.options)
    })

    const top = slide1Data.topDataValues
    let topX = 3.6

    top.forEach((txt) => {
        slide.addText(`${txt}`, { x: topX, y: 1.5, fontSize: 14 })
        topX += 0.5
    })

    // Add the chart to the slide
    slide.addChart(pptx.ChartType.bar, slide1Data.data, slide1Data.options);
}
function
    slide2(pptx) {
    let slide = pptx.addSlide();
    const headingTexts = slide2Data.headingTexts

    let table = slide.addTable(slide2Data.data, slide2Data.options);
    // Change color of odd-numbered rows
    table._slideObjects.forEach((slideObject) => {
        if (slideObject._type === 'table') {
            slideObject.arrTabRows.forEach((row, index) => {
                if (index % 2 == 0) { // Odd-numbered row
                    row.forEach(cell => {
                        cell.options.fill = 'F5FAFD'; // Change fill color to light gray
                    });
                } else {
                    row.forEach(cell => {
                        cell.options.fill = 'FFFFFF'; // Change fill color to light gray
                    });
                }

                row.forEach((cell,ind) => {
                    if(ind == row?.length - 1 && ind != 0) {
                        let splitedText = cell?.text?.split("%")[0]
                        cell.options.color = splitedText == 'Score' ? '000000' : splitedText > 0 ? '008000' : 'FF0000'
                    }
                });
            });
        }
    });

    headingTexts.forEach((heading) => {
        slide.addText(heading.title, heading.options);
    })
}
function
    slide3(pptx) {
    let slide = pptx.addSlide();
    slide3Data.headingTexts.forEach((heading)=>{
        slide.addText(heading.title, heading.options)
    })
    slide.addChart(pptx.ChartType.waterfall, slide3Data.data, slide3Data.options);
}
function
    slide4(pptx) {
    let slide = pptx.addSlide();

    let tableData1 = slide4Data.data[0];

    let tableData2 = slide4Data.data[1];

    let tableOpts = slide4Data.options;

    const headingTexts = slide4Data.headingTexts()

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
function
    slide5(pptx) {
    let slide = pptx.addSlide();
    slide.addChart(pptx.ChartType.funnel, slide5Data.data[0], slide5Data.options);
    let tableData = slide5Data.data[1]

    slide.addText("Brand Funnel", {
        x: '3%',
        y: '5%',
        color: '000000',
    })

    slide.addText("Subheadline: Splitname and Total (N=)", {
        x: '3%',
        y: '9%',
        color: '000000',
        fontSize:11
    })

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

    slide.addText("KPI", {
        x: '8%', y: '16%', fontSize: 14
    })

    slide.addText("Absolute", {
        x: '65%', y: '16%', fontSize: 12
    })

    slide.addText("Relative", {
        x: '75%', y: '16%', fontSize: 12
    })

    slide.addText("Conversion Rate", {
        x: '85%', y: '16%', fontSize: 12
    })

    let Table = slide.addTable(tableData, { ...slide5Data.tableOptions, x: '55%', y: '20%' });
    [Table].forEach(table => {
        table._slideObjects.forEach((slideObject) => {
            if (slideObject._type === 'table') {
                slideObject.arrTabRows.forEach((row, index) => {
                    if (index === 0) {
                        row.forEach(cell => {
                            cell.options.fill = 'F5FAFD';
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

    slide.addText("appinio", {
        x: '3%',
        y: '95%', // Adjust position below the tables
        align: 'left',
        font_size: 12,
        color: '363636',
    })

    slide.addText("Original Question from the Questionnaire (N=) | Original Question from the Questionnaire (N=)"
    , {
        x: '15%', // Adjust the x position as needed
        y: '92%', // Adjust the y position as needed
        w: '70%', // Adjust the width as needed
        h: 0.3, // Adjust the height as needed (consider font size)
        fontSize: 8,
        color: '363636',
        align: 'center', // Set the text alignment to left
        body: 'Your Text Here', // Text content
        fill: 'ffffff', // Set background color (optional, for better visibility)
        line: { // Border properties
          color: '000000', // Border color
          size: 1, // Border line width
        },
      }
    )
}
function
    slide6(pptx) {
    let slide = pptx.addSlide();

    const headingsText = slide6Data.headingsText()
    slide.addImage({
        path: 'https://res.cloudinary.com/drascgtap/image/upload/v1715864912/Qibble%20App/cfpt1xstecwgbmoupd17.png',
        h: '10%', y: '10%',x:'5%', w: '15%'
    })
    headingsText.forEach((heading) => {
        slide.addText(heading.title, heading.options)
    })
}
function
    slide7(pptx) {
    let slide = pptx.addSlide();

    // Define left section width (percentage)
    let leftSectionWidth = 40;

    // Create left section background shape

    // Add content text on the left side
    let contentText = slide7Data.data;
    const numbers = [3,15,28,37]

    let textOpts = slide7Data.options;

    const textopt = slide7Data.extraOptions

    let yPosition = 10; // Starting y position for text
    let yPagePosition = 20
    slide.addText('', {
        x: 0,
        h: '100%',
        w: '33%',
        fill: "F3F7FC",
        fontSize: 24,
    });

    contentText.forEach((text, index) => {
        if (index === 0) {
            slide.addText(text, { ...textopt, y: 5 + '%', x: '2%', fontSize: 12 });
        } else {
            slide.addText(text, { ...textOpts, y: yPosition + '%', x: '2%' });
        }
        yPosition += 10; // Update y position for next text
    });
    numbers.forEach((page)=>{
        slide.addText(`${page}`, { ...textopt, y: yPagePosition + '%', x: '30%', fontSize: 12 });
        yPagePosition+= 10
    })

    let loremIpsumTextOpts = slide7Data.textOptions;

    slide.addText('Introduction to Study', { ...loremIpsumTextOpts, x: `${leftSectionWidth - 5}%`, y: '10%', w: '65%', marginBottom: 20 })

    slide.addText(slide7Data.texts[0], { ...loremIpsumTextOpts, x: '35%', fontSize: 12, y: '40%', w: '30%' });

    slide.addText(slide7Data.texts[1], { ...loremIpsumTextOpts, x: '65%', fontSize: 12, y: '40%', w: '30%' });

    slide.addText(slide7Data.texts[2], { ...loremIpsumTextOpts, x: '35%', fontSize: 12, y: '80%', w: '30%' });

    slide.addImage({ path: 'https://res.cloudinary.com/drascgtap/image/upload/v1715866057/Qibble%20App/thlpiplo2h9n6h9fx83d.png',h: '10%', y: '80%',x:'65%', w: '25%' });

}
function
    slide8(pptx) {
    let slide = pptx.addSlide();
    slide.background = { color: 'E0E9FD' }

    const headingsText = slide8Data.headingsText()

    headingsText.forEach((heading) => {
        slide.addText(heading.title, heading.options)
    })
}
function
    slide9(pptx) {
    let slide = pptx.addSlide();

    const data = slide9Data.data()

    data[0].forEach((card) => {
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

    data[1].forEach((card) => {
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

    data[2].forEach((card) => {
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

}

function slide10(pptx) {
    let slide = pptx.addSlide();
    const headingsText = slide10Data.headingsText

    headingsText.forEach((heading) => {
        if (heading.title) {
            slide.addText(heading.title, heading.options)
        } else if (heading.image) {
            slide.addImage({ path: heading.image, ...heading.options })
        }
    })

    const chartData = slide10Data.data

    let namesYpos = 50;
    let namesXpos = 8;

    let valuesYpos = 48;

    chartData.names.forEach((name) => {
        slide.addText(name, { y: `${namesYpos}%`, x: `${namesXpos}%`, fontSize: 12 })
        namesYpos = namesYpos + 7
    });

    chartData.values.map((value) => {
        let valuesXpos = 13;

        slide.addText(value.women, { y: `${valuesYpos}%`, x: `${valuesXpos}%`, fontSize: 12, h: '5%', w: '15%', fill: '8260D9', align: 'center', color: 'FFFFFF' })

        valuesXpos = valuesXpos + 15

        slide.addText(value.men, { y: `${valuesYpos}%`, x: `${valuesXpos}%`, fontSize: 12, h: '5%', w: '15%', fill: 'EA8B54', align: 'center', color: 'FFFFFF' })

        valuesYpos = valuesYpos + 7

    })

    let labelsYpos = valuesYpos
    let labelsXpos = 13

    chartData.labels.map((label) => {
        slide.addText(label, { y: `${labelsYpos}%`, x: `${labelsXpos}%`, fontSize: 12, h: '5%', w: '15%', align: 'center' })
        labelsXpos = labelsXpos + 15
    })
}

function slide11(pptx) {
    let slide = pptx.addSlide();

    const headingsText = slide11Data.headingsText()

    headingsText.forEach((heading) => {
        slide.addText(heading.title, heading.options)
    })
}

function slide12(pptx) {
    let slide = pptx.addSlide();

    slide12Data.headingsText.forEach((heading) => {
        if (heading.title) {
            slide.addText(heading.title, heading.options)
        } else if (heading.image) {
            slide.addImage({ path: heading.image, ...heading.options })
        }
    })
}

function slide13(pptx) {
    let slide = pptx.addSlide();

    const headingsText = slide13Data.headingsText

    headingsText.forEach((heading) => {
        slide.addText(heading.title, heading.options)
    })

    slide.addChart(pptx.ChartType.bar, slide13Data.data, slide13Data.options);
}

function slide14(pptx) {
    let slide = pptx.addSlide();
    const headingsText = slide14Data.headingsText

    headingsText.forEach((heading) => {
        slide.addText(heading.title, heading.options)
    })

    slide.addChart(pptx.ChartType.bar, slide14Data.data, slide14Data.options);
}

function slide15(pptx) {
    let slide = pptx.addSlide();

    const headingsText = slide15Data.headingsText

    headingsText.forEach((heading) => {
        slide.addText(heading.title, heading.options)
    })

    slide.addChart(pptx.ChartType.bar, slide15Data.data, slide15Data.options);
}

export { slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10, slide11, slide12, slide13, slide14, slide15 }