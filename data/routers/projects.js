const express = require('express');
const ProjectsDb = require('../helpers/projectModel');
const ActionsDb = require('../helpers/actionModel');

const router = express.Router();

//ENDPOINTS

//createProject
router.post('/', validateProjectContent, ( req, res) => { 
    ProjectsDb.insert(req.body)
    .then(project => { 
     res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({
          message: 'Error : ' + error.message,
        })
    });
});


//getProject
router.get('/', (req, res ) => { 
    ProjectsDb.get()
    .then(data => { 
         res.status(200).json(data)
        
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: "Projects not found" + error.message 
        })
    })
})


//getProjectById

router.get('/:id', validateProjectId, (req, res) => { 
    res.status(200).json(req.project);
});

    
//deleteProjectById
router.delete('/:id', validateProjectId, (req, res) => { 
    const { id } = req.project;

    ProjectsDb.remove(id)
    .then(() => { 
        res.status(200).json({ 
            message: "Project deleted successfully"
        })
    })
    .catch(error => { 
        res.status(500).json({ 
            errorMessage: "Project was not deleted," + error
        })
    })

})

//updateProjectById

router.put('/:id', validateProjectId, validateProjectContent, (req, res) => { 
    const { id } = req.project;
    const data = req.body;

    ProjectsDb.update(id, data)
    .then(() => { 
        res.status(200).json({ 
            ...req.project, 
            ...data
        })
    })
    .catch( error => { 
        res.status(500).json({
            message: "Project unable to update" + error
        })
    })
})

router.post('/:id/actions', (req, res) => { 
    const data  = req.body;
    const { project_id} = req.params;
    const actionData = {
        ...data,
        project_id
    };

    ActionsDb.insert(actionData)
    .then(action => { 
        res.status(201).json(action);
    })
    .catch(error => {
        res.status(500).json({ 
            error
        })
    });
})   

    


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