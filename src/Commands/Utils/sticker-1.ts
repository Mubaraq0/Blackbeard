import { Command, Message } from '../../Structures'
import { Sticker, createSticker } from 'wa-sticker-formatter'

export default class Img2StickerCommand extends Command {
  name = 'img2sticker'
  description = 'Convert image to sticker'
  category = 'utils'
  usage = 'img2sticker [image URL or upload image]'
  aliases = ['i2s']
  exp = 20
  cooldown = 5

  async execute(message: Message, args: string[]) {
    const imageUrl = args[0] || message.quoted?.content || ''
    if (!imageUrl) return message.reply('Provide an image URL or upload an image!')

    const imageBuffer = await message.client.downloadMediaMessage(message, imageUrl)
    const sticker = new Sticker(imageBuffer, {
      pack: 'Blackbeard Stickers',
      author: message.sender.username,
      type: StickerTypes.FULL,
      categories: [''],
      quality: 100,
      background: 'transparent'
    })

    return message.reply(await sticker.build(), 'sticker')
  }
}
