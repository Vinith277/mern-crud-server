const Post = require('../models/post');
const slugify = require('slugify');

exports.create = (req, res) => {
    // console.log(req.body);
    const { title, content, user } = req.body;
    const slug = slugify(title);
    // validate
    if(!title || !content){
        return res.status(400).json({
            error: 'Title and content is required'
        })
    }

    //create post
    Post.create({title, content, user, slug}, (err, post) => {
        if(err){
            console.log(err);
            res.status(400).json({error: 'Duplicate post'});
        }
        res.json(post);
    });
};

exports.list = (req, res) => {
    Post.find({})
        .limit(10)
        .sort({createdAt: -1})
        .exec((err, posts) => {
            if(err) console.log(err);
            res.json(posts);
    });
};

exports.read = (req, res) => {
    //console.log(req.params.slug)
    const {slug} = req.params
    Post.findOne({slug})
        .exec((err, post) => {
            if(err) console.log(err);
            res.json(post);
    });
};

exports.update = (req, res) => {
    const { slug } = req.params;
    const {title, content, user} = req.body
    Post.findOneAndUpdate({slug}, {title, content, user}, {new: true}).exec((err, post) => {
        if(err) console.log(err);
        res.json(post);
    });
};

exports.remove = (req, res) => {
    const {slug} = req.params
    Post.findOneAndRemove({slug}).exec((err, post) => {
        if(err) console.log(err);
        res.json({
            messsage: 'Post Deleted'
        });
    });
};
