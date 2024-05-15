import { join } from 'path'
import { BaseCommand, Command, Message } from '../../Structures'

@Command('info', {
    description: "Displays bot's info",
    usage: 'info',
    category: 'general',
    cooldown: 10,
    exp: 100
})
export default class extends BaseCommand {
    private imageUrls: string[] = [
        'https://telegra.ph/file/b4343a5fc355bacecee35.jpg',
        'https://telegra.ph/file/44cbf5ce2c39f49e49e86.jpg',
        'https://telegra.ph/file/b4a4d6e471d40814b16a9.jpg',
        'https://telegra.ph/file/eda8a0298a7532b31412e.jpg',
        'https://telegra.ph/file/bfac432d377521ab5bca0.jpg',
    ]
    // you can add more pictures if you want bro or girl
    public override execute = async ({ reply }: Message): Promise<void> => {
        const users = await this.client.DB.user.count()
        let getGroups = await this.client.groupFetchAllParticipating()
        let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1])
        let res = groups.map((v) => v.id)
        console.log(res.length)
        const { description, name, homepage } = require(join(__dirname, '..', '..', '..', 'package.json')) as {
            description: string
            homepage: string
            name: string
        }
        const randomImageUrl = this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)]
        const image = await this.client.utils.getBuffer(randomImageUrl)
        const uptime = this.client.utils.formatSeconds(process.uptime())
        const text = `*🍁 ${this.client.config.name} 🍁*\n\n📙 *Description: ${description}*\n\n🔗 *Commands:* ${this.handler.commands.size}\n🚦 *Uptime:* ${uptime}\n🎐 *Users:* ${users}\n🌃 *Mods:* ${this.client.config.mods.length}\n🔮 *Groups:* ${groups.length}`
        return void (await reply(image, 'image', undefined, undefined, text, undefined, {
            title: this.client.utils.capitalize(name),
            thumbnail: image,
            mediaType: 1,
            sourceUrl: homepage
        }))
    }
 }