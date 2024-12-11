class CartDTO {
    constructor(cart) {
        this.id = cart._id;
        this.products = cart.products.map(product => ({
            id: product.product._id,
            name: product.product.name,
            price: product.product.price,
            quantity: product.quantity,
            total: product.product.price * product.quantity
        }));
    }
}

export default CartDTO;
