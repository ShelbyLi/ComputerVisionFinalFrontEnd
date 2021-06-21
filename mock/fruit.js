const Mock = require('mockjs')

const data = Mock.mock({
    'items|40': [{
        // imgName: '@integer(0, 40)',
        imgName: 'test.jpg',
        dlPrediction: '@integer(0, 7)',
        mlPrediction: '@integer(0, 7)',
        label: '@integer(0, 7)',
    }]
})



module.exports = [
{
    url: '/fruit/list',
    type: 'get',
    response: config => {
    const items = data.items
    return {
        code: 20000,
        data: {
        // total: items.length,
            record: items,
            pie: {
                legendData: ['apple', 'strawberry', 'orange', 'banana', 'durian', 'pineapple', 'pomegranate', 'grape'],
                seriesData: [
                    { value: 5, name: 'apple' },
                    { value: 8, name: 'strawberry' },
                    { value: 14, name: 'orange' },
                    { value: 2, name: 'banana' },
                    { value: 6, name: 'durian' },
                    { value: 5, name: 'pineapple' },
                    { value: 7, name: 'pomegranate' },
                    { value: 17, name: 'grape' }
                  ],
                },
            pie2: {
                legendData: ['apple', 'strawberry', 'orange', 'banana', 'durian', 'pineapple', 'pomegranate', 'grape'],
                seriesData: [
                    { value: 15, name: 'apple' },
                    { value: 8, name: 'strawberry' },
                    { value: 14, name: 'orange' },
                    { value: 2, name: 'banana' },
                    { value: 6, name: 'durian' },
                    { value: 5, name: 'pineapple' },
                    { value: 7, name: 'pomegranate' },
                    { value: 17, name: 'grape' }
                    ],
                },
            pie3: {
                legendData: ['apple', 'strawberry', 'orange', 'banana', 'durian', 'pineapple', 'pomegranate', 'grape'],
                seriesData: [
                    { value: 25, name: 'apple' },
                    { value: 8, name: 'strawberry' },
                    { value: 14, name: 'orange' },
                    { value: 2, name: 'banana' },
                    { value: 6, name: 'durian' },
                    { value: 5, name: 'pineapple' },
                    { value: 7, name: 'pomegranate' },
                    { value: 17, name: 'grape' }
                    ],
                },
                
        }
      }
    }
},
{
    url: '/fruit/score',
    type: 'get',
    response: config => {
    const items = data.items
    return {
        code: 20000,
        data: {
            // total: items.length,
            score: [{
                measurement: 'acc',
                dl: 98.2,
                ml: 83.5
            },
            {
                measurement: 'F1',
                dl: 97.2,
                ml: 82.5
            }
                
            ]
                

            
        }
      }
    }
},
]