const cartModel = require('../models/CartModel');
const axios = require("axios");
const mongoose = require('mongoose');



const addToCart = async (req, res) => {
    const { userId, courseId,quantity } = req.body;

    try {

        const existingCartItem = await cartModel.findOne({ userId, courseId });
        if (existingCartItem) {
            return res.status(400).json({ message: "Course already in cart" });
        }

        const newCartItem = new cartModel({ userId, courseId,quantity });
        await newCartItem.save();

        res.status(200).json({ message: "Course added to cart", cartItem: newCartItem });

    } catch (err) {
        res.status(500).json({ message: "Couldn't add the course", error: err.message });
    }
};

const getCartById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const cartItems = await cartModel.find({ userId: id });
  
      if (!cartItems.length) {
        return res.status(404).json({ message: "No cart items found" });
      }

      console.log("cart items",cartItems);
  
      const enrichedCartItems = await Promise.all(
        cartItems.map(async (item) => {
          try {
            const courseRes = await axios.get(
              `http://course-service:7000/api/courses/getCourseById/${item.courseId}`
            );

            console.log("course res",courseRes);
  
            return {
              ...item.toObject(),
              courseId: {
                _id: item.courseId,
                ...courseRes.data, 
              },
            };
          } catch (error) {
            console.error("Error fetching course", item.courseId);
            console.error("Message:", error.message);
          
            if (error.response) {
              console.error("Status:", error.response.status);
              console.error("Data:", error.response.data);
            } else if (error.request) {
              console.error("No response received from course-service");
              console.error(error.request);
            } else {
              console.error("Unexpected Error", error);
            }
          }
          
        })
      );
  
      res.status(200).json({ cartItems: enrichedCartItems });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error fetching cart items" });
    }
  };
  

const deleteItem = async(req,res)=>{

    try{
        const {id} = req.params;

        const deleteCourse = await cartModel.findByIdAndDelete(id);

        res.status(200).json({message:"course delete successfully",deleteCourse});

    }catch(err){
        console.log(err);
        res.status(500).json({message:"couldnt delete the course"})
    }

}


const clearCart = async (req, res) => {
  const userId = req.params.userId;

  try {
    const objectId = new mongoose.Types.ObjectId(userId);

    const result = await cartModel.deleteMany({ userId: objectId });
    console.log("Deleted count:", result.deletedCount);

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};



module.exports = { addToCart,getCartById,deleteItem,clearCart };
