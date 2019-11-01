const express = require('express');
const ProjectsDb = require('../helpers/projectModel');
const ActionsDb = require('../helpers/actionModel');

const router = express.Router();

//ENDPOINTS

//createAction
router('/', validateActionContent,(req, res) => {
    const { id } = req.params;
    const { description, notes } = req.body;

    ActionsDb.insert({
        project_id: id,
        description,
        notes
    })
    .then(action => { 
        res.status(201).json(action)
    })
    .catch(error => { 
        res.status(500).json(error)
    })
})


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