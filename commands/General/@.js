/*CMD
  command: @
  help: 
  need_reply: 
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (chat?.chatid && User.getProperty("media_message_id")) {
  Api.deleteMessage({
    chat_id: chat.chatid,
    message_id: User.getProperty("media_message_id")
  })
  User.setProperty("media_message_id", null)
}
if (request?.chat?.id && request.text != "/start" && User.getProperty("message_id2") != request.message_id) {
  Api.deleteMessage({
    chat_id: request.chat.id,
    message_id: request.message_id
  })
  User.setProperty("message_id2", request.message_id)
}

function checkAnswer(type = "text", skip = true) {
  if (skip && message == "/skip") return "next"
  if (type == "text" && !message) {
    sendMessage({ text: "⚠️ Please just send me text!", on_result: "onMessageSending" })
    return "invalid"
  } else if (type == "number" && (!message || isNaN(message))) {
    sendMessage({ text: "⚠️ Please just send me number!", on_result: "onMessageSending" })
    return "invalid"
  } else if (type == "price") {
    if (!message ||
      isNaN(message.replace("$", "").replace("USD", "").split(" ")[0]) ||
      (message.replace(/(USD|usd)$|\$|\d|\s/g, "").toUpperCase() != "" && !Bot.getProperty("allowedCoins").includes(message.replace(/(USD|usd)$|\$|\d|\s/g, "").toUpperCase()))) {
      sendMessage({ text: `⚠️ Please just send me a valid price.\n\nFor example: "10 USD"!`, on_result: "onMessageSending" })
      return "invalid"
    }
  } else if (type == "apiKey" && message.toLowerCase() != "sandbox") {
    const apiKeyPattern = /^[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}-[A-Z0-9]{6}$/
    if (!apiKeyPattern.test(message)) {
      sendMessage({ text: "⚠️ The API key is invalid. Try again!", on_result: "onMessageSending" })
      return "invalid"
    }
  } else if (type == "OXAAddress") {
    const addressPattern = /^OXA[A-Za-z0-9]{23}$/
    if (!addressPattern.test(message)) {
      sendMessage({ text: "⚠️ The address is invalid. Try again!", on_result: "onMessageSending" })
      return "invalid"
    }
  } else if (type == "image" && request.photo.length == 0) {
    sendMessage({ text: "⚠️ Please just send me a valid image!", on_result: "onMessageSending" })
    return "invalid"
  } else if (type == "file" && !request.document) {
    sendMessage({ text: "⚠️ Please only attach the product file. This file will be sent to users when they purchase the product.", on_result: "onMessageSending" })
    return "invalid"
  } else if (
    type == "image|video|gif" &&
    request.photo.length == 0 &&
    !request.video &&
    !request.animation
  ) {
    sendMessage({ text: "⚠️ Please send a valid presentation file, image, video, or GIF for your product!", on_result: "onMessageSending" })
    return "invalid"
  }
  return "next"
}

function numberWithCommas(number, precision = 8) {
  return (Math.floor(number * Math.pow(10, precision)) / Math.pow(10, precision))
    ?.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

function amountFormat(amount, currency) {
  if (!currency || currency == "USD") return `$${amount}`
  else return `${numberWithCommas(amount)} ${currency}`
}

function viewProduct(productId, type = "buy", param = "") {
  let product = Bot.getProperty("Product" + productId)
  if (!product) return sendMessage({ text: "📂 There are no products on record.", on_result: "onMessageSending" })

  let text = `*${product.title} (${amountFormat(product.amount, product.currency)})*\n\n${product.desc}`
  let buttons = [[{ text: `🛒 Buy Now (${amountFormat(product.amount, product.currency)})`, url: `https://t.me/${bot.name}?start=${user.telegramid}Product${product.id}` }]]
  if (type == "pay") {
    if (product.files.length == 0) return sendMessage({ text: "The product’s balance has been depleted.", on_result: "onMessageSending" })
    buttons = [[{ text: `💳 Pay Now (${amountFormat(product.amount, product.currency)})`, web_app: { url: param } }]]
  }
  else if (type == "order"){
    buttons = [[{ text: "📎 File", callback_data: "/orderFile " + param }]]
  }
  else if (type == "admin") {
    text += `\n\n*Sale Count*: ${product.saleCount || 0}\n*Inventory*: ${product.type == "unlimit" ? "Unlimit" : product.files.length
      }`
    buttons =
      [
        [{
          text: "✏️ Edit Product",
          callback_data: "/productEdit " + product.id
        }],
        [{
          text: "➕ Recharge Product",
          callback_data: "/productRecharge " + product.id
        }],
        [{
          text: "🗑 Delete Product",
          callback_data: "/productDelete " + product.id
        }],
        [{
          text: "⬅️ Back",
          callback_data: "/manageProducts"
        }]
      ]
    if (product.type == "unlimit") {
      buttons.splice(1, 1)
    }
  }
  let message = { reply_markup: { inline_keyboard: buttons } }
  if (product.image) {
    message.caption = text
    if (product.imageType == "video") message.video = product.image
    else if (product.imageType == "gif") message.animation = product.image
    else message.photo = product.image
  } 
  else message.text = text

  sendMessage(message, type != "buy")
}

function sendMessage(message, editable = true) {
  if (typeof message == "string") message = { text: message }
  let message_id = User.getProperty("message_id")
  if (editable) message.on_result = "onMessageSending"
  else User.setProperty("message_id", null)
  message.parse_mode = "Markdown"

  if (message.photo) Api.sendPhoto(message)
  else if (message.video) Api.sendVideo(message)
  else if (message.animation) Api.sendAnimation(message)
  else if (message.document) Api.sendDocument(message)
  else {
    if (message_id) {
      User.setProperty("message_id", null)
      message.message_id = message_id
      Api.editMessageText(message)
    } else Api.sendMessage(message)
  }
}
