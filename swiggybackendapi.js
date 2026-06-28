class SwiggyBackendAPI {
    get userOrder() {
        return this._userOrder;
    }
    set userOrder(value) {
        this._userOrder = value;
    }
    createOrder(order) {
        this._userOrder = order;
        return `Order created: ${order}`;
    }
}

userOrder = new SwiggyBackendAPI();
console.log(userOrder.createOrder("Pizza Margherita"));


userOrder.userOrder = "Burger";
console.log(userOrder.userOrder);

class userOrder {
    constructor(order) {
        this._order = order;
    }
    get order() {
        return this._order;
    }
    set order(value) {
        this._order = value;
    }
    createOrder() {
        return `Order created: ${this._order}`;
    }
}

const myOrder = new userOrder("Pasta Carbonara");
console.log(myOrder.createOrder());

user_fetch = new userOrder("Sushi");
console.log(user_fetch.order);
user_fetch.order = "Tacos";
console.log(user_fetch.order);

userPayment = new userOrder("Credit Card");
console.log(userPayment.order);
userPayment.order = "PayPal";
console.log(userPayment.order);