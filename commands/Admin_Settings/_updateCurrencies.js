/*CMD
  command: /updateCurrencies
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin/Settings
  answer: 
  keyboard: 
  aliases: 
  group: Admins
CMD*/

Libs.OxaPayLib.apiCall({
  url: "api/currencies",
  onSuccess: "/onCurrencies",
});
