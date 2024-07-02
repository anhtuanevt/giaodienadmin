const { Schema , model } = require("mongoose")
const slugify = require('slugify')

const ArticleModel = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    name: {
        type: String, 
        required: true 
    },
    description: {
        type: String, 
    },
    title: {
        type: String, 
    },
    thumbnail: {
        type: String, 
    },
    is_hot: {
        type: Boolean,
    },
    is_home: {
        type: Boolean,
    },
    author: {
        type: String, 
        required: true 
    },
    status: {
        type: String, 
        enum: ['active', 'inactive'],
        default: 'active'
    },
    ordering: {
        type: Number,
        required: true 
    },
    tags: {
        type: [String],
        required: true 
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    slug: {
        type: String,
    }
},{ timestamps: true })


ArticleModel.pre('save', function(next){
    if (!this.isModified('name')) {
        return next();
    }
    this.slug = slugify(this.name, { lower: true });
    next();
})

ArticleModel.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update.name) {
        this.setUpdate({
            ...update,
            slug: slugify(update.name, { lower: true })
        });
    }
    next();
});


module.exports = model('articles' , ArticleModel)