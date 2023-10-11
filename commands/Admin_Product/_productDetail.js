/*CMD
  command: /productDetail
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin/Product
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

if (!params) return

viewProduct(params, "admin")
