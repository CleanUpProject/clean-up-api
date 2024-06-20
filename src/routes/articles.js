const express = require('express');
const router = express.Router();
const db = require('../config');

// Fungsi untuk mendapatkan ID baru
const getNextId = async () => {
  const snapshot = await db.collection('article').orderBy('id', 'desc').limit(1).get();
  if (snapshot.empty) {
    return 0;
  } else {
    return snapshot.docs[0].data().id + 1;
  }
};

// CREATE
router.post('/', async (req, res, next) => {
  try {
    const { content, imgurl, source, title } = req.body;
    if (!content || !imgurl || !source || !title) {
      throw { status: 400, message: 'Missing required fields: content, imgurl, source, title' };
    }
    const id = await getNextId();
    await db.collection('article').doc(id.toString()).set({ id, content, imgurl, source, title });
    res.status(201).send({ message: 'Article created successfully', id });
  } catch (error) {
    next(error); // Forward error to error handling middleware
  }
});

// READ all articles
router.get('/', async (req, res, next) => {
  try {
    const articleSnapshot = await db.collection('article').get();
    const article = articleSnapshot.docs.map(doc => doc.data());
    res.status(200).send({ message: 'Articles retrieved successfully', article });
  } catch (error) {
    next(error); // Forward error to error handling middleware
  }
});

// READ specific article by id
router.get('/:id', async (req, res, next) => {
  try {
    const article = await db.collection('article').doc(req.params.id).get();
    if (!article.exists) {
      throw { status: 404, message: 'Article not found' };
    } else {
      res.status(200).send({ message: 'Article retrieved successfully', article: article.data() });
    }
  } catch (error) {
    next(error); // Forward error to error handling middleware
  }
});

// UPDATE
router.put('/:id', async (req, res, next) => {
  try {
    const { content, imgurl, source, title } = req.body;
    if (!content || !imgurl || !source || !title) {
      throw { status: 400, message: 'Missing required fields: content, imgurl, source, title' };
    }
    const article = await db.collection('article').doc(req.params.id).get();
    if (!article.exists) {
      throw { status: 404, message: 'Article not found' };
    } else {
      await db.collection('article').doc(req.params.id).update({ content, imgurl, source, title });
      res.status(200).send({ message: 'Article updated successfully' });
    }
  } catch (error) {
    next(error); // Forward error to error handling middleware
  }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const article = await db.collection('article').doc(req.params.id).get();
    if (!article.exists) {
      throw { status: 404, message: 'Article not found' };
    } else {
      await db.collection('article').doc(req.params.id).delete();
      res.status(200).send({ message: 'Article deleted successfully' });
    }
  } catch (error) {
    next(error); // Forward error to error handling middleware
  }
});

module.exports = router;
