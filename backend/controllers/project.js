const dbModels = require("../models");
const Project = dbModels.projects;
const fs = require('fs');
const path = require('path');

exports.getAllProjects = (req, res, next) => {
  Project.findAll()
    .then(projects => {
      // Map projects to include imgUrl property
      const mappedProjects = projects.map(project => {
        return {
          id: project.id,
          imgUrl: `${req.protocol}://${req.get("host")}/images/${project.imgUrl}`, // include imgUrl here
          title: project.title,
          description: project.description,
          stack: project.stack,
          live: project.live,
          code: project.code
        };
      });
      res.status(200).json(mappedProjects);
    })
    .catch(error => res.status(400).json(error));
};

exports.getOneProject = (req, res, next) => {
  const projectId = req.params.id;

  Project.findByPk(projectId)
    .then(project => {
      if (!project) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }

      const mappedProject = {
        id: project.id,
        imgUrl: `${req.protocol}://${req.get("host")}/images/${project.imgUrl}`,
        title: project.title,
        description: project.description,
        stack: project.stack,
        live: project.live,
        code: project.code
      };

      res.status(200).json(mappedProject);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

exports.createProject = (req, res, next) => {
    const projectObject = req.body;
    const project = new Project({
        ...projectObject
    });

    if (req.file) {
        const imageUrl = `${req.file.filename.split('.')[0]}optimized.webp`;
        project.imgUrl = imageUrl;
    }

    project.save()
        .then(() => { res.status(201).json({ message: 'Projet créé' }); })
        .catch(error => { res.status(400).json({ error }); });
};

exports.updateProject = async (req, res, next) => {
  const projectId = req.params.id;
  const { title, description, stack, live, code } = req.body;
  let imgUrl = null;
  let imgData = null;

  if (req.file) {
    imgData = fs.readFileSync(req.file.path);
    imgUrl = `${req.file.filename.split('.')[0]}optimized.webp`;
  }

  try {
    const project = await Project.findByPk(projectId);

    if (!project) {
      res.status(404).json({ error: 'Projet non trouvé' });
      return;
    }

    // Mettre à jour les champs du projet si modifiés
    if (title) {
      project.title = title;
    }

    if (description) {
      project.description = description;
    }

    if (stack) {
      project.stack = stack;
    }

    if (live) {
      project.live = live;
    }

    if (code) {
      project.code = code;
    }

    if (imgUrl) {
      // Supprimer l'ancienne image du projet
      const oldImgUrl = project.imgUrl.toString(); // Convertir en chaîne de caractères
      const oldFileName = path.parse(oldImgUrl).base;
      const oldFilePath = path.resolve('images', oldFileName);

      fs.unlink(oldFilePath, (err) => {
        if (err) {
          console.error(err);
        }
      });

      project.imgUrl = imgUrl;
    }

    await project.save();

    res.json({ message: 'Projet mis à jour avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du projet' });
  }
};

exports.deleteProject = async (req, res, next) => {
  const projectId = req.params.id;

  try {
    const project = await Project.findByPk(projectId);

    if (!project) {
      res.status(404).json({ error: 'Projet non trouvé' });
      return;
    }

    const imgUrl = project.imgUrl.toString(); // Convertir en chaîne de caractères
    const fileName = path.parse(imgUrl).base;
    const filePath = path.join('images', fileName);

    await project.destroy();

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du fichier' });
      } else {
        // Supprimer également l'image optimisée si elle existe
        const optimizedFileName = `${path.parse(fileName).name}optimized.webp`;
        const optimizedFilePath = path.join('images', optimizedFileName);

        fs.unlink(optimizedFilePath, (err) => {
          if (err) {
            console.error(err);
          }

          res.json({ message: 'Projet supprimé avec succès' });
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression du projet' });
  }
};



