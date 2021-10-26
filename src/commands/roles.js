const cfg = require("../../config.json");

const Discord = require("discord.js");
const Hypixel = require('hypixel-api-reborn');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roles")
        .setDescription("Update your roles"),

    /**
     * @param {Discord.CommandInteraction} interaction
     * @param {Discord.Client} client 
     * @param {Hypixel.Client} hypixel 
     */
    async execute(interaction, client, hypixel) {
        if (interaction.user.id !== "597603275365285901") {
            interaction.reply("You can't use this command as it is still in testing");
            return;
        }
        fs.readFile(`data/${interaction.user.id}`, (err, data) => {
            if (err) {
                interaction.reply(`There was a problem with reading your data file, is your account linked?\nConsole Error: \`${err}\``);
                return;
            }

            hypixel.getPlayer(`${data}`).then(async (player) => {
                // console.log(player.guild.id);
                // if (player.guild.id === "wristspasm") {
                //     interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.guild_role_id));
                // } else {
                //     interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.guild_role_id));
                // }

                const bw = player.stats.bedwars.level/100;
                const sw = player.stats.skywars.level/5;
                const d = player.stats.duels.wins;

                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw3k0)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k9)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k8)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k7)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k6)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k5)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k4)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k3)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k2)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k1)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k0)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k9)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k8)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k7)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k6)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k5)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k4)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k3)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k2)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k1)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k0)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw900)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw800)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw700)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw600)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw500)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw400)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw300)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw200)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw100)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.bw000)).catch(console.error);

                if (bw >= 30) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw3k0)).catch(console.error);
                } else if (bw >= 29) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k9)).catch(console.error);
                } else if (bw >= 28) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k8)).catch(console.error);
                } else if (bw >= 27) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k7)).catch(console.error);
                } else if (bw >= 26) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k6)).catch(console.error);
                } else if (bw >= 25) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k5)).catch(console.error);
                } else if (bw >= 24) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k4)).catch(console.error);
                } else if (bw >= 23) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k3)).catch(console.error);
                } else if (bw >= 22) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k2)).catch(console.error);
                } else if (bw >= 21) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k1)).catch(console.error);
                } else if (bw >= 20) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw2k0)).catch(console.error);
                } else if (bw >= 19) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k9)).catch(console.error);
                } else if (bw >= 18) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k8)).catch(console.error);
                } else if (bw >= 17) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k7)).catch(console.error);
                } else if (bw >= 16) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k6)).catch(console.error);
                } else if (bw >= 15) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k5)).catch(console.error);
                } else if (bw >= 14) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k4)).catch(console.error);
                } else if (bw >= 13) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k3)).catch(console.error);
                } else if (bw >= 12) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k2)).catch(console.error);
                } else if (bw >= 11) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k1)).catch(console.error);
                } else if (bw >= 10) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw1k0)).catch(console.error);
                } else if (bw >= 9) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw900)).catch(console.error);
                } else if (bw >= 8) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw800)).catch(console.error);
                } else if (bw >= 7) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw700)).catch(console.error);
                } else if (bw >= 6) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw600)).catch(console.error);
                } else if (bw >= 5) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw500)).catch(console.error);
                } else if (bw >= 5) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw400)).catch(console.error);
                } else if (bw >= 3) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw300)).catch(console.error);
                } else if (bw >= 2) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw200)).catch(console.error);
                } else if (bw >= 1) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw100)).catch(console.error);
                } else {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.bw000)).catch(console.error);
                }

                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.sw00)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.sw05)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.sw10)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.sw15)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.sw20)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.sw25)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.sw30)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.sw35)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.sw40)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.sw45)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.sw50)).catch(console.error);

                if (sw >= 10) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.sw50)).catch(console.error);
                } else if (sw >= 9) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.sw45)).catch(console.error);
                } else if (sw >= 8) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.sw40)).catch(console.error);
                } else if (sw >= 7) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.sw35)).catch(console.error);
                } else if (sw >= 6) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.sw30)).catch(console.error);
                } else if (sw >= 5) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.sw25).catch(console.error));
                } else if (sw >= 5) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.sw20)).catch(console.error);
                } else if (sw >= 3) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.sw15)).catch(console.error);
                } else if (sw >= 2) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.sw10)).catch(console.error);
                } else if (sw >= 1) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.sw05)).catch(console.error);
                } else {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.sw00)).catch(console.error);
                }

                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.d100)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.d200)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.d500)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.d1k)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.d2k)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.d4k)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.d10k)).catch(console.error);
                await interaction.member.roles.remove(interaction.guild.roles.cache.get(cfg.stat_roles.d20k)).catch(console.error);

                if (d >= 20000) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.d20k)).catch(console.error);
                } else if (d >= 10000) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.d10k)).catch(console.error);
                } else if (d >= 4000) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.d4k)).catch(console.error);
                } else if (d >= 2000) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.d2k)).catch(console.error);
                } else if (d >= 1000) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.d1k)).catch(console.error);
                } else if (d >= 500) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.d500)).catch(console.error);
                } else if (d >= 200) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.d200)).catch(console.error);
                } else if (d >= 100) {
                    await interaction.member.roles.add(interaction.guild.roles.cache.get(cfg.stat_roles.d100)).catch(console.error);
                }

                interaction.reply("Updated roles!");
                return;
            });
        });
    }
}