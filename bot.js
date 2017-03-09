const builder = require('botbuilder');

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const bot = new builder.UniversalBot(connector, [
    (session, args, next) => {
        const botName = 'ConFoo Bot';
        const description = `Answer simple questions about a conference`;

        session.send(`Hi there! I'm ${botName}`);
        session.send(`In a nutshell, here's what I can do:\n\n${description}`);

        builder.Prompts.text(session, `What's your name?`);
    },
    (session, results, next) => {
        session.endConversation(`Welcome, ${results.response}`);
    }
]);

bot.dialog('help', (session) => {
    session.endDialog('I can answer questions about ConFoo.');
}).triggerAction({
    matches: /^help$/,
    onSelectAction: (session, args) => {
        session.beginDialog(args.action, args);
    }
})

module.exports = bot;