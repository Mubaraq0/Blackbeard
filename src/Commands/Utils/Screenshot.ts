import { Message, Command, BaseCommand } from '../../Structures'
import { IArgs } from '../../Types'
import axios from 'axios'
// import { WAMessage } from '@whiskeysockets/baileys'
import request from '../../lib/request'

//import { BaseCommand, Command, Message } from '../../Structures'

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
    if (!url) return void M.reply('*Give me the url, Baka!*')
    const chitoge = url.trim()
    try {
      const screenshot = await request.buffer(`(link unavailable))
      return void M.reply(screenshot, 'image', undefined, undefined, `_*Here is your screenshot*_\n`)
    } catch (reason) {
      return void M.reply(`✖️ Something went wrong, please try again later ✖️ ${reason}`)
    }
  }
        }
