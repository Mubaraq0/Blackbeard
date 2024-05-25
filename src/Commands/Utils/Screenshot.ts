import { Message, Command, BaseCommand } from '../../Structures'
import { IArgs } from '../../Types'
import axios from 'axios'
import { MessageType } from '@whiskeysockets/baileys'
import request from '../../lib/request'

@Command('screenshot', {
    description: 'Gives you the screenshot of the given url.',
    category: 'utils',
    usage: 'screenshot',
    aliases: ['ss', 'ssweb'],
    exp: 25,
    cooldown: 5
})
 
    
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) return void (await M.reply(`Provide the url, Baka!`))
        const chitoge = context.trim()
        return void M.reply( await request.buffer(`https://shot.screenshotapi.net/screenshot?&url=${chitoge}&full_page=true&fresh=true&output=image&file_type=png&wait_for_event=load`),
        MessageType.image,
                    undefined,
                    undefined,
                    `🌟 Here you go.\n`,
                    undefined
                ).catch((reason: any) =>
            M.reply(`✖ An error occurred. Please try again later. ${reason}`))
    }
}