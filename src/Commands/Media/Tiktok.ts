import { BaseCommand, Command, Message } from '../../Structures';
import axios from 'axios';
import { IArgs } from '../../Types'
//import Tiktok from "@tobyg74/tiktok-api-dl";
//import { isURL } from "../../libs";

@Command('tiktok', {
    description: 'Download tiktok videos without watermark',
    cooldown: 15,
    exp: 3,
    category: 'media',
    aliases: ['ttdl', 'tt'],
    usage: 'tiktok [url]'
})

  export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
           if (!isURL(query))
            return context.sendText(from, "Please input a valid url!", message);
        Tiktok.Downloader(query, {
            version: "v1",
        })
            .then(async (res) => {
                if (res.status === "error") {
                    context.log("error", command.name, res.message);
                    return context.sendText(from, res.message, message);
                }
                if (res.result.type === "image")
                    return context.sendText(
                        from,
                        `The link / URL you entered was detected by Tiktok Image / Slide. To download it, you can use tiktokimage`,
                        'message'
                    );
                if (res.result.type === "video") {
                    let str =
                        `* TIKTOK VIDEO *\n\n` +
                        `• ID: ${res.result.id}\n` +
                        `• Create Time: ${res.result.createTime}\n` +
                        `• Description: ${res.result.description}\n\n` +
                        `* AUTHOR *\n\n` +
                        `• UID: ${res.result.author.uid}\n` +
                        `• Username: ${res.result.author.username}\n` +
                        `• Nickname: ${res.result.author.nickname}\n` +
                        `• Bio: ${res.result.author.signature}\n` +
                        `• Region: ${res.result.author.region}\n\n` +
                        `* STATISTICS *\n\n` +
                        `• Play: ${res.result.statistics.playCount}\n` +
                        `• Downloads: ${res.result.statistics.downloadCount}\n` +
                        `• Share: ${res.result.statistics.shareCount}\n` +
                        `• WhatsApp Share: ${res.result.statistics.whatsappShareCount}\n` +
                        `• Comment: ${res.result.statistics.commentCount}\n` +
                        `• Like: ${res.result.statistics.diggCount}\n` +
                        `• Favorite: ${res.result.statistics.collectCount}\n` +
                        `• Reupload: ${res.result.statistics.forwardCount}\n` +
                        `• Lose Comment: ${res.result.statistics.loseCommentCount}\n`;
                    await context.sendVideo(
                        from,
                        res.result.video.playAddr[0],
                        false,
                        str,
                        message
                    );
                }
            })
            .catch((e) => {
                context.log("error", command.name, e);
                context.sendText(
                    from,
                    "There is an error. Please report it to the bot creator immediately!\nMessage : " +
                        e,
                    message
                );
            });
    };
};
