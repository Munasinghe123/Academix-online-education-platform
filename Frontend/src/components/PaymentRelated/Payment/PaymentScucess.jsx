import { useEffect, useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

function PaymentScucess() {
    const { setCartItems, setTotalPrice } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    console.log("User:", user);

    useEffect(() => {
        const clearCartAfterPayment = async () => {
            try {
                
                await axios.delete(`http://localhost:7002/api/cart/clearCart/${user.id}`, {
                    withCredentials:true
                });

                setCartItems([]);
                setTotalPrice([]);
            } catch (err) {
                console.error("Error clearing cart after payment:", err);
            }
        };
        console.log("user id",user?.id);
        if (user?.id) clearCartAfterPayment();
    }, [user]);

    return (
        <div className='h-screen flex justify-center items-center'>
            <h1 className='text-2xl font-semibold text-green-600'>
                Payment Successful! Thank you for your purchase.
            </h1>
        </div>
    );
}

export default PaymentScucess;
