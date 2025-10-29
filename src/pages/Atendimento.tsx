import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ramaLogo from "@/assets/rama-logo.png";
import ServiceSelection from "@/components/atendimento/ServiceSelection";
import FormTrafegoPago from "@/components/atendimento/FormTrafegoPago";
import FormSitesLanding from "@/components/atendimento/FormSitesLanding";
import FormAgentesIA from "@/components/atendimento/FormAgentesIA";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Atendimento = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const whatsappNumber = "5511982553815";

  const handleStart = () => {
    if (accepted) {
      setStep(1);
    }
  };

  const handleSelectService = (service: string) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleBackToServices = () => {
    setSelectedService(null);
    setStep(1);
  };

  const handleSubmit = async (formData: any) => {
    try {
      // Enviar email
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          servico: selectedService,
          formData,
        },
      });

      if (error) throw error;

      toast({
        title: "Solicitação enviada!",
        description: "Entraremos em contato em breve.",
      });

      // Preparar mensagem WhatsApp
      let whatsappMessage = `Olá! Acabei de enviar uma solicitação sobre *${selectedService}*\n\n`;
      
      for (const [key, value] of Object.entries(formData)) {
        const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
        if (Array.isArray(value)) {
          whatsappMessage += `*${label}:* ${value.join(', ')}\n`;
        } else {
          whatsappMessage += `*${label}:* ${value}\n`;
        }
      }

      const whatsappUrl = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}&type=phone_number&app_absent=0`;
      window.open(whatsappUrl, "_blank");

      // Reset
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao enviar",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(135deg, hsl(150, 15%, 18%) 0%, hsl(150, 18%, 20%) 50%, hsl(148, 20%, 22%) 100%)', opacity: 0.95 }} />
      
      <div className="w-full max-w-2xl relative z-10">
        {/* Botão Voltar */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>

        <div className="glass-card p-8 sm:p-12 rounded-2xl animate-in fade-in duration-700">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src={ramaLogo} 
              alt="Rama Digital Logo" 
              className="w-20 h-20 object-contain drop-shadow-2xl"
            />
          </div>

          {step === 0 ? (
            // Tela Inicial
            <div className="space-y-6 text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Sua conexão com os especialistas da{" "}
                <span className="text-primary">Rama Digital</span>{" "}
                <span className="italic">começa agora</span>
              </h1>
              
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Para conversar com nossos consultores e descobrir como podemos impulsionar sua empresa, 
                você precisará responder algumas perguntas rápidas. Ao clicar em 'Iniciar', 
                você concorda com nossa Política de Privacidade.
              </p>

              <div className="flex items-center justify-center gap-2 py-4">
                <Checkbox
                  id="accept"
                  checked={accepted}
                  onCheckedChange={(checked) => setAccepted(checked as boolean)}
                />
                <Label
                  htmlFor="accept"
                  className="text-sm text-foreground cursor-pointer"
                >
                  Eu aceito
                </Label>
              </div>

              <Button
                onClick={handleStart}
                disabled={!accepted}
                size="lg"
                className="w-full max-w-xs mx-auto"
                variant="accent"
              >
                <Sparkles className="w-5 h-5" />
                Iniciar
              </Button>
            </div>
          ) : step === 1 ? (
            // Seleção de Serviços
            <ServiceSelection onSelectService={handleSelectService} />
          ) : (
            // Formulários específicos
            <div>
              {selectedService === "trafego-pago" && (
                <FormTrafegoPago onBack={handleBackToServices} onSubmit={handleSubmit} />
              )}
              {selectedService === "sites-landing-pages" && (
                <FormSitesLanding onBack={handleBackToServices} onSubmit={handleSubmit} />
              )}
              {selectedService === "agentes-ia" && (
                <FormAgentesIA onBack={handleBackToServices} onSubmit={handleSubmit} />
              )}
            </div>
          )}

          {/* Footer */}
          <div className="text-center pt-8 text-sm text-muted-foreground">
            <p>© 2024 Desenvolvido por Rama Digital</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Atendimento;
