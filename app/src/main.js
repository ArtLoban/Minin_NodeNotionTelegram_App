import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'    // Для обработки текста
import config from 'config'
import { chatGPT } from './chatgpt.js'

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'), {
  handlerTimeout: Infinity,     // Бесконечное ожидание Бота. Чтобы он работал и не сбрасывался
})

bot.command('start', ctx => {
  ctx.reply('Добро пожаловать в бота. Отправьте тестовое сообщение с тезисами про историю. Art')
})

// Слушать какое-то сообщение, в текстовом формате. Т.е. на что бот будет реагировать
// Только текст. Не будет реагировать на файл, голосовое, др
bot.on(message('text'), async ctx => {
  await chatGPT(ctx.message.text)
  ctx.reply('Test Ok')
})

bot.launch()
