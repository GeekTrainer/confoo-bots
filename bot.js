const builder = require('botbuilder');

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const bot = new builder.UniversalBot(connector, [
    (session, args, next) => {
        session.send(`Hi there! I'm the ConFoo bot. What would you like to do?`);

        const card = new builder.ThumbnailCard(session);
        card.buttons(
            new builder.CardAction(session)
                .title('Find session')
                .value('Find session')
                .type('IMBack')
        );

        const message = new builder.Message(session).addAttachment(card);
        session.endConversation(message);
    },
]);

bot.dialog('find-session', [
    (session) => { 
        session.endConversation('in find-session');
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