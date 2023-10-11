/*CMD
  command: /balance
  help: 
  need_reply: 
  auto_retry_time: 
  folder: General
  answer: 
  keyboard: 
  aliases: 💰balance
  group: 
CMD*/

Libs.OxaPayLib.apiCall({
  url: "api/prices",
  fields: {
    key: "nothing",
  },
  onSuccess: "/balanceStep2",
});
