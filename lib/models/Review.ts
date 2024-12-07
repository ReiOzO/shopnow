import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    customerClerkId: String,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        }
    ],
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;