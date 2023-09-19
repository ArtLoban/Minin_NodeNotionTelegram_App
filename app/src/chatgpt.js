import OpenAI from 'openai';
import config from 'config'

const CHATGPT_MODEL = 'gpt-3.5-turbo'

const ROLES = {
  ASSISTANT: 'assistant',   // Отвечате за ответы самого чата
  SYSTEM: 'system',         // Системное значение, которое воспригнимает chatGPT, но которое не отображается в переписке
  USER: 'user',             // Это то что отправляем мы как клиент этого приложения
}

const openai = new OpenAI({
  apiKey: config.get('OPENAI_KEY')
});

const getMessage = (m) => `
  Напиши на основе этих тезисов последовательную эмоциональную историю: ${m}
  
  Это тезисы с описанием ключевых моментов дня.
  Необходимо в итоге получить такую историю, чтобы я запомнил этот день и смог впоследствие рассказывать ее друзьям.
  Много текста не нужно, главное чтобы были эмоции и правильная последовательность, плюс учтение контекста.
`

export async function chatGPT(message = '') {
  const messages = [
    {
      role: ROLES.SYSTEM,
      content: 'Ты опытный копирайтер, который пишет краткие эмоциональные статьи для социальный сетей.'
    },
    {
      role: ROLES.USER,
      content: getMessage(message)
    }
  ]

  try {
    const completion = await openai.chat.completions.create({
      messages,
      model: CHATGPT_MODEL,
    });

    console.log(completion.choices[0].message);

  } catch (e) {
    console.error('Error while chat completion. Message: ', e.message)
  }
}