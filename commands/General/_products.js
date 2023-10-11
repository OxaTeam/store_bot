/*CMD
  command: /products
  help: 
  need_reply: 
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: 🛍 products
  group: 
CMD*/

sendMessage({
  text:
    '🛍If you want to explore or search for products, click on "Products List"',
  reply_markup: {
    inline_keyboard: [
      [{ text: "Products List", switch_inline_query_current_chat: "" }]
    ]
  }
})
