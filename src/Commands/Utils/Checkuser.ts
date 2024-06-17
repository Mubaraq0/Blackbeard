import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types';
import axios from 'axios';

const options = [
    'awesomecheck',
    'greatcheck',
    'gaycheck',
    'cutecheck',
    'lesbiancheck',
    'hornycheck',
    'prettycheck',
    'lovelycheck',
    'uglycheck',
    'beautifulcheck',
    'handsomecheck',
    'charactercheck'
]

@Command('checkuser', {
    description: 'check on user.',
    aliases: ['cu', ...options],
    category: 'utils',
    usage: `checkuser @user`,
    cooldown: 2,
    exp: 30,
    dm: false
})

export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
      if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        M.mentioned = [...new Set(M.mentioned)]
        if (!M.mentioned.length) M.mentioned.push(M.sender.jid)
        if (context === 'cu') {
            const checkList = ` *Available Checks:*\n\n- ${options
                .map((check) => this.client.util.capitalize(check))
                .join('\n- ')}\n  *Usage:* ${this.client.config.prefix}(check) [tag/quote user]\nExample: ${
                this.client.config.prefix
            }cutecheck`
            return void (await M.reply(checkList))
        }
        const types = [
            'Compassionate',
            'Generous',
            'Grumpy',
            'Forgiving',
            'Obedient',
            'Good',
            'Simp',
            'Kind-Hearted',
            'patient',
            'UwU',
            'top, anyway',
            'Helpful'
        ]
        const percentage = this.client.getRandomInt(0, 101)
        return void (await M.reply({
            text: ` _*${context.toUpperCase()}*_ \n\n @${M.mentioned[0].split('@')[0]} \`\`\`is ${
                context !== 'charactercheck'
                    ? `${percentage}% ${context.split('check')[0]}`
                    : `${percentage}% ${this.client.getRandomItem(types)}`
            }\`\`\``,
            mentions: [M.mentioned[0]]
        }))
    }
}
