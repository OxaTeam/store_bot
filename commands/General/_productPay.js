/*CMD
  command: /productPay
  help: 
  need_reply: 
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (!params) return
let input = params.split("Product")
let product = Bot.getProperty("Product" + input[1])
if (!product) return sendMessage("There isn’t the product!")

let list = new List({ name: "Orders", user_id: user.id })
if (!list.exist) list.create()
let orders = list.get()
let id = orders.length > 0 ? orders[orders.length - 1].value["id"] + 1 : 1

let order = {
  id: id,
  productId: product.id,
  partnerId: input[0] ?? null
}
User.setProperty({
  name: "ORD-" + order.id,
  value: order,
  type: "json",
  list: "Orders"
})

let options = {
  url: "merchants/request",
  fields: {
    amount: product.amount,
    currency: product.currency,
    orderId: "ORD-" + order.id,
    onCallback: "/onCallbackPayment"
  },
  onSuccess: "/onCreatePayment " + "ORD-" + order.id
}

Libs.OxaPayLib.apiCall(options)
