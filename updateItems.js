require('dotenv').config(); // Add this line at the top
const connectDB = require("./db");
const Item = require('./models/items');

const updateCafes = async () => {
  try {
    // Connect to database first
    await connectDB();
    console.log('Connected to database');
    
    // Sample data updates
    const updates = [
      { name: "Blue Bottle Coffee", priceRange: "$$$", cafeType: "Specialty Coffee" },
      { name: "Neptune", priceRange: "$$", cafeType: "Independent" },
      { name: "Acoustic Coffee Bar", priceRange: "$$", cafeType: "Independent" },
      { name: "The Coffee Code", priceRange: "$", cafeType: "Independent" },
      { name: "Common Man Roasters Joo Chiat", priceRange: "$$", cafeType: "Specialty Coffee" },
      { name: "September Coffee", priceRange: "$", cafeType: "Independent" },
      { name: "Atlas Coffeehouse", priceRange: "$$", cafeType: "Independent" },
      { name: "zongwei's cafe", priceRange: "$$", cafeType: "Independent" },

    ];

    for (const update of updates) {
      const result = await Item.updateOne(
        { name: update.name },
        { 
          $set: { 
            priceRange: update.priceRange,  // Add this line
            cafeType: update.cafeType 
          } 
        }
      );
      
      if (result.matchedCount > 0) {
        console.log(`Updated: ${update.name}`);
      } else {
        console.log(`Not found: ${update.name}`);
      }
    }

    console.log('All cafes updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating cafes:', error);
    process.exit(1);
  }
};

updateCafes();