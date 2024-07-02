const express = require('express')

const router = express.Router();

router.get('/' , (req , res , next) => {
    let categories = res.locals.categories
    let slug = req.params
    let category = categories.find(category => category.slug === slug)
    res.render('frontend/page/category', {category})
})

module.exports = router;