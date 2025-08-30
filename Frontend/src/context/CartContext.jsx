import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useCallback } from "react";

export const CartContext = createContext();

const CartProvider = ({ children, userId }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice,setTotalPrice] = useState([]);

    const{user}=useContext(AuthContext)

    const navigate=useNavigate();

    const fetchCartItems = async (userId) => {
        try {
            if (!userId) return;
           
            const response = await axios.get(`http://localhost:7002/api/cart/getCartById/${userId}`, {
               withCredentials: true, 
            });
            console.log("cart cartItems",response.data.cartItems);

            setCartItems(response.data.cartItems);
            
            setTotalPrice(response.data.cartItems.map(item => item?.courseId?.price || 0)); 

            
            
        } catch (err) {
            console.error("Error fetching cart items:", err);
        }
    };

    useEffect(()=>{
        if(cartItems.length===0){
            setTotalPrice([])
        }
    },[cartItems])
    

  
    useEffect(() => {
        if (user?.id) {
            console.log("length of cart items in Context",cartItems.length)
            console.log("prices",totalPrice)
            fetchCartItems(user.id);
        }else if(!user){
            setCartItems([])
        }
    }, [user]); 
     
    
    const addToCart = async (courseId) => {
        if (!user) {
            navigate("/login", { state: { from: "/cart" } });
            return;
        }
        console.log("cousreId from context",courseId);
        try {
            
            const response = await axios.post(
                `http://localhost:7002/api/cart/addToCart`,
                { userId: user.id, courseId, quantity: 1 },
                {withCredentials: true,  }
            );
            fetchCartItems(user.id);
            if(response.status===200){
                navigate("/cart")
            }

        } catch (error) {
            console.error("Error adding to cart:", error.response?.data || error.message);
            alert(error.response.data.message);
        }
    };

    const deleteCourse = async (courseId) => {
        try {
            await axios.delete(`http://localhost:7002/api/cart/deleteItem/${courseId}`, {
               withCredentials: true, 
            });
    
           
            setCartItems(prevCartItems => prevCartItems.filter(item => item._id !== courseId));

            fetchCartItems(user.id)
    
        } catch (err) {
            console.error("Error deleting cart item", err);
        }
    };
    
    return (
        <CartContext.Provider value={{ setCartItems,cartItems, totalPrice, fetchCartItems, addToCart,deleteCourse }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
