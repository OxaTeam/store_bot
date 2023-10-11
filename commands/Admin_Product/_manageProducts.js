/*CMD
  command: /manageProducts
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin/Product
  answer: 
  keyboard: 
  aliases: 🛍 manage products
  group: Admins
CMD*/

let list = new List({ name: "Products" })
if (!list.exist) list.create()
let products = list.get()
if (products.length == 0) return sendMessage("📂 There are no products on record.")
let buttons = []
//Bot.inspect(products)
for (let i = 0; i < products.length; i++) {
  buttons.push([{
    text: `${products[i].value["title"]} (${amountFormat(products[i].value["amount"], products[i].value["currency"])})`,
    callback_data: "/productDetail " + products[i].value["id"]
  }])
}
let text = "✏️Select an Action to Manage the Product from the List Below"
sendMessage({
  text: text,
  reply_markup: { inline_keyboard: buttons }
})
