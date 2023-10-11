/*CMD
  command: /productImage
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin/Product
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

let res = checkAnswer("image|video|gif", true)
if (res == "exit") return
else if (res == "invalid") Bot.runCommand("/productImage")
else if (res == "next") {
  let product = User.getProperty("crrProduct")
  if (message != "/skip") {
    let file_id = ""
    let file_type = ""
    if (request.photo.length > 0) {
      file_id = request.photo[0].file_id
      file_type = "photo"
    } else if (request.video) {
      file_id = request.video.file_id
      file_type = "video"
    } else if (request.animation) {
      file_id = request.animation.file_id
      file_type = "gif"
    }
    product.image = file_id
    product.imageType = file_type
    User.setProperty("crrProduct", product, "json")
  }
  let text = "📝*Product Description*: Enter a detailed description to explain your product."
  if (product.id > 0)
    text = "📝*Product Description*: Enter a new detailed description to explain your product. If you don't wish to edit the description, You can /skip this step."
  sendMessage(text)
  Bot.runCommand("/productDesc")
}
