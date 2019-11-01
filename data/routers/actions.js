const express = require('express');
const ProjectsDb = require('../helpers/projectModel');
const ActionsDb = require('../helpers/actionModel');

const router = express.Router();

//ENDPOINTS

//postAction
// router.post('/', (res, req) => { 
//     const br = req.body;
//     br;
//     const action = { 
//         name: req.body.name,
//         description: req.body.description,
//         notes: req.body.notes
//     };

//     ActionsDb.insert(action)
//     .then(data => { 
//         return res.status(200).json(data)
//     })
// })

//postProjectById
// Users.getUserPosts(id)
// .then( user => { 
//     return res.status(200).json(req.user)
// })
// .catch((error) => {
//     return res.status(500).json({
//         message: `The Post could not be retrieved: ${error}`
//     });
// });

// });

// router.get('/:id', (res, req) => { 
//     const dd = req.params;
//     console.log(dd);
//     const { id } = req.params;
//     ActionsDb.get(id)
//     .then(data => { 
//         return res.status(200).json(data)
//     })
// })

//getProject

//getProjectById

//deleteProjectById

//updateProjectById

//CUSTOM MIDDLEWARES 

//validateProjectContent
// function validatePost(req, res, next) {
//     const { text } = req.body;

//     if (!Object.keys(req.body).length) {
//         return res.status(400).json({
//             message: "Post data missing"
//         })
//     }
//     else if(!text) {
//         return  res.status(400).json({
//             message: "Text field required"
//         })
//     } 
//     next();
// }

function validateActionContent (req, res, next) { 
    const { name, description, notes } = req.body;
    
    if(!Object.keys(req.boy).length) { 
        return res.status(400).json({ 
            message: "Project data missing"
        })
    }
    else if(!name && !description && !notes) {
        return res.status(400).json({
            message: "Name, Description and Notes field required"
        })
    }
    next();
}

//validateProject

//validateAction

module.exports = router;