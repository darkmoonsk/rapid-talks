import Assistant from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { message, targetUser } = await req.json();

    console.log("message api", message);
    console.log("targetUser", targetUser);

    const assistant = new Assistant("gpt-3.5-turbo-0125",  200);
    const stream = await assistant.chatWithStream(message, targetUser);

    let responseText = "";
    if(stream) {
      for await (const chunk of stream) {
        if(chunk.choices[0]?.delta?.content) {
          responseText += chunk.choices[0]?.delta?.content;
        }
      }
    }

    // Enviar os dados processados para o cliente
    return new Response(responseText, { status: 200 });
  } catch (error) {
    // Tratar erro
    console.error(error);
    return new Response("An error occurred while processing the message for the assistant", { status: 500 });
  }
}
