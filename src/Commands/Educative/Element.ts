import { BaseCommand, Command, Message } from '../../Structures';
import axios from 'axios';
import { IArgs } from '../../Types';
import pTable from 'ptable';
import npt from 'node-periodic-table';

@Command('element', {
    aliases: ['el'],
    description: 'Get the properties of an element ',
    category: 'educative',
    usage: 'element [name/number/symbol]',
    exp: 3,
    dm: true
})

 export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
       	if (!context)
			return void M.reply("Give me an element name/number/symbol, Baka!");
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const chitoge: any = context.trim();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const search = await pTable(chitoge);
		console.log(search);
		if (search === undefined) {
			return void (await M.reply(
				`*https://en.m.wikipedia.org/wiki/Periodic_table*\n\nI think this might help you.\n`
			));
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const response = await npt.getByNumber(search.number);
		let text = "";
		text += ` *Elelment: ${response.name}*\n`;
		text += ` *Atomic Number: ${response.number}*\n`;
		text += ` *Atomic Mass: ${response.atomic_mass}*\n`;
		text += ` *Symbol: ${response.symbol}*\n`;
		text += ` *Appearance: ${response.apearance}*\n`;
		text += ` *Phase: ${response.phase}*\n`;
		text += ` *Boiling Point: ${response.boil} K*\n`;
		text += ` *Melting Point: ${response.melt} K*\n`;
		text += ` *Density: ${response.density} g/mL*\n`;
		text += ` *Shells: ${response.shells.join(", ")}*\n`;
		text += ` *URL: ${response.source}*\n\n`;
		text += ` *Summary: ${response.summary}*\n`;
                text += ` *Muba is doing what he want*`;
		await M.reply(text);
	};
}
