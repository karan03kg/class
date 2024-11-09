// const Event = require("events")

// let event = new Event();
// function functionevent(name,id){
//     console.log(name + " Function Event " + id);
// }
// event.on("callevent",functionevent);
// event.emit("callevent","karan",1);


const Order = require("./order.js")
let order = new Order()
function orderComplete(name,orderType){
    console.log(name + " Your order received, with orderType : " + orderType )
}
order.on("orderReceived",orderComplete);
order.receiveOrder("karan","COD")
order.receiveOrder("karan2","Card")
console.log(order.getAllOrders())