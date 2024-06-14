const slide1Data = {
    headingTexts: [
        {
            title: 'Subheadline: Splitname and Total (N=)',
            options: {
                x: '3%', // Set x position to 5% from the left
                y: '9%', // Set y position to 5% from the top
                w: '100%', // Set width to 40% of slide width
                align: 'left', // Align text to the left
                fontSize: 11,
                font_weight: '300',
                color: '000000', // Black color
                marginBottom: '15px'
            }
        },
        {
            title: 'Max Diff Graph (WIP)',
            options: {
                x: '3%', // Set x position to 5% from the left
                y: '5%', // Set y position to 5% from the top
                w: '40%', // Set width to 40% of slide width
                align: 'left', // Align text to the left
                font_weight: 'bold',
                color: '000000', // Black color
            }
        },
        {
            title:"03 Detailed Results",
            options: {
                x: -4.5,
                y: -0.5,
                rotate: -90,
                fontSize: 11
            }
        },
        {
            title: 'appinio',
            options: {
                x: '3%', // Left align with the table
                y: '90%', // Adjust position below the tabl
                align: 'left', // Left align the text
                font_size: 12,
                color: '363636',
            }
        },
        {
            title: 'Original Question from the Questionnaire (N=) | Original Question from the Questionnaire (N=)',
            options: {
                x: '15%', // Adjust the x position as needed
                y: '87%', // Adjust the y position as needed
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
        }
    ],
    data: [
        {
            labels: [["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7"]],
            values: [{
                negativeValues: [-0.14000000000000001, -0.18, -0.22, -0.25, -0.33, -0.40, -0.47],
                positiveValues: [0.8, 0.7, 0.6, 0.5, 0.43, 0.32, 0.24]
            }],
        }
    ],
    topDataValues: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    options: {
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
        showValueAxis: true, // Show value axis
        chartColors: ['a93b4c', '8ed19c'],
        valAxis: {
            label: { // Configure value label properties
                font: {
                    size: 14, // Adjust font size as needed
                    bold: true // Optionally make the text bold
                },
            }
        },
        x: 3, y: 1.7, w: 8, h: 4, barDir: 'bar', barGrouping: 'stacked'
    }
}

const slide2Data = {
    data: [
        ["", "", "Positive", "Negative", "Score"],
        ["1", "Item", "47.19%", "-10.59%", "36.60%"],
        ["2", "Item", "45.22%", "-8.97%", "36.25%"],
        ["3", "Item", "37.87%", "-8.56%", "29.31%"],
        ["4", "Item", "34.48%", "-16.53%", "17.95%"],
        ["5", "Item", "23.95%", "-19.22%", "4.73%"],
        ["6", "Item", "25.18%", "-25.54%", "-0.36%"],
        ["7", "Item", "24.17%", "-25.11%", "-0.94%"],
    ],
    headingTexts: [
        {
            title: 'Subheadline: Splitname and Total (N=)',
            options: {
                x: '3%', // Set x position to 5% from the left
                y: '9%', // Set y position to 5% from the top
                w: '100%', // Set width to 40% of slide width
                align: 'left', // Align text to the left
                fontSize: 11,
                font_weight: '300',
                color: '000000', // Black color
                marginBottom: '15px'
            }
        },
        {
            title:"03 Detailed Results",
            options: {
                x: -4.5,
                y: -0.5,
                rotate: -90,
                fontSize: 11
            }
        },
        {
            title: 'Max Diff Table',
            options: {
                x: '3%', // Set x position to 5% from the left
                y: '5%', // Set y position to 5% from the top
                w: '40%', // Set width to 40% of slide width
                align: 'left', // Align text to the left
                font_weight: 'bold',
                color: '000000', // Black color
            }
        },
        {
            title: 'appinio',
            options: {
                x: '3%', // Left align with the table
                y: '90%', // Adjust position below the tabl
                align: 'left', // Left align the text
                font_size: 12,
                color: '363636',
            }
        },
        {
            title: 'Original Question from the Questionnaire (N=) | Original Question from the Questionnaire (N=)',
            options: {
                x: '15%', // Adjust the x position as needed
                y: '87%', // Adjust the y position as needed
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
        }
    ],
    options: {
        x: '10%', // Set x position to 0
        y: '20%', // Set y position to 0
        w: "80%", // Set width to 100% of slide
        h: 4.5, // Set height to 100% of slide
        fill: 'F7F7F7',
        font_size: 12,
        color: '363636',
    }
}

const slide3Data = {
    data: [
        {
            labelsY: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            labelsX: [1, 2, 3], // Category labels for X-axis
            values: [55, 80, 90], // Data values for each category
        },
    ],
    options: {
        color: '7fa1f9',
    },
    headingTexts: [
        {
            title: 'Subheadline: Splitname and Total (N=)',
            options: {
                x: '3%', // Set x position to 5% from the left
                y: '9%', // Set y position to 5% from the top
                w: '100%', // Set width to 40% of slide width
                align: 'left', // Align text to the left
                fontSize: 11,
                font_weight: '300',
                color: '000000', // Black color
                marginBottom: '15px'
            }
        },
        {
            title:"03 Detailed Results",
            options: {
                x: -4.5,
                y: -0.5,
                rotate: -90,
                fontSize: 11
            }
        },
        {
            title: 'Turf Waterfall Chart',
            options: {
                x: '3%', // Set x position to 5% from the left
                y: '5%', // Set y position to 5% from the top
                w: '40%', // Set width to 40% of slide width
                align: 'left', // Align text to the left
                font_weight: 'bold',
                color: '000000', // Black color
            }
        },
        {
            title: 'appinio',
            options: {
                x: '3%', // Left align with the table
                y: '95%', // Adjust position below the tabl
                align: 'left', // Left align the text
                font_size: 12,
                color: '363636',
            }
        },
        {
            title: 'Original Question from the Questionnaire (N=) | Original Question from the Questionnaire (N=)',
            options: {
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
        }
    ]
}

const slide4Data = {
    data: [[
        ["Rank", "Flavour Combination", "Reach", "Frequency"],
        ["1", "Orange", "64%", "1"],
        ["2", "Apple", "62%", "1"],
        ["3", "Peach", "51%", "1"],
    ], [
        ["Rank", "Flavour Combination", "Reach", "Frequency"],
        ["1", "Orange", "64%", "1"],
        ["2", "Apple", "62%", "1"],
        ["3", "Peach", "51%", "1"],
    ]],
    headingTextOpts: {
        align: 'left',
        fontSize: 14,
        font_weight: '300',
        color: '000000',
        marginBottom: '15px'
    },
    options: {
        w: "40%", // Set width to 40% of slide for each table
        h: "20%", // Set height to 100% of slide for each table
        fill: 'F7F7F7',
        font_size: 12,
        color: '363636',
        gridLineColor: 'none'
    },
    headingTexts: function () {
        return [
            {
                title: 'Portfolio Size: 1 Flavour',
                options: { ...this.headingTextOpts, x: '15%', y: '17%', }
            },
            {
                title:"03 Detailed Results",
                options: {
                    x: -4.5,
                    y: -0.5,
                    rotate: -90,
                    fontSize: 11
                }
            },
            {
                title: 'Portfolio Size: 2 Flavours',
                options: { ...this.headingTextOpts, x: '65%', y: '17%', }
            },
            {
                title: 'Portfolio Size: 3 Flavours',
                options: { ...this.headingTextOpts, x: '15%', y: '51%', }
            },
            {
                title: 'Portfolio Size: 4 Flavours',
                options: { ...this.headingTextOpts, x: '65%', y: '51%', }
            },
            {
                title: 'Subheadline: Splitname and Total (N=)',
                options: {
                    x: '3%',
                    y: '8.5%',
                    w: '100%',
                    align: 'left',
                    font_weight: '300',
                    fontSize: 11,
                    color: '000000',
                    marginBottom: '15px'
                }
            },
            {
                title: 'TURF Analysis (Optimal number of flavor combinations',
                options: {
                    x: '3%',
                    y: '5%',
                    w: '100%',
                    align: 'left',
                    font_weight: 'bold',
                    color: '000000',
                }
            },
            {
                title: 'appinio',
                options: {
                    x: '3%',
                    y: '90%', // Adjust position below the tables
                    align: 'left',
                    font_size: 12,
                    color: '363636',
                }
            },
            {
                title: 'Original Question from the Questionnaire (N=) | Original Question from the Questionnaire (N=)',
                options: {
                    x: '15%', // Adjust the x position as needed
                    y: '87%', // Adjust the y position as needed
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
            }
        ]
    }
}

const slide5Data = {
    data: [
        [{
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
        }], [
            ["Total", "X", "X%", ''],
            ["Funnel Step 1", "X", "X%", "X%"],
            ["Funnel Step 2", "X", "X%", "X%"],
            ["Funnel Step 3", "X", "X%", "X%"],
        ]
    ],
    options: {
        h: 2,   // height of the chart
        color: 'ffffff', // Text Color
        chartColors: ['7FA1F9', 'F9B27E', '885EE0', '8ED19C'], // Bar Colors
        align: 'left',
        fontSize: 12,
        position: 'left',
        y: 2.5
    },
    tableOptions: {
        w: "40%", // Set width to 40% of slide for each table
        h: "60%", // Set height to 100% of slide for each table
        fill: 'F7F7F7',
        font_size: 12,
        color: '363636',
    }
}

const slide6Data = {
    options: {
        align: 'left',
        fontWeight: 'bold',
        color: '000000',
        marginBottom: '15px'
    },
    headingsText: function () {
        return [
            {
                title: 'INSIGHT REPORT',
                options: { ...this.options, y: '27%', x: '5%', fontSize: 70 }
            },
            {
                title: 'Project Name',
                options: { ...this.options, y: '52%', x: '5%', fontSize: 45, color: '0270C0' }
            },
            {
                title: 'Date',
                options: { ...this.options, y: '62%', x: '5%', fontSize: 35 }
            },
            {
                title: 'appinio',
                options: { ...this.options, y: '85%', x: '5%', fontSize: 35, fontFamily: 'Aeonik Light' }
            },
            {
                title: 'Month Year',
                options: {
                    ...this.options, x: '30%', y: '82%', fontSize: 25, h: 0.5, fill: 'ffffff', line: { // Border properties
                        color: '000000', // Border color
                        size: 1, // Border line width
                    }, w: '15%'
                }
            }
        ]
    }
}

const slide7Data = {
    data: [
        "Agenda",
        "01 Study Design",
        "02 Executive Summary",
        "03 Detailed Results",
        "05 Contact"
    ],
    options: {
        align: 'left',
        fontWeight: 'bold',
        marginBottom: '15px',
    },
    extraOptions: {
        x: '5%',
        w: '25%',
        fill: "F3F7FC",
        fontSize: 24,
    },
    texts: ["This is dummy text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At imperdiet dui accumsan sit amet nulla. Bibendum at varius vel pharetra vel turpis nunc eget. Sagittis purus sit amet volutpat consequat mauris nunc congue. Eu facilisis sed odio morbi quis commodo odio aenean. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Enim eu turpis egestas pretium aenean pharetra magna ac. Tincidunt ornare massa eget egestas. In fermentum posuere urna nec tincidunt praesent. Lorem mollis aliquam ut porttitor leo a. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. Porttitor rhoncus dolor purus non enim praesent elementum. Aenean pharetra magna ac placerat", "Non consectetur a erat nam at. Tortor consequat id porta nibh venenatis cras. Et ligula ullamcorper malesuada proin libero nunc consequat. At tellus at urna condimentum mattis. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Sed sed risus pretium quam. Suspendisse faucibus interdum posuere lorem ipsum. Ultricies mi eget mauris pharetra et ultrices neque ornare. Faucibus scelerisque eleifend donec pretium vulputate sapien. Scelerisque fermentum dui faucibus in ornare quam. Faucibus pulvinar elementum integer enim neque. Urna duis convallis convallis tellus id interdum velit laoreet id. Vehicula ipsum a arcu cursus vitae. Quam lacus suspendisse faucibus interdum posuere. Massa enim nec dui nunc. Ultrices tincidunt arcu non sodales. Tempus iaculis urna id volutpat lacus laoreet non. Ac turpis egestas integer eget aliquet. Cum sociis natoque penatibus et magnis dis.", "Faucibus pulvinar elementum integer enim neque. Urna duis convallis convallis tellus id interdum velit laoreet id. Vehicula ipsum a arcu cursus vitae. Quam lacus suspendisse faucibus interdum posuere. Massa enim nec dui nunc. Ultrices tincidunt arcu non sodales."],
    textOptions: {
        align: 'left',
        color: '000000'
    }
}

const slide8Data = {
    options: {
        x: '5%',
    },
    headingsText: function () {
        return [
            {
                title: '01',
                options: {
                    ...this.options, y: '10%', fontSize: 70
                }
            },
            {
                title: 'CHAPTER SLIDE',
                options: {
                    ...this.options, y: '25%', fontSize: 70
                }
            },
            {
                title: 'appinio',
                options: {
                    ...this.options, y: '90%', fontSize: 24,
                }
            }
        ]
    }
}

const slide9Data = {
    options: {
        fontSize: 20,
    },
    data: function () {
        return [
            [
                {
                    title: 'Study Design',
                    options: { y: '10%', fontSize: 20 }
                },
                {
                    title:"01 Study Design",
                    options: {
                        x: -4.5,
                        y: -0.5,
                        rotate: -90,
                        fontSize: 11
                    }
                },
                {
                    title: 'Method & Data Collection',
                    options: {
                        ...this.options, x: '10%', w: '17.5%', fill: "F5FAFD", y: '22%', h: '13%'
                    }
                },
                {
                    image: 'https://res.cloudinary.com/drascgtap/image/upload/v1715060877/Qibble%20App/d7orwyzdkyxgtemc2pdp.png',
                    options: {
                         y: '22%', x: '27.5%'
                    }
                },
                {
                    title: 'Objective of the survey/General method used. Mobile questionnaire played out via the Appinio app',
                    options: { ...this.options, y: '35%', x: '10%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%' }
                },
                {
                    title: 'Number of Questions',
                    options: { ...this.options, y: '44%', x: '10%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%' }
                },
                {
                    title: 'The survey took place from January 9th, 2023 to January 17th, 2023',
                    options: { ...this.options, y: '53%', x: '10%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%' }
                }
            ],
            [
                {
                    title: 'Sample',
                    options: { ...this.options, x: '40%', w: '17.5%', fill: "F5FAFD", y: '22%', h: '13%' }
                },
                {
                    image: 'https://res.cloudinary.com/drascgtap/image/upload/v1715060842/Qibble%20App/kf5rpwcom9yiyaranevn.png',
                    options: {  y: '22%', x: '57.5%' }
                },
                {
                    title: 'Country/Location details',
                    options: { ...this.options, y: '35%', x: '40%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%' }
                },
                {
                    title: 'Details on the total N (Age/Sample)',
                    options: { ...this.options, y: '44%', x: '40%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%' }
                },
                {
                    title: 'Quota Specifics/distribution',
                    options: { ...this.options, y: '53%', x: '40%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%' }
                }
            ],
            [
                {
                    title: 'Questionnaire',
                    options: { ...this.options, x: '70%', w: '17.5%', fill: "F5FAFD", y: '22%', h: '13%' }
                },
                {
                    image: 'https://res.cloudinary.com/drascgtap/image/upload/v1715060808/Qibble%20App/xi1l9dycmj7k3hkkxxct.png',
                    options: {  y: '22%', x: '87.5%' }
                },
                {
                    title: 'First goal of questionnair',
                    options: { ...this.options, y: '35%', x: '70%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%', margin: 5 }
                },
                {
                    title: 'Second goal of questionnair',
                    options: { ...this.options, y: '44%', x: '70%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%', margin: 5 }
                },
                {
                    title: 'Third goal of questionnair',
                    options: { ...this.options, y: '53%', x: '70%', fontSize: 12, w: '25%', fill: "F5FAFD", h: '10%', margin: 5 }
                }, {
                    title: 'appinio',
                    options: { ...this.options, y: '90%', fontSize: 24 }
                }
            ]
        ]
    }
}

const slide10Data = {
    headingsText: [
        {
            title: 'Sample Overview',
            options: { y: '10%', x: '3%', fontSize: 20 }
        },
        {
            title:"01 Study Design",
            options: {
                x: -4.5,
                y: -0.5,
                rotate: -90,
                fontSize: 11
            }
        },
        {
            title: '1000',
            options: { y: '22%', x: '7%', fontSize: 50 }
        },
        {
            title: 'Participants',
            options: { y: '27%', x: '7%', fontSize: 10, color: '777777' }
        },
        {
            title: '39.5',
            options: { y: '22%', x: '23%', fontSize: 50 }
        },
        {
            title: 'Average Ages in years',
            options: { y: '27%', x: '23%', fontSize: 10, color: '777777' }
        },
        {
            title: 'Age & Gender',
            options: { y: '34%', x: '7%', fontSize: 20 }
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
            options: { y: '95%', x: "3%", fontSize: 14 }
        },
        {
            image: 'https://res.cloudinary.com/drascgtap/image/upload/v1715068058/Qibble%20App/c5xay6vcb96euuryamp7.png',
            options: { y: '10%', x: '50%', h: '60%', w: '50%' }
        }
    ],
    data:
    {
        names: ['16-24', '25-34', '35-44', '45-54', '55-65'],
        labels: ['Women', 'Men'],
        values: [{ women: '200', men: '200' }, { women: '200', men: '200' }, { women: '200', men: '200' }, { women: '200', men: '200' }, { women: '200', men: '200' }]
    }
}

const slide11Data = {
    options: {
        x: '7%',
    },
    extraOptions: {
        align: 'left',
        color: '000000'
    },
    headingsText: function () {
        return [
            {
                title: 'Executive Summary',
                options: {
                    x: '2.5%', y: '10%', fontSize: 20,
                }
            },
            {
                title:"02 Executive Summary",
                options: {
                    x: -4.5,
                    y: -0.5,
                    rotate: -90,
                    fontSize: 11
                }
            },
            {
                title: 'Only have one big key insight in the summary? This is a nice space to highlight the main insight or just introduce the insight summary.',
                options: {
                    ...this.options, y: '25%', fontSize: 20, w: '55%',
                }
            },
            {
                title: 'This is dummy text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At imperdiet dui accumsan sit amet nulla. Bibendum at varius vel pharetra vel turpis nunc eget. Sagittis purus sit amet volutpat consequat mauris nunc congue. Eu facilisis sed odio morbi quis commodo odio aenean. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Enim eu turpis egestas pretium aenean pharetra magna ac. Tincidunt ornare massa eget egestas. In fermentum posuere urna nec tincidunt praesent. Lorem mollis aliquam ut porttitor leo a. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. Porttitor rhoncus dolor purus non enim praesent elementum. Aenean pharetra magna ac placerat',
                options: { ...this.extraOptions, x: '7%', fontSize: 10, y: '50%', w: '30%' }
            },
            {
                title: 'vestibulum lectus mauris ultrices eros. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Massa tincidunt dui ut ornare lectus sit. Vulputate sapien nec sagittis aliquam malesuada. Elementum sagittis vitae et leo duis ut diam. Nec feugiat in fermentum posuere urna nec tincidunt praesent semper.Est sit amet facilisis magna etiam tempor orci. Non consectetur a erat nam at. Tortor consequat id porta nibh venenatis cras. Et ligula ullamcorper malesuada proin libero nunc consequat. At tellus at urna condimentum mattis. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper.',
                options: { ...this.extraOptions, x: '37%', fontSize: 10, y: '45%', w: '30%' }
            },
            {
                title: 'Sed sed risus pretium quam. Suspendisse faucibus interdum posuere lorem ipsum. Ultricies mi eget mauris pharetra et ultrices neque ornare. Faucibus scelerisque eleifend donec pretium vulputate sapien. Scelerisque fermentum dui faucibus in ornare quam.',
                options: { ...this.extraOptions, x: '7%', fontSize: 10, y: '75%', w: '30%' }
            },
            {
                title: "vestibulum lectus mauris ultrices eros. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Massa tincidunt dui ut ornare lectus sit. Vulputate sapien nec sagittis aliquam malesuada. Elementum sagittis vitae et leo duis ut diam. Nec feugiat in fermentum posuere urna nec tincidunt praesent semper.Est sit amet facilisis magna etiam tempor orci.",
                options: { ...this.extraOptions, x: '37%', fontSize: 10, y: '68%', w: '30%' }
            },
            {
                title: 'appinio',
                options: {
                    x: '2.5%', y: '95%', fontSize: 16,
                }
            }
        ]
    }
}

const slide12Data = {
    headingsText: [
        {
            title: 'Any questions? We are happy to help!',
            options: { fontSize: 20, y: '10%', x: '2%' }
        },
        {
            title:"04 Contract",
            options: {
                x: -4.5,
                y: -0.5,
                rotate: -90,
                fontSize: 11
            }
        },
        {
            image: 'https://res.cloudinary.com/drascgtap/image/upload/v1718028398/Qibble%20App/ivzkrwk2dvejkyfp7cqw.jpg',
            options: { w: '12%', h: '20%', y: '20%', x: '8%' }
        },
        {
            title: 'Name',
            options: {
                fontSize: 40, y: '20%', x: '20%', w: '70%', h: 0.5, align: 'left', fill: 'ffffff', line: {
                    color: '000000', // Border color
                    size: 1, // Border line width
                }
            }
        },
        {
            title: 'Position',
            options: {
                fontSize: 20, y: '28%', x: '20%', w: '70%', h: 0.3, align: 'left', fill: 'ffffff', line: {
                    color: '000000', // Border color
                    size: 1, // Border line width
                }
            }
        },
        {
            title: 'Office',
            options: { fontSize: 8, y: '35%', x: '19%', color: '777777' }
        },
        {
            title: '+49',
            options: {
                fontSize: 8, y: '34%', x: '24%', color: '777777', w: '65%', h: 0.2, align: 'left', fill: 'ffffff', line: {
                    color: '000000', // Border color
                    size: 1, // Border line width
                }
            }
        },
        {
            title: 'Mail',
            options: { fontSize: 8, y: '39%', x: '19%', color: '777777' }
        },
        {
            title: 'Louise.leitsch@appinio.com',
            options: { fontSize: 8, y: '39%', x: '23%', color: '777777' }
        },
        {
            image: 'https://res.cloudinary.com/drascgtap/image/upload/v1718028398/Qibble%20App/ivzkrwk2dvejkyfp7cqw.jpg',
            options: { w: '12%', h: '20%', y: '50%', x: '8%' }
        },
        {
            title: 'Name',
            options: {
                fontSize: 40, y: '50%', x: '20%', w: '70%', h: 0.5, align: 'left', fill: 'ffffff', line: {
                    color: '000000', // Border color
                    size: 1, // Border line width
                }
            }
        },
        {
            title: 'Position',
            options: {
                fontSize: 20, y: '58%', x: '20%', w: '70%', h: 0.3, align: 'left', fill: 'ffffff', line: {
                    color: '000000', // Border color
                    size: 1, // Border line width
                }
            }
        },
        {
            title: 'Office',
            options: { fontSize: 8, y: '65%', x: '19%', color: '777777' }
        },
        {
            title: '+49',
            options: {
                fontSize: 8, y: '64%', x: '24%', color: '777777', w: '65%', h: 0.2, align: 'left', fill: 'ffffff', line: {
                    color: '000000', // Border color
                    size: 1, // Border line width
                }
            }
        },
        {
            title: 'Mail',
            options: { fontSize: 8, y: '69%', x: '19%', color: '777777' }
        },
        {
            title: 'Louise.leitsch@appinio.com',
            options: { fontSize: 8, y: '69%', x: '23%', color: '777777' }
        },
        {
            title: 'appinio',
            options: { fontSize: 14, y: '90%', x: '2%' }
        },
        {
            title: 'Appinio Germany Grobe Theaterstrabe 31 20354 Hamburg',
            options: { fontSize: 10, y: '90%', x: '23%', w: '10%' }
        },
        {
            title: 'Appinio USA 1355 Market St 94301 San Francisco',
            options: { fontSize: 10, y: '90%', x: '43%', w: '10%' }
        },
        {
            title: 'Appinio UK Victoria House, Suite 41 38 Survey Quays Road, London UK',
            options: { fontSize: 10, y: '90%', x: '63%', w: '10%' }
        },
        {
            title: 'appinio.com',
            options: { fontSize: 10, y: '90%', x: '83%', w: '10%' }
        },
    ]
}

const slide13Data = {
    headingsText: [
        {
            title: 'Are you planning to go on vacation this year?',
            options: {
                y: '10%',
                x: '2%',
                fontSize: 20
            }
        },
        {
            title:"03 Detailed Results",
            options: {
                x: -4.5,
                y: -0.5,
                rotate: -90,
                fontSize: 11
            }
        },
        {
            title: 'Total: (N = 1000)',
            options: {
                y: '16%',
                x: '2%',
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
                w: '25%',
                color: '000000',
            }
        },
        {
            title: 'Insight Headline in Aeonik Medium​ Write the copy of the insight in Aeonik light. Try to not highlight any part of the copy. The Headline functions as the highlighted part.',
            options: {
                y: '45%',
                x: '60%',
                fontSize: 12,
                w: '25%',
                color: '000000',
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
        },
    ],
    data: [
        {
            name: "Actual Sales",
            labels: [["Yes", "No", "I donot know yet"]],
            values: [54, 23, 24],
        },
    ],
    options: {
        // Set grid and axis line colors to white (almost invisible)
        gridLineColor: 'ffffff',
        // catAxisLineColor: 'ffffff',
        valAxisLineColor: 'ffffff',
        catGridLineColor: 'ffffff',
        valGridLineColor: 'ffffff',
        catGridLine: { style: 'none' },
        valGridLine: { style: 'none' },
        valAxisHidden: true,
        barGapWidthPct: 20,
        showValueAxis: false,
        chartColors: ['779DFF'],
        showLabel: true,
        showValue: true,
        valAxis: {
            label: { // Configure value label properties
                font: {
                    size: 1 // Adjust font size as needed (smaller for less visibility)
                }
            }
        },
        h: 5, w: 7
    }
}

const slide14Data = {
    headingsText: [
        {
            title: 'Are you planning to go on vacation this year?',
            options: {
                y: '10%',
                x: '2%',
                fontSize: 20
            }
        },
        {
            title:"03 Detailed Results",
            options: {
                x: -4.5,
                y: -0.5,
                rotate: -90,
                fontSize: 11
            }
        },
        {
            title: 'Total: (N = 1000)',
            options: {
                y: '16%',
                x: '2%',
                fontSize: 10
            }
        },
        {
            title: 'Insights',
            options: {
                y: '20%',
                x: '7%',
                w: '100%',
                fontSize: 8,
                color: '777777',
            }
        },
        {
            title: 'Insight Headline in Aeonik Medium​ Write the copy of the insight in Aeonik light. Try to not highlight any part of the copy. The Headline functions as the highlighted part.',
            options: {
                y: '30%',
                x: '7%',
                fontSize: 12,
                w: '25%',
                color: '000000',
            }
        },
        {
            title: 'Insight Headline in Aeonik Medium​ Write the copy of the insight in Aeonik light. Try to not highlight any part of the copy. The Headline functions as the highlighted part.',
            options: {
                y: '45%',
                x: '7%',
                fontSize: 12,
                w: '25%',
                color: '000000',
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
        },
    ],
    data: [
        {
            name: "Actual Sales",
            labels: [["Yes", "No", "I donot know yet"]],
            values: [54, 23, 24],
        },
    ],
    options: {
        // Set grid and axis line colors to white (almost invisible)
        gridLineColor: 'ffffff',
        // catAxisLineColor: 'ffffff',
        valAxisLineColor: 'ffffff',
        catGridLineColor: 'ffffff',
        valGridLineColor: 'ffffff',
        catGridLine: { style: 'none' },
        valGridLine: { style: 'none' },
        valAxisHidden: true,
        barGapWidthPct: 20,
        showValueAxis: false,
        chartColors: ['779DFF'],
        showLabel: true,
        showValue: true,
        x: 5, h:5,w:7
    }
}

const slide15Data = {
    headingsText: [
        {
            title: 'Are you planning to go on vacation this year?',
            options: {
                y: '10%',
                x: '2%',
                fontSize: 20
            }
        },
        {
            title:"03 Detailed Results",
            options: {
                x: -4.5,
                y: -0.5,
                rotate: -90,
                fontSize: 11
            }
        },
        {
            title: 'Total: (N = 1000) / Split: Age Groups',
            options: {
                y: '16%',
                x: '2%',
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
                y: '27%',
                x: '60%',
                fontSize: 12,
                w: '30%',
                color: '000000',
            }
        },
        {
            title: 'Insight Headline in Aeonik Medium Write the copy of the insight in Aeonik light. Try to not highlight any part of the copy. The Headline functions as the highlighted part.',
            options: {
                y: '40%',
                x: '60%',
                fontSize: 12,
                w: '30%',
                color: '000000',
            }
        },
        {
            title: '',
            options: {
                y: '80%',
                x: '10%',
                h: "2.5%",
                w: "1.5%",
                fill: {
                    color: 'B6C9FF'
                },
                color: 'FFFFFF'
            }
        },
        {
            title: '16 - 24',
            options: {
                y: '81%',
                x: '11%',
                fontSize: 12
            }
        },
        {
            title: '',
            options: {
                y: '80%',
                x: '20%',
                h: "2.5%",
                w: "1.5%",
                fill: {
                    color: '769DFF'
                },
                color: 'FFFFFF'
            }
        },
        {
            title: '25 - 34',
            options: {
                y: '81%',
                x: '21%',
                fontSize: 12
            }
        },
        {
            title: '',
            options: {
                y: '80%',
                x: '30%',
                h: "2.5%",
                w: "1.5%",
                fill: {
                    color: '3C6FFF'
                },
                color: 'FFFFFF'
            }
        },
        {
            title: '35 - 44',
            options: {
                y: '81%',
                x: '31%',
                fontSize: 12
            }
        },
        {
            title: '',
            options: {
                y: '80%',
                x: '40%',
                h: "2.5%",
                w: "1.5%",
                fill: {
                    color: '2D54C2'
                },
                color: 'FFFFFF'
            }
        },
        {
            title: '45 - 54',
            options: {
                y: '81%',
                x: '41%',
                fontSize: 12
            }
        },
        {
            title: '',
            options: {
                y: '80%',
                x: '50%',
                h: "2.5%",
                w: "1.5%",
                fill: {
                    color: '1E3A84'
                },
                color: 'FFFFFF'
            }
        },
        {
            title: '55 - 65',
            options: {
                y: '81%',
                x: '51%',
                fontSize: 12
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
    ],
    data: [
        {
            labels: [["Category 1", "Category 2", "Category 3"]],
            values: [100, 100, 100],
        },
        {
            labels: [["Category 1", "Category 2", "Category 3"]],
            values: [100, 100, 100],
        },
        {
            labels: [["Category 1", "Category 2", "Category 3"]],
            values: [100, 100, 100],
        },
        {
            labels: [["Category 1", "Category 2", "Category 3"]],
            values: [100, 100, 100],
        },
        {
            labels: [["Category 1", "Category 2", "Category 3"]],
            values: [100, 100, 100],
        },
        // ... add more categories if needed
    ],
    options: {
        // Set grid and axis line colors to white (almost invisible)
        gridLineColor: 'ffffff',
        // catAxisLineColor: 'ffffff',
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
        y: 2,
        // h:4.7,
        showLabel: true,
        showValue: true,
        dataLabel: {
            show: true,
            fontSize: 8,
            color: '000000',
            placement: 'outEnd'
        },
    }
}

export { slide1Data, slide2Data, slide3Data, slide4Data, slide5Data, slide6Data, slide7Data, slide8Data, slide9Data, slide10Data, slide11Data, slide12Data, slide13Data, slide14Data, slide15Data }