const express = require('express');
const ProjectsDb = require('../helpers/projectModel');
const ActionsDb = require('../helpers/actionModel');

const router = express.Router();

//ENDPOINTS

//createProjects
router.post('/', validateProjectContent, (res, req) => { 
    ProjectsDb.insert(req.body)
    .then(project => { 
        return res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({
          message: 'Error : ' + error.message,
        })
    });
});


//getProject
router.get('/', (res, req) => { 
    ProjectsDb.get()
    .then(data => { 
        return res.status(200).json(data)
        
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: "Projects not found" + error.message 
        })
    })
})


//getProjectById

router.get('/:id', validateProjectId, (res, req) => { 
    res.json(req.project);
});

    
//deleteProjectById

//updateProjectById



//CUSTOM MIDDLEWARES 

function validateProjectContent (req, res, next) { 
    const { name, description } = req.body;
    
    if(!Object.keys(req.body).length) { 
        return res.status(400).json({ 
            message: "Project data missing"
        })
    }
    else if(!name && !description) {
        return res.status(400).json({
            message: "Name and Description field required"
        })
    }
    next();
}


//validateProjectid
function validateProjectId (req, res, next) { 
    const { id }= req.params;

    ProjectsDb.get(id)
    .then(project => { 
        if(project) { 
            req.project = project;
            next()
        }
        else {
            res.status(404).json({
                message: "Project id is invalid"
            })
        }
    })
    .catch(error => { 
        res.status(404).json({ 
            message: "Error Check id" + error.message
        })
    })
}


module.exports = router;