# How to Build a Telegram Store for Digital Products

Welcome to this step-by-step guide on creating a Telegram store bot for your digital products. This README will walk you through the process of setting up your store and efficiently managing your products.

## Table of Contents

- [Create a Bots Business Account](#create-a-bots-business-account)
- [Create Bot in @BotFather](#create-bot-in-botfather)
- [Configure Your Bot](#configure-your-bot)
- [Configure Your Store](#configure-your-store)
- [Important Reminders](#important-reminders)

## Create a Bots Business Account

To get started, follow these steps to create a Bots Business account:

1. Visit [Bots.business](https://bots.business).
2. Click on the "Webapp" button.
3. Fill out the registration form with your details and provide a valid email address.

## Create Bot in @BotFather

If you need to create a new bot using @Botfather, follow these steps:

1. Open @Botfather in Telegram.
2. Start the bot.
3. Type /newbot and provide a name and username for your bot (ensure the username ends with "bot," e.g., examplebot).
4. Copy the token ID provided by @Botfather and paste it in the defined field.

## Configure Your Bot

Once you have your Bots Business account set up, it's time to configure your Telegram bot:

1. Click on the menu button in the top left corner and select "My Bots" from the menu options.
2. Click on the "NEW BOT" button.
3. Fill in the name field with your preferred bot name.
4. Generate a bot on Telegram using @Botfather, copy the generated token, and paste it into the designated "Token" field in the bot creation interface. If you're unsure how to create a bot using @Botfather, refer to the previous section.
5. In the "Git Repository" field, enter the provided link: [https://github.com/OxaTeam/store_bot].
6. Click on the "CREATE" button to finalize bot creation.
7. In the bot list, find your newly created bot and click on its name to open its dashboard.
8. From the top menu, locate and click on the 4th tab icon and select "IMPORT FROM GIT REP."
9. Click on "Import" to fetch the bot configuration from the linked Git repository.
10. Navigate to the home tab and click on "LAUNCH BOT" to activate your bot.

Congratulations! Your bot is now live and ready to use. Enjoy interacting with it and exploring its features.

## Configure Your Store

To configure your store for digital products, you'll need an OxaPay Merchant API key. If you haven't created one yet, [follow this tutorial to generate your API key](https://docs.oxapay.com/integrations/merchant-api).

1. Enter your Merchant API key.
2. The menu will appear. Click on the "Admin" menu to access the admin section.

## Important Reminders

Here are some important reminders to keep in mind:

- **Bot Updates:** After each update of your bot, remember to "IMPORT FROM GIT REP" to sync the changes.
- **Editing Commands:** If you modify any commands, be aware that after an "IMPORT FROM GIT REP," the edited commands will revert to default settings. Ensure to reconfigure them accordingly.

With these steps, your Telegram store for digital products is now set up and ready to go!
