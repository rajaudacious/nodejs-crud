const router = require("express").Router();
const productController = require('../controllers/productController');

router.post("/",productController.productCreate);
router.get("/", productController.productAll);
router.get("/:productId", productController.productDetails);
router.put("/:productId", productController.productUpdate);
router.delete("/:productId", productController.productDelete); 

module.exports = router;    
