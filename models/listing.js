// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required : true,
//     },
//     description: String,
//     image: {
//     type: {
//         filename: String,
//         url: String
//     },
//     default: {
//         filename: "listingimage",
//         url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157"
//     }
// },

//     // image: {
//     //     type: String,
//     //     default: "https://unsplash.com/photos/snow-capped-mountains-under-a-starry-night-sky-WrGn66CcrwI",
//     //     set: (v) => v === "" 
//     //     ? "https://unsplash.com/photos/snow-capped-mountains-under-a-starry-night-sky-WrGn66CcrwI" 
//     //     : v,
//     // },
//     price: Number,
//     location: String,
//     country: String,
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;


const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { required } = require("joi");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,


//     image: {
//     filename: {
//         type: String,
//         default: "listingimage"
//     },
//     url: {
//         type: String,
//         default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157",
//         set: (v) => v === "" ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157" : v
//     }
// },

    image: {
        url: String,
        filename: String,
    },


    // price: Number,
    price: {
    type: Number,
    required: true,
    min: 0
},
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry : {
        type: {
            type: String,  // Don't do `{ location: { tyoe: String } }`
            enum: ['Point'],  // 'location.type' must be 'Point
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
    await Review.deleteMany({ _id : { $in: listing.reviews } })
    }
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
