const Event = require("events");
class order extends Event{
    orders;
    orderId;
    constructor(){
        super();  //inheritance - inheriting the properties of event
        this.orderId = 0;
        this.orders = [];
    }
    getAllOrders(){
        return this.orders;
    }
    receiveOrder(name,orderType){
        this.orderId++;
        this.orders.push({id:this.orderId,name,orderType})
        this.emit('orderReceived',name,orderType)
    }
}
module.exports = order