/*CMD
  command: /admin
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin
  answer: 👇Please choose an admin command👇
  keyboard: ➕Add New Product,\n🛍 Manage Products,🛒 Sales History,\n⚙️ Settings,🔔 Manage notifications,\n🎁 Sales Partner Configuration,\n📚 Help,\n⬅️ Back To Main Menu
  aliases: 👨‍💻 admin
  group: Admins
CMD*/

if (User.getProperty("message_id")) {
  Api.deleteMessage({
    message_id: User.getProperty("message_id")
  })
  User.setProperty("message_id", null)
}
