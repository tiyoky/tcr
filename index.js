const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS, // Intention pour recevoir des informations sur les serveurs
        Discord.Intents.FLAGS.GUILD_MESSAGES // Intention pour recevoir des messages dans les serveurs
    ]
});
const prefix = '+';

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'gent') {
        // Vérifiez si l'utilisateur a spécifié le nombre de tokens
        if (!args[0]) {
            message.reply('Veuillez spécifier un nombre de tokens.');
            return;
        }

        const numTokens = parseInt(args[0]);

        // Vérifiez si le nombre spécifié est valide
        if (isNaN(numTokens) || numTokens <= 0) {
            message.reply('Veuillez spécifier un nombre valide de tokens.');
            return;
        }

        // Générer les tokens aléatoires non valides
        for (let i = 0; i < numTokens; i++) {
            const token = generateToken();
            const tokenMessage = `Token ${i + 1}: ${token}`;
            message.channel.send(tokenMessage);
        }
    }
});

// Fonction pour générer un token aléatoire non valide
function generateToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tokenLength = 59; // Longueur des tokens Discord
    let token = '';

    for (let i = 0; i < tokenLength; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return token;
}

client.login('process.env.TOKEN'); // Remplacez YOUR_BOT_TOKEN par le token de votre bot Discord
