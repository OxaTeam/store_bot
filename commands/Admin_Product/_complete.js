/*CMD
  command: /complete
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin/Product
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

let product = User.getProperty("crrProduct")
if (product?.files == null) return

let list = new List({ name: "Products" })
if (!list.exist) list.create()
let edit = false
if (product.id) {
  edit = true
} else {
  let products = list.get()
  if (products.length > 0) product.id = products[products.length - 1].value["id"] + 1
  else product.id = 1
}

Bot.setProperty({
  name: "Product" + product.id,
  value: product,
  type: "json",
  list: "Products"
})

if (User.getProperty("productRecharge")) {
  sendMessage("✅ The product has been recharched successfully.")
  User.setProperty("productRecharge", null)
}
else if (edit) sendMessage("✅ The product has been edited successfully.")
else {
  sendMessage("🎉", false)
  sendMessage("✅ The product has been added successfully.", false)
}
viewProduct(product.id, "buy")

User.setProperty("crrProduct", null)
