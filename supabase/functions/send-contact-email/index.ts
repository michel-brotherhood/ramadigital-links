import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { servico, formData }: ContactEmailRequest = await req.json();

    let emailContent = `<h1>Nova solicitação - ${servico}</h1>`;
    
    // Build email content from form data
    emailContent += '<div style="font-family: Arial, sans-serif; line-height: 1.6;">';
    for (const [key, value] of Object.entries(formData)) {
      const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
      if (Array.isArray(value)) {
        emailContent += `<p><strong>${label}:</strong> ${value.join(', ')}</p>`;
      } else {
        emailContent += `<p><strong>${label}:</strong> ${value}</p>`;
      }
    }
    emailContent += '</div>';

    const emailResponse = await resend.emails.send({
      from: "Rama Digital <onboarding@resend.dev>",
      to: ["michel@idlab.art.br"],
      subject: `Nova solicitação: ${servico}`,
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
