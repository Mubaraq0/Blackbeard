import { BaseCommand, Command, Message } from '../../Structures';
import axios from 'axios';
import { IArgs } from '../../Types';

@Command('why', {
    aliases: ['why'],
    description: 'asks you a why question ',
    category: 'utils',
    usage: 'why [query]',
    exp: 10,
    dm: true
})

    export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        await axios
            .get(`https://nekos.life/api/v2/why`)
            .then((response) => {
                // console.log(response);
                const text = `📝 *Question:* ${response.data.why}`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`🔍 Error: ${err}`)
            })
    }
}
