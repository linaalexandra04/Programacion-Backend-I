class OrderDTO {
    constructor(order) {
        this.id = order._id || order.id;
        this.code = order.code;
        this.purchase_datetime = order.purchase_datetime;
        this.amount = order.amount;
        this.purchaser = order.purchaser;
    }

    toResponse() {
        return {
            id: this.id,
            code: this.code,
            purchase_datetime: this.purchase_datetime,
            amount: this.amount,
            purchaser: this.purchaser,
        };
    }
}

export default OrderDTO;