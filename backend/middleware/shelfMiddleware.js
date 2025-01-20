import Product from "../models/product.js";

async function updateShelfProporties(next) {
    if (this.isModified("products")) {
        const products = await Product.find({ _id: { $in: this.products } });
        this.isFragile = products.some(p => p.fragile);
        this.isExpress = products.some(p => p.expressDispatch);
    }
    next();
}

export default updateShelfProporties;