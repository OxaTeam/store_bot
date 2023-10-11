/*CMD
  command: /inlineQuery
  help: 
  need_reply: 
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let list = new List({ name: "Products" })
if (!list.exist) list.create()
let products = list.get()
let results = []
for (let i = 0; i < products.length; i++) {
  if (products[i].value["files"].length == 0) continue
  if (
    !request.query ||
    products[i].value["title"]
      .toLowerCase()
      .includes(request.query.toLowerCase())
  ) {
    let title = `${products[i].value["title"]} (${amountFormat(products[i].value["amount"], products[i].value["currency"])})`
    let buttons = [
      [
        {
          text: `Buy now (${amountFormat(products[i].value["amount"], products[i].value["currency"])})`,
          url: `https://t.me/${bot.name}?start=Product${products[i].value["id"]}`
        }
      ]
    ]
    let content = `*${title}*\n${products[i].value["desc"]}`
    if (request.chat_type == "sender") {
      content = "/buy " + products[i].value["id"]
      buttons = []
    }
    results.push({
      type: "article",
      id: products[i].value["id"],
      hide_url: false,
      title: title,
      description: products[i].value["desc"],
      input_message_content: {
        message_text: content,
        parse_mode: "Markdown"
      },
      parse_mode: "Markdown",
      reply_markup: { inline_keyboard: buttons },
      saleCount: products[i].value["saleCount"] || 0
    })
  }
}
results.sort((a, b) => {
  return b.saleCount - a.saleCount
})
if (products.length == 0){
    results.push({
      type: "article",
      id: 0,
      hide_url: false,
      title: "📂 No Products",
      description: "There are currently no products available.",
      input_message_content: {
        message_text: "📂 No Products"
      },
    })
}
else if (results.length == 0){
    results.push({
      type: "article",
      id: 0,
      hide_url: false,
      title: "📂 No Results Found",
      description: "The searched product could not be found.",
      input_message_content: {
        message_text: "📂 No Results Found"
      },
    })
}
Api.answerInlineQuery({
  inline_query_id: request.id,
  results: results,
  cache_time: 30 // cache time in sec
})
