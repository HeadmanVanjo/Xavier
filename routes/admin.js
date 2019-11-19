const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary')
const multer = require('multer')
const path = require('path')
const blogPost = require('../models/blogposts')

// =============setting up atorage engine===========
const storage = multer.diskStorage({
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    })
    // ============configuring multer==================
const upload = multer({
    storage: storage,
    // limiting the filesize
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

// check file typee function
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        // cb('error')
        console.log('error')
    }
}

// =====setting up cloudinary=============
cloudinary.config({
    cloud_name: 'dc0xuh9tc',
    api_key: '591482536545219',
    api_secret: 'DjECwxkyidJ-R6DFcNolX7l_Ras'
})

// ====================admin route==============
router.get('/', (req, res) => {
    res.render('admin/index', { layout: 'adminLayout' })
});

// ===============posts route ======================
router.route('/posts')
    .get((req, res) => {
        res.render('admin/posts', { layout: 'adminLayout' })
    })
    .post(upload.single('fileupload'), async(req, res, next) => {
        console.log(req.body)
        await cloudinary.v2.uploader.upload(req.file.path, async(err, result) => {
            console.log(result)
            let { title, body, topics } = req.body
            var fileupload = result.secure_url
            let newBlogPost = new blogPost({ title, body, topics, fileupload, date: Date.now() })
            console.log(newBlogPost)


            await newBlogPost.save().then(blogpost => {
                req.flash('success', 'post created successfully')
                return res.redirect('/admin/posts')
            }).catch(err => {
                console.log(err)
            })
        })
    })

// ===============Topics route ======================
router.get('/topics', (req, res) => {
    res.render('admin/topics', { layout: 'adminLayout' })
});

// ===============create topics ===================
router.get('/createtopics', (req, res) => {
    res.render('admin/createtopics', { layout: 'adminLayout' })
});

// ======================= users route ====================
router.get('/users', (req, res) => {
    res.render('admin/users', { layout: 'adminLayout' })
});

// ========================= createUsers route =====================
router.get('/createUser', (req, res) => {
    res.render('admin/createUser', { layout: 'adminLayout' })
});

module.exports = router