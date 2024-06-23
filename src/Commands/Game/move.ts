import { Message, Command, BaseCommand } from '../../Structures';
import { Chess } from 'chess.js'; // Assuming you're using chess.js library

@Command('move', {
    description: 'Make a move in the chess game.',
    usage: 'move [fromTile] [toTile]',
    cooldown: 5,
    category: 'games'
})
export default class extends BaseCommand {
    private games: Map<string, Chess> = new Map(); // Stores active games by user ID

    public override execute = async (M: Message): Promise<void> => {
        const args = M.content.trim().split(/\s+/);
        if (args.length !== 3) {
            await M.reply(`Usage: ${this.client.config.prefix}move [fromTile] [toTile]`);
            return;
        }

        const from = args[1];
        const to = args[2];
        await this.handleMove(M, from, to);
    }

    private async handleMove(M: Message, from: string, to: string): Promise<void> {
        const userId = M.author.id;
        let game = this.games.get(userId);

        if (!game) {
            game = new Chess(); // Start a new game if one doesn't exist
            this.games.set(userId, game);
        }

        const moveResult = game.move({ from, to });

        if (moveResult) {
            await M.reply(`Move ${moveResult.san} was successful!`);

            // Check if the game has ended
            if (game.in_checkmate()) {
                await M.reply('Checkmate! The game is over.');
                this.games.delete(userId); // Remove the game from the map
            } else if (game.in_draw() || game.in_stalemate()) {
                await M.reply('The game is a draw or stalemate.');
                this.games.delete(userId); // Remove the game from the map
            }
        } else {
            await M.reply(`Invalid move from ${from} to ${to}. Please try again.`);
        }
    }
                             }
