/*CMD
  command: /orderDetail
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
let order = User.getProperty(params)
viewProduct(order.productId, "order", params)
