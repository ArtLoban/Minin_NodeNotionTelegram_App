import { Telegraf } from 'telegraf'
import config from 'config'

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'), {
  handlerTimeout: Infinity,     // Бесконечное ожидание Бота. Чтобы он работал и не сбрасывался
})

bot.command('start', ctx => {
  ctx.reply('Добро пожаловать в бота. Отправьте тестовое сообщение с тезисами про историю.')
})

bot.launch()