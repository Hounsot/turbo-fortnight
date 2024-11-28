const { Telegraf } = require("telegraf");

// Your bot token from BotFather
const BOT_TOKEN = "YOUR_NEW_BOT_TOKEN";

// URL of your mini app (must be HTTPS)
const WEB_APP_URL = "https://hounsot.github.io/DeepFaceMiniApp/";

// Create a new Telegraf instance
const bot = new Telegraf(BOT_TOKEN);

// Handle the /start command first
bot.start(async (ctx) => {
  try {
    await ctx.reply(
      `Ого, ты уже здесь? Добро пожаловать!

Круто видеть тебя в нашем дизайн-комьюнити. Мы готовим запуск ADC веб-платформы и приглашаем тебя на закрытое бета-тестирование. Заполняй форму — вместе с доступом ты получишь кучу бонусов на старте. Жми на ссылку, чтобы заклеймить свой аккаунт и попасть в число первых юзеров.`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `Открыть ADC Hub`,
                web_app: {
                  url: WEB_APP_URL,
                },
              },
            ],
          ],
        },
      }
    );
  } catch (error) {
    console.error("Error sending message in /start handler:", error);
  }
});

// Handle any other messages that are not /start
bot.on("message", async (ctx) => {
  if (ctx.message.text !== "/start") {
    try {
      await ctx.reply("Пожалуйста, напишите /start чтобы начать.");
    } catch (error) {
      console.error("Error sending message in message handler:", error);
    }
  }
});

// Launch the bot with error handling
bot.launch()
  .then(() => {
    console.log("Bot started successfully.");
  })
  .catch((error) => {
    console.error("Failed to start bot:", error);
  });

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
