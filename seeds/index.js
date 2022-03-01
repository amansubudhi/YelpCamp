const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];



const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '62193844c0d3e2cbbec10feb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            price,
            geometry: { 
                type : "Point", 
                coordinates : [
                    cities[random1000].longitude, 
                    cities[random1000].latitude,
                ]
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/dkmq03jhh/image/upload/v1645972249/Yelpcamp/svopnv4chws1cqg1qolz.jpg',
                  filename: 'Yelpcamp/aryw8y5blj53lvrcfdva',
                  
                },
                {
                  url: 'https://res.cloudinary.com/dkmq03jhh/image/upload/v1646131642/Yelpcamp/pvsmpq6rb5oaof93srv2.jpg',
                  filename: 'Yelpcamp/ifzh0inns7hdomd9bhvq',
                  
                }
              ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})