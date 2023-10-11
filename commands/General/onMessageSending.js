/*CMD
  command: onMessageSending
  help: 
  need_reply: 
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if (options.result.caption) {
  User.setProperty("media_message_id", options.result.message_id)
  if (chat?.chatid && User.getProperty("message_id")) {
    Api.deleteMessage({
      chat_id: chat.chatid,
      message_id: User.getProperty("message_id")
    })
    User.setProperty("message_id", null)
  }
} else User.setProperty("message_id", options.result.message_id)
