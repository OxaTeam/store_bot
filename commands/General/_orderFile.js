/*CMD
  command: /orderFile
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
sendMessage({ document: order.file_id }, false)

