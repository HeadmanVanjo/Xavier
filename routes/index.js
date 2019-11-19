const express = require('express');
const router = express.Router()
const blogPost = require('../models/blogposts')

// ============home route===========
router.get('/', async(req, res) => {
    await blogPost.find({}, { '_id': 1, _id: 0 }).sort({ '_id': -1 }).then(posts => {
        res.render('pages/index', { posts: posts })

    })
});
// ====================about  route===========
router.get('/about', (req, res) => {
    res.render('pages/about')
});
// =================contact route===================
router.get('/contact', (req, res) => {
    res.render('pages/contact')
})

module.exports = router