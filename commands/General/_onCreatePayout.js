/*CMD
  command: /onCreatePayout
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
let amount = parseFloat(params.split(" ")[0])
let currency = params.split(" ")[1]
if (options.result != 100) {
  sendMessage(`Your send request failed. ${options.message}`)
  let balance = Libs.ResourcesLib.userRes(currency)
  balance.add(amount)
}
if (options.status == "Complete") {
  let withdrawn = Libs.ResourcesLib.userRes(currency + "Withdrawn")
  withdrawn.add(amount)
  let currencies = Bot.getProperty("currencies")
  sendMessage(`✅ ${currencies[currency].name} balance has been withdrawn successfully.`)
}
