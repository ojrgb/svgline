import Renderer from './Renderer';

// describe('evaluate', () => {
//   it('should evaluate the expression correctly', () => {
//     const props = {
//       expression: 'configurations.conf1 / configurations.conf2',
//       p: {
//         configurations: [
//           {
//             _id: 'conf1',
//             name: 'conf1',
//             type: 'number',
//             defaultValue: '10',
//             sampleValue: '10'
//           },
//           {
//             _id: 'conf2',
//             name: 'conf2',
//             type: 'number',
//             defaultValue: '2',
//             sampleValue: '2'
//           }
//         ]
//       }
//     };

//     const result = Renderer.evaluate(props);

//     expect(result).toBe(5);
//   });
// });

// describe('renderCalculation', () => {
//   it('should render the calculation correctly', () => {
//     const calculation =  {type: 'calculation',value: 'configurations.conf1 / configurations.conf2'}
    
//     const p = {
//       "configurations": [
//           {
//               "_id": "conf1",
//               "name": "conf1",
//               "type": "number",
//               "defaultValue": "10",
//               "sampleValue": "10"
//           },
//           {
//               "_id": "conf2",
//               "name": "conf2",
//               "type": "number",
//               "defaultValue": "2",
//               "sampleValue": "2"
//           }
//       ],
//       "datasets": [],
//       "calculations": [
//           {
//               "_id": "New calculation 1",
//               "formula": "1+1"
//           }
//       ],
//       "components": [],
//       "layers": [],
//       "elements": [],
//       "parameters": [
//           {
//               "_id": "New graphic",
//               "name": "New graphic",
//               "ratio": "1-1"
//           }
//       ]
//     };

//     const result = Renderer.renderCalculation(calculation, p);
   
//     expect(result).toEqual(
//      {type: 'calculation',value: 5}
//    );
//   });
// })

// describe('renderPackage', () => {
//   it('should render the package correctly', () => {
//     const p = {
//       "configurations": [
//           {
//               "_id": "t1",
//               "name": "t1",
//               "type": "number",
//               "defaultValue": "2",
//               "sampleValue": "2"
//           },
//           {
//               "_id": "t2",
//               "name": "t2",
//               "type": "number",
//               "defaultValue": "2",
//               "sampleValue": "2"
//           }
//       ],
//       "datasets": [],
//       "calculations": [
//           {
//               "_id": "New calculation 1",
//               "formula": {
//                   "value": 4,
//                   "type": "calculation"
//               },
//           }
//       ],
//       "components": [],
//       "layers": [
//           {
//               "_id": "l1",
//               "name": "l1",
//               "backgroundColor": "#e6dddd",
//               "opacity": 100,
//               "elements": [
//                 {
//                     "_id": "New element 1",
//                     "name": "New element 1",
//                     stroke: "#000000",
//                     strokeWidth: 1,
//                     type:"line",
//                     x1: {type: "calculation", value: "configurations.t1 * configurations.t2"},
//                     x2: {type: "calculation", value: "configurations.t1 * configurations.t2"},
//                     y1: {type: "calculation", value: "configurations.t1 * configurations.t2"},
//                     y2: {type: "calculation", value: "configurations.t1 * configurations.t2"},
//                 }
//             ]
//           }
//       ],
//       "elements": [],
//       "parameters": [
//           {
//               "_id": "New graphic",
//               "name": "New graphic",
//               "ratio": "1-1"
//           }
//       ]
//   }

  

//     const result = Renderer.renderPackage(p);
    
//     expect(result).toEqual(
//       {
//       "configurations": [
//           {
//               "_id": "t1",
//               "name": "t1",
//               "type": "number",
//               "defaultValue": "2",
//               "sampleValue": "2"
//           },
//           {
//               "_id": "t2",
//               "name": "t2",
//               "type": "number",
//               "defaultValue": "2",
//               "sampleValue": "2"
//           }
//       ],
//       "datasets": [],
//       "calculations": [
//           {
//               "_id": "New calculation 1",
//               "formula": {
//                   value: 4,
//                   "type": "calculation"
//               },
              
//           }
//       ],
//       "components": [],
//       "layers": [
//           {
//               "_id": "l1",
//               "name": "l1",
//               "backgroundColor": "#e6dddd",
//               "opacity": 100,
//               "elements": [
//                 {
//                     "_id": "New element 1",
//                     "name": "New element 1",
//                     stroke: "#000000",
//                     strokeWidth: 1,
//                     type:"line",
//                     x1: {type: "calculation", value: 4},
//                     x2: {type: "calculation", value: 4},
//                     y1: {type: "calculation", value: 4},
//                     y2: {type: "calculation", value: 4},
//                 }
//             ]
//           }
//       ],
//       "elements": [],
//       "parameters": [
//           {
//               "_id": "New graphic",
//               "name": "New graphic",
//               "ratio": "1-1"
//           }
//       ]
//   }
//   );
//   });
// })


describe('renderPackage', () => {
  it('should render the package correctly', () => {
    const p = {
      "configurations": [
          {
              "_id": "t1",
              "name": "t1",
              "type": "number",
              "defaultValue": "2",
              "sampleValue": "2"
          },
          {
              "_id": "t2",
              "name": "t2",
              "type": "number",
              "defaultValue": "2",
              "sampleValue": "2"
          }
      ],
      "layers": [
                  {
                      "_id": "l1",
                      "name": "l1",
                      "backgroundColor": "#e6dddd",
                      "opacity": 100,
                      "elements": [
                        {
                            "_id": "New element 1",
                            "name": "New element 1",
                            stroke: "#000000",
                            strokeWidth: 1,
                            type:"line",
                            x1: {type: "calculation", value: "configurations.t1 * configurations.t2"},
                            x2: {type: "calculation", value: "configurations.t1 * configurations.t2"},
                            y1: {type: "calculation", value: "configurations.t1 * configurations.t2"},
                            y2: {type: "calculation", value: "configurations.t1 * configurations.t2"},
                        }
                    ]
                  }
      ],
     "calculations": [
          {
              "_id": "New calculation 1",
              "formula": {
                  "value": "configurations.t1 + configurations.t2",
                  "type": "calculation"
              },
          }
      ],
  }

  

    const result = Renderer.renderPackage(p);
    
    expect(result).toEqual(
      {
        "configurations": [
            {
                "_id": "t1",
                "name": "t1",
                "type": "number",
                "defaultValue": "2",
                "sampleValue": "2"
            },
            {
                "_id": "t2",
                "name": "t2",
                "type": "number",
                "defaultValue": "2",
                "sampleValue": "2"
            }
        ],
        "layers": [
          {
              "_id": "l1",
              "name": "l1",
              "backgroundColor": "#e6dddd",
              "opacity": 100,
              "elements": [
                {
                    "_id": "New element 1",
                    "name": "New element 1",
                    stroke: "#000000",
                    strokeWidth: 1,
                    type:"line",
                    x1: {type: "calculation", value: 4},
                    x2: {type: "calculation", value: 4},
                    y1: {type: "calculation", value: 4},
                    y2: {type: "calculation", value: 4},
                }
            ]
          }
],
       "calculations": [
            {
                "_id": "New calculation 1",
                "formula": {
                    "value": 4,
                    "type": "calculation"
                },
            }
        ],
    }
  );
  });
})