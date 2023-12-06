const Artikel = require('../models/artikelModel')
const Info = require('../models/infoModel')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image'); // Specify the destination folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });


//info func
exports.createInfo = async (req, res) => {
    const {judul, isi, penulis} = req.body

    try{
        const info = await Info.create({judul, isi, penulis})
        return res.status(201).json(info)
    } catch(error){
        console.error('error:', error)
        return res.status(500).json({error:'server error'})
    }

}

exports.getInfo = async(req, res)=>{
    try{
        const info = await Info.findAll()
        return res.status(201).json(info)
    } catch(error){
        console.error('error:', error)
        return res.status(500).json({error:'server error'})
    }
}

exports.getInfobyId = async(req, res)=>{
    try{
        const info = await Info.findOne({
            id:req.params.id
        })
        return res.status(201).json(info)
    } catch(error){
        console.error('error:', error)
        return res.status(500).json({error:'server error'})
    }
}

exports.updateInfo = async(req, res)=>{
    try{
        const info = await Info.findOne({
            where: {
                id:req.params.id
            }
        })
    if(!info){
        return res.status(404).json({message:"not found"})
    }
    await info.update(req.body)
    return res.status(201).json(info)
    } 
    catch(error){
        console.error('error:', error)
        return res.status(500).json({error:'server error'})
    }
}

exports.deleteInfo = async(req, res)=>{
    try{
        const info = await Info.findOne({
            where:{
                id:req.params.id
            }
        })
        if(!info){
            return res.status(404).json({message:"not found"})
        }
        await info.destroy()
        return res.status(201).json(info)
    }
    catch(error){
        console.error('error:', error)
        return res.status(500).json({error:'server error'})
    }
}

//artikel func
exports.createArtikel = async (req, res) => {
    upload.single('image')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'Image upload error' });
        } else if (err) {
            return res.status(500).json({ error: err });
        }

        const { judul, shortdeskripsi, fulldeskripsi } = req.body;
        const image = req.file ? req.file.filename : null; // Get the uploaded image filename

        try {
            const article = await Artikel.create({
                judul,
                shortdeskripsi,
                fulldeskripsi,
                image,
            });
            return res.status(201).json(article);
        } catch (error) {
            console.error('error:', error);
            return res.status(500).json({ error: 'Server error' });
        }
    });
};

exports.getArtikel = async (req, res)=>{

    try{
        const article = await Artikel.findAll()
        return res.status(201).json(article)
    }
    catch(error){
        console.error('error:', error)
        return res.status(500).json({error:'server error'})
    }
}

exports.getArtikelbyID = async(req, res)=>{
    try{
        const article = await Artikel.findOne({
            where:{
                id: req.params.id,
            },
        })
        if (!article){
            return res.status(404).json({message:"not found"})
        }
        return res.status(201).json(article)
    } catch(error){
        return res.status(500).json({error: 'server error'})
    }
}


exports.deleteArtikel = async (req, res) => {
    try {
      const article = await Artikel.findOne({
        where: {
          id: req.params.id,
        },
      });
  
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
      // Delete associated image file if it exists
      if (article.image) {
        const imagePath = path.join(__dirname, '../public/image', article.image);
        fs.unlinkSync(imagePath);
    }
    await article.destroy();

    return res.json({ message: 'Article deleted successfully' });
} catch (error) {
    console.error('Error:', error); // Add this line to log the error
    return res.status(500).json({ error: 'Internal server error' });
}
  };

exports.updateArtikel = async (req, res) => {
    try{
        const article = await Artikel.findOne({
            where: {
                id: req.params.id
            }
        })

        if(!article){
            return res.status(404).json({message: 'not found'})
        }
        await article.update(req.body)
        return res.status(201).json(article)
    }
    catch(error){
        return res.status(500).json({ error: 'Internal server error' });
    }
}


