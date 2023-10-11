/*CMD
  command: /settings
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin/Settings
  answer: 
  keyboard: 
  aliases: ⚙️ settings
  group: Admins
CMD*/

let buttons = [
  [
    {
      text: "👨‍💻 Add new admins",
      callback_data: "/addAdminStep1"
    }
  ],
  [
    {
      text: "➖ Remove admin",
      callback_data: "/removeAdminList"
    }
  ],
  [
    {
      text: "🔑 Change Merchant API key",
      callback_data: "/merchantKeyMsg"
    }
  ],
  [
    {
      text: "🎁 Sales Partner Configuration",
      callback_data: "/configSalesPartner"
    }
  ]
]
sendMessage({
  text: "⚙️ What do you want to set up?",
  reply_markup: { inline_keyboard: buttons }
})
