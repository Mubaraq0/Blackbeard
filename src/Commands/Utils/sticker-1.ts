import { proto } from '@whiskeysockets/baileys'
import { Sticker, Categories, createSticker } from 'wa-sticker-formatter'
import { Command, Message, BaseCommand } from '../../Structures'
import { IArgs } from '../../Types'
// import { Sticker, createSticker } from 'wa-sticker-formatter'

@Command('img2sticker', {
  description: 'Convert image to sticker',
  category: 'utils',
  usage: 'img2sticker [image URL or upload image]',
  aliases: ['i2s'],
  exp: 20,
  cooldown: 5
})
export default class extends BaseCommand {
  public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
    const imageUrl = context || M.quoted?.content || ''
    if (!imageUrl) return void M.reply('Provide an image URL or upload an image!')

    const imageBuffer = await this.client.downloadMediaMessage(M, imageUrl)
    const sticker = new Sticker(imageBuffer, {
      pack: 'Your Sticker Pack',
      author: M.sender.username,
      type: StickerTypes.FULL,
      categories: [''],
      quality: 100,
      background: 'transparent'
    })

    return void (await M.reply(await sticker.build(), 'sticker'))
  }
}
