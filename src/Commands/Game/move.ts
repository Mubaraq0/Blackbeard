import { BaseCommand, Command, Message } from '../../Structures'

@Command('move', {
    description: 'Make a move in a chess game',
    aliases: ['m'],
    usage: 'move e2e4',
    exp: 10,
    cooldown: 15,
    category: 'games'
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        const game = this.handler.chess.getGame(M.from)
        if (!game) return void M.reply(`There's no chess game ongoing in this group.`)

        const move = M.content.trim().split(' ')[1]
        if (!move) return void M.reply(`Provide a valid move in algebraic notation (e.g., e2e4).`)

        const moveResult = game.move(move)
        if (!moveResult) return void M.reply(`Invalid move. Please try again.`)

        this.handler.chess.updateGame(M.from, game)

        if (game.in_checkmate()) {
            this.handler.chess.endGame(M.from)
            return void M.reply(`Checkmate! ${moveResult.color === 'w' ? 'White' : 'Black'} wins the game.`)
        }

        if (game.in_draw()) {
            this.handler.chess.endGame(M.from)
            return void M.reply(`The game is a draw.`)
        }

        return void M.reply(`Move accepted: ${move}. It's now ${game.turn() === 'w' ? 'White' : 'Black'}'s turn.`)
    }
          }
