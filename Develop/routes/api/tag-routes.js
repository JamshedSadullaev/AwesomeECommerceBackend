const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    });

    res.status(200).json(tagData);

  } catch {

    res.status(500).json(err);

  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'Tag was not  found ' + req.params.id });
      return;
    }

    res.status(200).json(tagData);

  } catch {

    res.status(500).json(err);

  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/',async (req, res) => {
  // create a new tag
  try {
    const newTagData = await Tag.create({
      tag_name: req.body.tag_name,
    });

    res.status(200).json(newTagData);

  } catch (err) {

    res.status(400).json(err);

  }
});

router.put('/:id',async  (req, res) => {
  try{
    const tagData = await Tag.findByPk(req.params.id);
    const updateTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'Tag was not found ' + req.params.id });
      return;
    }
  
    if (!updateTagData[0]) {
      res.status(400).json({ message: 'Tag was not updated  ' + req.params.id  });
      return;
    };

    res.status(200).json(updateTagData);

  } catch {

    res.status(500).json(err);

  };
  // update a tag's name by its `id` value
});

router.delete('/:id',async  (req, res) => {
  try {
    const deleteTagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteTagData) {
      res.status(404).json({ message: 'Tag was not found  ' + req.params.id });
      return;
    }

    res.status(200).json(deleteTagData);

  } catch (err) {

    res.status(500).json(err);

  }

  // delete on tag by its `id` value
});

module.exports = router;
