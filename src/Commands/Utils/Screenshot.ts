import { BaseCommand, Command, Message } from '../../Structures'
import request from '../../lib/request'

@Command('screenshot', {
  description: 'Takes a screenshot of a webpage',
  exp: 35,
  category: 'utils',
  aliases: ['ss'],
  usage: 'screenshot [url]',
  cooldown: 25
})
export default class command extends BaseCommand {
  override execute = async (M: Message): Promise<void> => {
    const url = M.args[0]
    if (!url) return M.reply(`Give me the url, Baka!`)
    const chitoge = url.trim()
    try {
      const screenshot = await request.buffer(`(link unavailable))
      M.reply(screenshot, 'image', undefined, undefined, `_*Here is your screenshot*_\n`)
    } catch (reason) {
      M.reply(`Something went wrong, please try again later ${reason}`)
    }
  }
}
