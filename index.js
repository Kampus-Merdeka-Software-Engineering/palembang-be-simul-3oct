const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3000;



app.use(cors());
app.use( bodyParser.json())


const sequelize = new Sequelize('mysql://root:trRZre2Y6rAaskXDeXLX@containers-us-west-135.railway.app:5435/railway')

const Product = sequelize.define('Product', {
    // Model attributes are defined here
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_name: {
        type: DataTypes.STRING,
    }
  }, {
    tableName: 'products',
    timestamps: false
  });  


// console.log(P);
const jalanKanServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        app.get('/products', async (req, res) => {
            let a = await Product.findAll();
            res.json(a);
        })
        

        app.post('/product', async (req, res) => {

            let data = req.body;
            let a = await Product.create({
                product_name: data.product_name,
                category_name: data.category_name,
            })
            res.json(a)
        });
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

jalanKanServer();