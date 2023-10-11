/*CMD
  command: /getProductFile
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin/Product
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

if (message == "/complete") {
  Bot.runCommand("/complete")
  return
}
let res = checkAnswer("file")
if (res == "exit") return
else if (res == "invalid") Bot.runCommand("/getProductFile")
else if (res == "next") {
  let product = User.getProperty("crrProduct")
  if (!product.files) product.files = []
  product.files.push(request.document?.file_id)
  User.setProperty("crrProduct", product, "json")
  if (product.type == "limit") {
    Bot.clearRunAfter({ label: "completeMsg" })
    Bot.run({ command: "/sendCompleteMsg", run_after: 2, label: "completeMsg" })
    Bot.run({ command: "/getProductFile" })
  } else Bot.run({ command: "/complete" })
}
