/*CMD
  command: /help
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin
  answer: 
  keyboard: 
  aliases: 📚 help
  group: Admins
CMD*/

sendMessage({
  text: "📢 Join the OxaPay Store Help Channel to stay informed about this bot's admin features and receive the latest updates.",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "Join Now!",
          url: "https://t.me/oxapaystorehelp"
        }
      ]
    ]
  }
})
