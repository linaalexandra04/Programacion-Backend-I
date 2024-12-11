class ProductDTO {
    constructor(product) {
        this.id = product._id;
        this.name = product.name;
        this.price = product.price;
        this.description = product.description || 'Sin descripción';
        this.stock = product.stock;
        this.category = product.category;
    }

    toResponse() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            description: this.description,
            stock: this.stock,
            category: this.category,
        };
    }
}

export default ProductDTO;