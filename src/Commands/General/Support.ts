import { BaseCommand, Command, Message } from '../../Structures';

interface CustomMessageContent {
    text: string;
    footer: string;
    headerType?: number; 
}

@Command('support', {
    description: 'gives the group links of support',
    usage: 'support',
    category: 'general',
    exp: 10,
    cooldown: 20
})
export default class command extends BaseCommand {
    override execute = async ({ from, sender, message }: Message): Promise<void> => {
        const supportText = `*━━━❰ Support group❱━━━*\n\n... [Your add your group links] ...\nᚖ here ᚖ`;

        const footerText = '© Blackbeard🍻 Inc 2024';

        const messageContent: CustomMessageContent = {
            text: supportText,
            footer: footerText,
            headerType: 1
        };

        return void (await this.client.sendMessage(from, messageContent, {
            quoted: message
        }));
    }
 }