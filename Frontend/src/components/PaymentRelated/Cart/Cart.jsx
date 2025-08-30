import React, { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

function Cart() {

    const{user} = useContext(AuthContext);

    const { deleteCourse, cartItems,totalPrice} = useContext(CartContext);

    console.log("cartItems",cartItems)
    console.log("cartItem length",cartItems.length);

  
    const paymentPrice = totalPrice.reduce((acc, price) => acc + price, 0);

    const handleCheckout = async () => {
        try {
          const response = await axios.post("http://localhost:7003/api/payment/create-checkout-session", {
            cartItems,
            userName: user?.name,
          }, {
            withCredentials:true
          });
      
          window.location.href = response.data.url; 
        } catch (error) {
          console.error("Payment Error:", error);
          alert("Failed to initiate payment");
        }
      };
      

    return (
        <div className="mt-20 h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-6 flex flex-col overflow-auto">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-2xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Shopping Cart</h1>

             
                <div className="text-xl font-semibold text-gray-800 mb-6">
                    <span>Total Price: </span>
                    <span className="text-orange-500">${paymentPrice}</span>
                </div>

                          
                            <div className="flex flex-wrap gap-8 justify-center">
                {cartItems.length > 0 ? (

                    
                    
                    cartItems.map((info, index) => (
                        <Link to={`/courseDetails/${info.courseId._id}`}>
                        <div
                            key={index}
                            className="flex flex-col justify-between bg-white rounded-lg shadow-lg overflow-hidden w-64 p-4 hover:shadow-xl transition-shadow duration-300 h-full"
                        >
                          
                            <div className="flex-grow">
                            
                                <h2 className="text-lg font-semibold text-gray-800">{info.courseId.courseName}</h2>

                            
                                <img
                                    src={`http://localhost:7000/uploads/${info.courseId.photo}`}
                                    alt={info.courseId.courseName}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />

                             
                                <div className="flex items-center justify-between text-gray-600">
                                    <span className="font-semibold">Quantity:</span>
                                    <span>{info.quantity}</span>
                                </div>
                            </div>

                          
                            <button
                                className="mt-4 text-red-500 hover:text-red-700 transition duration-200"
                                onClick={(e) => {
                                    deleteCourse(info._id)
                                    e.stopPropagation();
                                    e.preventDefault();
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                            </button>
                        </div>
                        </Link>

                    ))
                   
                ) : (
                    <div className="text-center text-lg text-gray-600 w-full">Your cart is empty!</div>
                )}
            </div>
            
            <div className="mt-8 flex justify-center">
                <Link to="/ViewCourses">
                    <button className="bg-orange-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300">
                        Buy more courses
                    </button>
                </Link>
            </div>

                        
                {cartItems.length > 0 && (
                    <div className="mt-8 flex justify-center">
                      
                        <button
                            className="bg-orange-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>
                       

                        
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
