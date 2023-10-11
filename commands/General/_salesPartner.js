/*CMD
  command: /salesPartner
  help: 
  need_reply: 
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: 🎁 sales partner
  group: 
CMD*/

let text = `🎁 *What is a Sales Partner*?

A Sales Partner is someone who can earn commissions by sharing a product through their channel, bot, or with friends. When someone they refer buys the product, the Sales Partner receives a commission, which is added to their balance and can be withdrawn at any time.

🤔 *How to use*?
Simply search for the product you'd like to share or browse the list below to discover the associated commission rates. Share the product with others, and when they make a purchase, you'll start earning commissions.`
sendMessage({
  text: text,
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🛍️ Discover Products",
          callback_data: "/discoverProducts"
        }
      ]
    ]
  }
})
