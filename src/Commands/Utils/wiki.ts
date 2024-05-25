import { Message, Command, BaseCommand } from '../../Structures';
import { IArgs } from '../../Types';
import axios from 'axios';
import wikiScraper, { IWiki } from "../../lib/wikiScraper";

@Command('wikipedia', {
    description: 'Will fetch the result of the given query from wikipedia',
    category: 'utils',
    usage: '${this.client.config.prefix}wikipedia [query]',
    aliases: ['wiki'],
    exp: 25,
    cooldown: 2
})

export default class ModsCommand extends BaseCommand {
public override execute = async (M: Message, { joined }: IArgs): Promise<void> => {
    if (!joined) return void M.reply("Provide a query, Baka!");
		const result = await wikiScraper(joined.toLowerCase().trim());
		if ((result as { error: string }).error)
			return void (await M.reply("Invalid wikipedia page, Baka!"));
		const wiki = result as IWiki;
		let text = "";
		text += `* Title: ${wiki.title}*\n\n`;
		text += `* Description: ${wiki.description}*\n\n`;
		text += `* URL: ${wiki.content_urls.desktop.page}*\n\n`;
		text += `* Summary:* ${wiki.extract}`;
		await M.reply(text);
	};
}