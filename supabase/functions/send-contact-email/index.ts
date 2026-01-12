import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  servico: string;
  formData: Record<string, any>;
}

const formatLabel = (key: string): string => {
  const labels: Record<string, string> = {
    nome: "Nome",
    email: "E-mail",
    telefone: "Telefone",
    empresa: "Empresa",
    cargo: "Cargo",
    orcamento: "Orçamento",
    plataformas: "Plataformas",
    objetivos: "Objetivos",
    publicoAlvo: "Público-Alvo",
    tipoProjeto: "Tipo de Projeto",
    prazo: "Prazo",
    funcionalidades: "Funcionalidades",
    referencias: "Referências",
    mensagem: "Mensagem",
    tipoAgente: "Tipo de Agente",
    canais: "Canais de Integração",
    volumeAtendimento: "Volume de Atendimento",
    objetivosAgente: "Objetivos do Agente",
    sistemasIntegrar: "Sistemas a Integrar",
  };
  return labels[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
};

const formatDate = (): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo'
  };
  return now.toLocaleDateString('pt-BR', options);
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { servico, formData }: ContactEmailRequest = await req.json();

    // Build data rows for the email
    let dataRows = '';
    for (const [key, value] of Object.entries(formData)) {
      const label = formatLabel(key);
      const displayValue = Array.isArray(value) ? value.join(', ') : value;
      dataRows += `
        <tr>
          <td style="padding:12px 15px; border-bottom:1px solid #e0e0e0; color:#2d3d33; font-weight:600; width:35%; vertical-align:top;">
            ${label}
          </td>
          <td style="padding:12px 15px; border-bottom:1px solid #e0e0e0; color:#555;">
            ${displayValue}
          </td>
        </tr>
      `;
    }

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#2d3d33; font-family:Arial,Helvetica,sans-serif;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#2d3d33;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.15);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2d3d33 0%, #3a4d42 100%); padding:35px 30px; text-align:center;">
              <h1 style="color:#c9a86c; margin:0; font-size:32px; font-weight:700; letter-spacing:2px; text-transform:uppercase;">RAMA DIGITAL</h1>
              <p style="color:#d4c9b0; margin:12px 0 0 0; font-size:14px; letter-spacing:1px;">Marketing Digital & Tecnologia</p>
            </td>
          </tr>
          
          <!-- Service Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #c9a86c 0%, #b8956a 100%); padding:18px 30px; text-align:center;">
              <h2 style="color:#2d3d33; margin:0; font-size:18px; font-weight:600; text-transform:uppercase; letter-spacing:1px;">
                ✨ Nova Solicitação: ${servico}
              </h2>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding:35px 30px;">
              <p style="color:#666; margin:0 0 25px 0; font-size:15px; line-height:1.6;">
                Uma nova solicitação foi recebida através do site da Rama Digital. Confira os detalhes abaixo:
              </p>
              
              <!-- Data Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0; border-radius:8px; overflow:hidden;">
                <tr>
                  <td colspan="2" style="background-color:#f8f6f3; padding:12px 15px; border-bottom:2px solid #c9a86c;">
                    <strong style="color:#2d3d33; font-size:14px; text-transform:uppercase; letter-spacing:0.5px;">📋 Dados do Formulário</strong>
                  </td>
                </tr>
                ${dataRows}
              </table>
              
              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:30px;">
                <tr>
                  <td align="center">
                    <p style="color:#888; font-size:13px; margin:0;">
                      Responda o mais breve possível para garantir uma boa experiência ao cliente.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color:#f8f6f3; padding:25px 30px; text-align:center; border-top:1px solid #e0e0e0;">
              <p style="color:#2d3d33; margin:0 0 8px 0; font-size:13px; font-weight:600;">
                📅 Data da solicitação: ${formatDate()}
              </p>
              <p style="color:#999; margin:0; font-size:11px;">
                Este é um e-mail automático enviado pelo sistema Rama Digital.<br>
                Por favor, não responda diretamente a este e-mail.
              </p>
            </td>
          </tr>
          
          <!-- Brand Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #2d3d33 0%, #3a4d42 100%); padding:20px 30px; text-align:center;">
              <p style="color:#c9a86c; margin:0; font-size:12px; letter-spacing:1px;">
                © 2025 Rama Digital • Todos os direitos reservados
              </p>
              <p style="color:#d4c9b0; margin:8px 0 0 0; font-size:11px;">
                🌐 ramadigital.marketing
              </p>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Rama Digital <noreply@ramadigital.marketing>",
      to: ["contato@ramadigital.marketing", "kaioapchagas@gmail.com", "michelmkt90@gmail.com"],
      subject: `✨ Nova solicitação: ${servico}`,
      html: emailContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
