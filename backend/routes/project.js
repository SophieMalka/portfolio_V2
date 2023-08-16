const express = require('express');
const router = express.Router();

const projectCtrl = require('../controllers/project');
const multer = require('../middlewares/multer');
const optimizedImg = require('../middlewares/sharp');

router.get('/', projectCtrl.getAllProjects);
router.get('/:id', projectCtrl.getOneProject);
router.post('/', multer, optimizedImg, projectCtrl.createProject);
router.put('/:id', multer, optimizedImg, projectCtrl.updateProject);
router.delete('/:id', projectCtrl.deleteProject);

module.exports = router;