import OpenAI from "openai";

export default class Assistant {
    private openai: OpenAI;
    private model: string;
    private maxTokens: number;

    constructor(
        model: string, 
        maxTokens: number = 300,
        ) {
            
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,      
        });
        this.model = model || "gpt-3.5-turbo-0125";
        this.maxTokens = maxTokens;
    }

    chatWithStream(message: string, targetUser: string) {
        console.log("message", message);

        if(message.trim() === "") return;

        return this.openai.chat.completions.create({
            model: this.model,
            max_tokens: this.maxTokens,
            messages: [
              {role: "system", content: `Você é um assistante de escrita de mensagens, 
              que pode ajudar a escrever respostas para mensagens de chat, elas devem ser naturais e 
              NÃO devem conter placeholders como "[Seu Nome]". 
              Responda como se fosse o usuario que está enviando a mensagem, o nome do usuario de destino é ${targetUser}.
              Responda apenas o que foi pedido, sem usar aspas ao redor da resposta. 
              `},
              {role: "user", content: message}
            ],
            stream: true,
        })
    }
}

