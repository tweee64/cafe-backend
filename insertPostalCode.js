const connectDB = require("./db");
const PostalCode = require("./models/PostalCode");

const postalCodes = [
  {
    zone: "City",
    district: "01",
    postalSector: ["01", "02", "03", "04", "05", "06"],
    location: "Raffles Place, Cecil, Marina, People’s Park",
  },
  {
    zone: "City",
    district: "02",
    postalSector: ["07", "08"],
    location: "Anson, Tanjong Pagar",
  },
  {
    zone: "South",
    district: "03",
    postalSector: ["14", "15", "16"],
    location: "Queenstown, Tiong Bahru",
  },
  {
    zone: "South",
    district: "04",
    postalSector: ["09", "10"],
    location: "Telok Blangah, Harbourfront",
  },
  {
    zone: "West",
    district: "05",
    postalSector: ["11", "12", "13"],
    location: "Pasir Panjang, Hong Leong Garden, Clementi New Town",
  },
  {
    zone: "City",
    district: "06",
    postalSector: ["17"],
    location: "High Street, Beach Road (part)",
  },
  {
    zone: "City",
    district: "07",
    postalSector: ["18", "19"],
    location: "Middle Road, Golden Mile",
  },
  {
    zone: "Central",
    district: "08",
    postalSector: ["20", "21"],
    location: "Little India",
  },
  {
    zone: "Central",
    district: "09",
    postalSector: ["22", "23"],
    location: "Orchard, Cairnhill, River Valley",
  },
  {
    zone: "Central",
    district: "10",
    postalSector: ["24", "25", "26", "27"],
    location: "Ardmore, Bukit Timah, Holland Road, Tanglin",
  },
  {
    zone: "Central",
    district: "11",
    postalSector: ["28", "29", "30"],
    location: "Watten Estate, Novena, Thomson",
  },
  {
    zone: "Central",
    district: "12",
    postalSector: ["31", "32", "33"],
    location: "Balestier, Toa Payoh, Serangoon",
  },
  {
    zone: "East",
    district: "13",
    postalSector: ["34", "35", "36", "37"],
    location: "Macpherson, Braddell",
  },
  {
    zone: "East",
    district: "14",
    postalSector: ["38", "39", "40", "41"],
    location: "Geylang, Eunos",
  },
  {
    zone: "East",
    district: "15",
    postalSector: ["42", "43", "44", "45"],
    location: "Katong, Joo Chiat, Amber Road",
  },
  {
    zone: "East",
    district: "16",
    postalSector: ["46", "47", "48"],
    location: "Bedok, Upper East Coast, Eastwood, Kew Drive",
  },
  {
    zone: "East",
    district: "17",
    postalSector: ["49", "50", "81"],
    location: "Loyang, Changi",
  },
  {
    zone: "East",
    district: "18",
    postalSector: ["51", "52"],
    location: "Tampines, Pasir Ris",
  },
  {
    zone: "North",
    district: "19",
    postalSector: ["53", "54", "55", "82"],
    location: "Serangoon Garden, Hougang, Punggol",
  },
  {
    zone: "North",
    district: "20",
    postalSector: ["56", "57"],
    location: "Bishan, Ang Mo Kio",
  },
  {
    zone: "West",
    district: "21",
    postalSector: ["58", "59"],
    location: "Upper Bukit Timah, Clementi Park, Ulu Pandan",
  },
  {
    zone: "West",
    district: "22",
    postalSector: ["60", "61", "62", "63", "64"],
    location: "Jurong",
  },
  {
    zone: "West",
    district: "23",
    postalSector: ["65", "66", "67", "68"],
    location: "Hillview, Dairy Farm, Bukit Panjang, Choa Chu Kang",
  },
  {
    zone: "West",
    district: "24",
    postalSector: ["69", "70", "71"],
    location: "Lim Chu Kang, Tengah",
  },
  {
    zone: "North",
    district: "25",
    postalSector: ["72", "73"],
    location: "Kranji, Woodgrove",
  },
  {
    zone: "North",
    district: "26",
    postalSector: ["77", "78"],
    location: "Upper Thomson, Springleaf",
  },
  {
    zone: "North",
    district: "27",
    postalSector: ["75", "76"],
    location: "Yishun, Sembawang",
  },
  {
    zone: "North",
    district: "28",
    postalSector: ["79", "80"],
    location: "Seletar",
  },
];

const run = async () => {
  try {
    // Connect to MongoDB using Mongoose
    await connectDB();

    // Insert data into the postal_codes collection
    const result = await PostalCode.insertMany(postalCodes);
    console.log(`${result.length} postal codes inserted successfully!`);
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

run();
