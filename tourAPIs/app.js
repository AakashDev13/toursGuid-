const express = require("express");
const fs = require("fs");


const app = express();
const tours= JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const PORT = 3000;

// middlewere 

app.use(express.json());


// handler functions

const getAllTours = (req, res) => {
     res.status(200).json({
        status : 'success',
        // statusCode: '200',
        result : tours.length,
        data : {
            tours
        }
    });
}

const getTour = (req, res) => {

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)

    // if(id > tours.length) {
    if(!tour) {
       res.status(404).json({
            status : 'fail',
            message : 'Invalid Id'
        })
    }

    res.status(200).json({
        status : 'success',
        result : tours.length,
        data : {
            tour
        }
    })
}

const postTour = (req, res) => {
    
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id : newId}, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
       res.status(201).json({
        status : 'success',
        data : {
            tours : newTour
        }
       })
    })
}

const updateTour = (req, res) => {
    if(req.params.id * 1 > tours.length) {
        res.status(404).json({
            status : 'fail',
            message : 'Invalid Id'
        })
    }
    res.status(200).json({
        status : 'success',
        data : {
            tours : '<updata tour here...>'
        }
    })
}

const deleteTour = (req, res) => {
     if(req.params.id * 1 > tours.length) {
        res.status(404).json({
            status : 'fail',
            message : 'Invalid ID'
        })
    }
    res.status(200).json({
        status : 'success',
        data : null
    })
}



// All routs

app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', postTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);


// app.get('/api/v1/tours', (req, res) => {
    
//     res.status(200).json({
//         status : 'success',
//         // statusCode: '200',
//         result : tours.length,
//         data : {
//             tours
//         }
//     });
// });

// app.get('/api/v1/tours/:id', (req, res) => {

//     console.log(req.params);
    
//     // this convert string to integer
//     // const tour = tours.find(el => el.id === (req.params.id * 1));
    
//     const id = req.params.id * 1;
//     const tour = tours.find(el => el.id === id);

//     if(!tour) {
//         res.status(404).json({
//             status : 'fail',
//             message : 'Ivalid ID'
//         });
//     }

    // if(id > tours.length) {
    //     res.status(404).json({
    //         status : 'fail',
    //         message : 'Ivalid ID'
    //     });
    // }
    
    
//     res.status(200).json({
//         status : 'success',
//         statusCode: '200',
//         result : tours.length,
//         data : {
//             tour
//         }
//     });
// });

// app.post('/api/v1/tours', (req, res) => {
//     // console.log(req.body);
//     const newId = tours[tours.length - 1].id + 1;
//     const newTour = Object.assign({id : newId}, req.body);
//     tours.push(newTour);

//     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
//         res.status(201).json({
//             status : "success",
//             data : {
//                 tours : newTour
//             }
//         })
//     })

//     // res.send('Done');
// })

// updat tour

// app.patch('/api/v1/tours/:id', (req, res) => {

//     if(req.params.id * 1 > tours.length) {
//         res.status(404).json({
//             status : 'fail',
//             message : 'Ivalid ID'
//         });
//     } 
//     res.status(200).json({
//         status : "success",
//         data : {
//             tours : '<updata tour here....>'
//         }
//     })
// })

// delete tour

// app.delete('/api/v1/tours/:id', (req, res) => {
//     if(req.params.id * 1 > tours.length) {
//         res.status(404).json({
//             status : 'fail',
//             message : 'Invalid ID'
//         })
//     }

//     res.status(200).json({
//         status : 'success',
//         data : null
//     })
// })


// app.get('/', (req, res) => {
//     // res.status(200).send("Hello from the server ");
//     res.status(200).json({
//         message : "Hello from the server ",
//         Auth : "Aakash is setup new project",
//         App : "MyTour",
//     })
// })

// app.post('/', (req, res) => {
//     res
//     .status(200)
//     .send('you can post to this endpoint!!!');
// })




app.listen(PORT, () => {
    // console.log("Server running on port ", PORT);
    console.log(`Server running on port : ${PORT}`);
})