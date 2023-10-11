/*CMD
  command: /onCreatePayment
  help: 
  need_reply: 
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (!options || !params) return

if (options.result != 100) {
  sendMessage(options.message)
  return
}

let order = User.getProperty(params)
order.trackId = options.trackId
User.setProperty({
  name: params,
  value: order,
  type: "json",
  list: "Orders"
})

viewProduct(order.productId, "pay", options.payLink)
