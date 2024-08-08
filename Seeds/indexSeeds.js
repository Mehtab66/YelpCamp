const mongoose = require("mongoose");
const Campground = require("../Models/Campground");
const cities = require("./cities");
const { places, descriptors } = require("./SeedHelpers");
try {
  mongoose.connect("mongodb://127.0.0.1:27017/YELPCAMP");
  console.log("connection sucessfully fucking full");
} catch (error) {
  console.log(error);
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 100; i++) {
    const random = Math.floor(Math.random() * 30);
    const price = Math.floor(Math.random() * 100) + 100;
    const camp = new Campground({
      author: "667aab9d4e120a46aff53274",
      location: `${cities[random].city}, ${cities[random].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image:
        "https://images.unsplash.com/photo-1718762538704-9698cd001106?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
      description:
        "Welcome to Serene Haven Campground, your idyllic retreat nestled in the heart of nature's bounty. Our campground offers a perfect blend of rustic charm and modern amenities, ensuring a delightful stay for all types of campers—from the seasoned outdoor enthusiast to the family seeking a peaceful getaway.",
      price,
    });
    await camp.save();
  }
};

seedDb();
