/*CMD
  command: /addAdminStep1
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin/Settings
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

sendMessage(
  "To add new admin provide the admin's Telegram ID\n" +
    "---------------------------------\n\n" +
    "🔍*How to find a Telegram ID*:\n" +
    "To discover the Telegram ID of a user, follow these steps:\n\n" +
    "1️⃣ Forward a message from the user to @RawDataBot.\n\n" +
    '2️⃣ Locate the Telegram ID in the "`Forward_from id`" field.'
)
Bot.run({ command: "/addAdminStep2" })
