/*CMD
  command: /discoverProducts
  help: 
  need_reply: 
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: 🛍️ discover products
  group: 
CMD*/

let commission = Bot.getProperty("commission")
if (!commission)
  return sendMessage("⚠️ Sales partner not activated by admin!")

let list = new List({ name: "Products" })
if (!list.exist) list.create()
let products = list.get()
if (products.length == 0)
  return sendMessage("📂 There are no products on record.")

let text = `Presenting a list of products along with their corresponding commission rates. *You can easily choose and share them to start earning commissions.*`
let buttons = []
for (let i = 0; i < products.length; i++) {
  buttons.push([{
    text: `${products[i].value["commission"] || commission}% | ${products[i].value["title"]}`,
    callback_data: "/buy " + products[i].value["id"]
  }])
}
sendMessage({
  text: text,
  reply_markup: {
    inline_keyboard: buttons
  }
})
