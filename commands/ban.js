const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bane um membro do servidor.')
    .addUserOption(option =>
      option
        .setName('usuario')
        .setDescription('Usuário que será banido')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('motivo')
        .setDescription('Motivo do banimento')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const usuario = interaction.options.getUser('usuario');
    const motivo = interaction.options.getString('motivo') || 'Nenhum motivo informado';

    try {
      const membro = await interaction.guild.members.fetch(usuario.id);

      await membro.ban({ reason: motivo });

      await interaction.reply({
        content: `🔨 **${usuario.tag}** foi banido.\n**Motivo:** ${motivo}`,
        ephemeral: false
      });
    } catch (error) {
      console.error(error);

      await interaction.reply({
        content: '❌ Não consegui banir esse usuário. Verifique se tenho permissão para banir membros.',
        ephemeral: true
      });
    }
  }
};
