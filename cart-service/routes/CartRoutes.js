const { addToCart,getCartById,deleteItem,clearCart } = require('../controllers/CartController')
const VerifyAccessToken = require('../middleware/VerifyAccessToken')
const verifyRole = require('../middleware/RoleMiddleWare')
const express = require('express')

const router = express.Router();

router.post('/addToCart',VerifyAccessToken,verifyRole("admin","student","courseProvider"), addToCart);
router.get('/getCartById/:id',VerifyAccessToken,verifyRole("admin","student","courseProvider"),getCartById);
router.delete('/deleteItem/:id',VerifyAccessToken,verifyRole("admin","student","courseProvider"),deleteItem);
router.delete('/clearCart/:userId',VerifyAccessToken,verifyRole("admin","student","courseProvider"),clearCart);

module.exports = router;
