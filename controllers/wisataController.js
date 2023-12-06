const fs = require('fs');
const wisatadata = JSON.parse(fs.readFileSync('./public/wisata.json', 'utf-8'));
const wisatakategori = JSON.parse(fs.readFileSync('./public/kategori.json', 'utf-8'))
const haversine = require('haversine-distance');
const { request } = require('http');

  exports.filterwisatabudaya = (req, res) => {
    const budaya = "Wisata Budaya Dan Edukasi";
    if (!budaya) {
      return res.status(400).json({ error: 'City parameter is missing.' });
    }
    
    const filteredData = wisatadata.filter((item) => item.compile === budaya);
    const filteredDataarray = Object.values(filteredData);
    res.json(filteredDataarray);
  };

  exports.homewisatabudaya = (req, res) =>{
    const budaya = "Wisata Budaya Dan Edukasi";
    const Arraybudaya = Object.values(wisatadata);
    const startIndex = 1;
    const endIndex = 4;
    const filteredData = Arraybudaya.filter((item) => item.compile === budaya);
    const slicedbudaya = filteredData.slice(startIndex, endIndex + 1);
    
    console.log(slicedbudaya)

    res.json(slicedbudaya);
  };

  exports.filterwisataalam = (req, res) =>{
    const alam = "Wisata Alam";
    const filteredDataalam = wisatadata.filter((item) => item.compile == alam);
    const filteredDataarraybudaya = Object.values(filteredDataalam);
    res.json(filteredDataarraybudaya)
  };

  exports.homewisataalam = (req, res)=>{
    const alam = "Wisata Alam";
    const Arrayalam = Object.values(wisatadata);
    const startIndex = 1;
    const endIndex = 4;
    const filteredData = Arrayalam.filter((item) => item.compile === alam);
    const slicedalam = filteredData.slice(startIndex, endIndex + 1);
    res.json(slicedalam)
  }

  exports.filterdesawisata = (req, res) =>{
    const desa = "Desa Wisata"
    const filteredDatadesa = wisatadata.filter((item)=> item.compile == desa)
    const filteredDataarraydesa = Object.values(filteredDatadesa)
    res.json(filteredDataarraydesa)
  }

  exports.homedesawisata = (req, res)=>{
    const desa = "Desa Wisata"
    const Arraydesa = Object.values(wisatadata)
    const startIndex = 1
    const endIndex = 4
    const filteredData = Arraydesa.filter((item)=> item.compile == desa)
    const slicedesa = filteredData.slice(startIndex, endIndex + 1)
    res.json(slicedesa)
  }

  exports.wisatabykategori = (req, res) => {
    const { kategori } = req.params;
  
    const filteredWisata = wisatadata.filter(item => {
      return !kategori || item.compile === kategori;
    });
    res.json(filteredWisata);
  };


  exports.kategorireq = (req, res) => {
    const { kategori } = req.params
    const filteredKategori = wisatakategori.filter(item => {
      return !kategori || item.namakategori == kategori
    })
    res.json(filteredKategori)

  }

  exports.kategorilist = (req, res) =>{
    const kategori = wisatakategori
    const data = Object.values(kategori)
    res.json(data)
  }



