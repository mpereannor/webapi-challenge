const express = require('express');
const ProjectsDb = require('../helpers/projectModel');
const ActionsDb = require('../helpers/actionModel');

const router = express.Router();

//ENDPOINTS

//getActions
router.get('/', (req, res) => { 
    ActionsDb.get()
    .then(actions => { 
        res.status(200).json(actions)
    })
    .catch(error => { 
        res.status(500).json(error)
    })
})

//getActionsbyId
router.get('/:id', (req, res) => { 
    const { id } = req.params;
    ActionsDb.get(id)
    .then( (actions) => {
        res.status(201).json(actions) 
    })
    .catch(error => { 
        res.status(500).json(error)
    })
})

//createAction
router.post('/:id',(req, res) => {
    const { project_id } = req.params; 
    const { description, notes } = req.body;

    ActionsDb.insert({
        project_id,
        description,
        notes,
    })
    .then(action => { 
        res.status(201).json(action)
    })
    .catch(error => { 
        res.status(500).json(error)
    })
})

//deleteActionById
router.delete('/:id', validateActionId, (req, res) => {
    const { id } = req.action;
    ActionsDb.remove(id)
    .then(() => { 
        res.status(200).json({ 
            message: "Action deleted successfully"
        })
    })
    .catch(error => { 
        res.status(500).json({ 
            errorMessage: "Project was not deleted," + error
        })
    })
} )

//updateAction 
router.put('/:id', validateActionId, (req, res) => { 
    const { id } = req.action;
    const data = req.body;
    ActionsDb.update(id,data)
    .then(() => {
        res.status(200).json({
            ...req.action,
            ...data
        })
    })
    .catch( error => { 
        res.status(500).json({
            message: "Action unable to update" + error
        })
    })
})

//CUSTOM MIDDLEWARES 

//validateActionContent
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

//validateActionById
function validateActionId (req, res, next) { 
    const { id } = req.params;
    ActionsDb.get(id)
    .then(action => { 
        if(action){ 
            req.action = action;
            next()
        }
        else{
            res.status(404).json({
                message: "Action id is invalid"
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