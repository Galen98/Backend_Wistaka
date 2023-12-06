const express = require('express');
const sequelize = require('./db/sequalize');
const userRoutes = require('./routes/userRoutes');
const infoRoutes = require('./routes/infoRoutes')
const wisataController = require('./controllers/wisataController')
const locationnearby = require('./controllers/locationnearby')
const adminontroller = require('./controllers/adminController')
const cors = require('cors');
require("dotenv/config");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser')
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);

app.use('/api', userRoutes);
app.get('/api/wisatabudaya', wisataController.filterwisatabudaya);
app.get('/api/desawisata', wisataController.filterdesawisata)
app.get('/api/bodydesawisata', wisataController.homedesawisata)
app.get('/api/bodybudaya', wisataController.homewisatabudaya);
app.get('/api/wisataalam', wisataController.filterwisatabudaya)
app.get('/api/bodyalam', wisataController.homewisataalam)
app.get('/api/wisatabykategori/:kategori', wisataController.wisatabykategori)
app.get('/api/kategori/:kategori', wisataController.kategorireq)
app.get('/api/getkategori', wisataController.kategorilist)
app.post('/nearby', locationnearby.findNearbyLocations);

//route for artikel
app.post('/api/artikelpost', adminontroller.createArtikel)
app.get('/api/artikelget', adminontroller.getArtikel)
app.get('/api/artikelget/:id', adminontroller.getArtikelbyID)
app.delete('/api/artikeldelete/:id', adminontroller.deleteArtikel)
app.patch('/api/editartikel/:id', adminontroller.updateArtikel)

//user for info
app.use('/api', infoRoutes);

const PORT = process.env.PORT || 8000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});