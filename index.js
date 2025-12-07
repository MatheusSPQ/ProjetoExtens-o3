const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect
  .create({
    session: 'sessao-mlo',
    headless: true, // true = não abre o navegador na tela
    logQR: true,
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage(async (message) => {
    
    // 1. Ignora grupos e ignora status (stories)
    if (message.isGroupMsg === false && message.from !== 'status@broadcast') {

        // --- OPÇÃO 1: ENDEREÇO ---
        if (message.body === '1') {
            // Simula que está digitando
            await client.startTyping(message.from);

            // Espera 3 segundos (3000 ms) antes de enviar
            setTimeout(async () => {
                await client.sendText(message.from, '📍 *Endereço MLO:*\nRua Exemplo, 123 - Centro, Petrópolis.\n\n⏰ *Horário:*\nSeg a Sex: 09h às 18h.');
                await client.stopTyping(message.from); // Para de digitar
            }, 3000);
        }
        
        // --- OPÇÃO 2: VALORES ---
        else if (message.body === '2') {
            await client.startTyping(message.from);

            // Espera 3 segundos
            setTimeout(async () => {
                await client.sendText(message.from, '💰 *Tabela Base de Serviços:*\n\n🖥️ Formatação: R$ 80,00\n🧹 Limpeza Completa: R$ 50,00\n📡 Configuração de Rede: A combinar\n\n_Para orçamentos específicos, aguarde o técnico._');
                await client.stopTyping(message.from);
            }, 3000);
        }

        // --- QUALQUER OUTRA COISA (MENU INICIAL) ---
        else {
            // O Menu responde um pouco mais rápido (2 segundos)
            await client.startTyping(message.from);

            setTimeout(async () => {
                const saudacao = 'Olá! Sou o assistente virtual da MLO 🤖';
                const menu = 'Como posso te ajudar hoje?\n(Digite apenas o número)\n\n1️⃣ - Endereço e Horários\n2️⃣ - Valores e Serviços\n\n_Caso tenha outra dúvida, aguarde que o Matheus já te responde!_';
                
                await client.sendText(message.from, `${saudacao}\n\n${menu}`);
                await client.stopTyping(message.from);
            }, 2000);
        }
    }
  });
}