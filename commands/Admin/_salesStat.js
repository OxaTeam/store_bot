/*CMD
  command: /salesStat
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

if (!params) return

let list = new List({ name: "Sales" })
let sales = list.get()

let productlist = new List({ name: "Products" })
let products = productlist.get()

let text = `📊 Sales History for ${params == "7d" ? "the Last 7 Days" : (params == "30d" ? "the Last 30 Days" : "All")}\n`
let days = params == "7d" ? 7 : (params == "30d" ? 30 : 1000000)
for (let i = 0; i < products.length; i++) {
  let count = 0, price = 0, commission = 0
  for (let j = 0; j < sales.length; j++) {
    if ((Date.now() - new Date("2023-09-20T23:12:48.749Z").getTime()) > days * 24 * 60 * 60 * 1000) continue
    if (sales[j].value["productId"] == products[i].value["id"]) {
      count++
      price += parseFloat(sales[j].value["price"] || 0)
      commission += parseFloat(sales[j].value["commission"] || 0)
    }
  }
  text += `\n🛍️ ${products[i].value["title"]}
🔢 ${count} Sales
💰 Earn $${numberWithCommas(price)}
🎁 Commission Paid $${numberWithCommas(commission)}`
  if (i < products.length - 1) text += `\n———————————————-`
}

sendMessage(text)
