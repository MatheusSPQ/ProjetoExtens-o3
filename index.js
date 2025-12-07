const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect
  .create({
    session: 'sessao-mlo',
    headless: true,
    logQR: true,
    puppeteerOptions: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', 
            '--disable-gpu'
        ]
    }
  })
  .then((client) => start(client))
  .catch((error) => {
    console.log(error);
  });

function start(client) {
  client.onMessage((message) => {
    
    // Ignora grupos
    if (message.isGroupMsg === false) {

        // LÓGICA DO BOT
        if (message.body === '1') {
            client.sendText(message.from, '📍 *Endereço:* Rua Exemplo, 123 - Centro, Petrópolis.\n⏰ *Horário:* Seg a Sex das 09h às 18h.');
        }
        
        else if (message.body === '2') {
            client.sendText(message.from, '💰 *Valores Base:*\n- Formatação: R$ 80,00\n- Limpeza: R$ 50,00\nPara outros serviços, aguarde o atendente.');
        }

        else {
            client.sendText(message.from, 'Olá! Sou o assistente virtual da MLO 🤖\n\nComo posso ajudar? Digite apenas o número:\n\n1️⃣ - Endereço e Horários\n2️⃣ - Valores de Serviços\n\n_Para falar com humano, aguarde um momento._');
        }
    }
  });
}