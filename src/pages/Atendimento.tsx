import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles, CheckCircle, MessageCircle } from "lucide-react";
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
  const [whatsappUrl, setWhatsappUrl] = useState<string>("");
  const [countdown, setCountdown] = useState(5);
  const [clientName, setClientName] = useState<string>("");

  const whatsappNumber = "5511982553815";

  // Countdown effect for Thank You page
  useEffect(() => {
    if (step === 3 && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (step === 3 && countdown === 0) {
      window.open(whatsappUrl, "_blank");
      navigate("/");
    }
  }, [step, countdown, whatsappUrl, navigate]);

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

  const getServiceName = (service: string) => {
    const names: Record<string, string> = {
      "trafego-pago": "Tráfego Pago",
      "sites-landing-pages": "Sites & Landing Pages",
      "agentes-ia": "Agentes de IA",
    };
    return names[service] || service;
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

      // Salvar nome do cliente
      const nome = formData.nome || formData.nomeCompleto || "Cliente";
      setClientName(nome.split(" ")[0]); // Primeiro nome

      // Preparar mensagem WhatsApp
      let whatsappMessage = `Olá! Acabei de enviar uma solicitação sobre *${getServiceName(selectedService || "")}*\n\n`;
      
      for (const [key, value] of Object.entries(formData)) {
        const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
        if (Array.isArray(value)) {
          whatsappMessage += `*${label}:* ${value.join(', ')}\n`;
        } else {
          whatsappMessage += `*${label}:* ${value}\n`;
        }
      }

      const url = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}&type=phone_number&app_absent=0`;
      setWhatsappUrl(url);
      setCountdown(5);
      setStep(3);
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
                você concorda com nossa{" "}
                <a 
                  href="/politica-privacidade" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                >
                  Política de Privacidade
                </a>.
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
          ) : step === 2 ? (
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
          ) : (
            // Página de Obrigado (step 3)
            <div className="space-y-8 text-center">
              {/* Ícone de sucesso animado */}
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center animate-scale-in">
                  <CheckCircle className="w-14 h-14 text-primary animate-fade-in" />
                </div>
              </div>

              {/* Mensagem de agradecimento */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                  Obrigado, {clientName}!
                </h1>
                <p className="text-muted-foreground text-lg">
                  Sua solicitação de{" "}
                  <span className="text-primary font-semibold">
                    {getServiceName(selectedService || "")}
                  </span>{" "}
                  foi enviada com sucesso.
                </p>
              </div>

              {/* Contagem regressiva */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-20 h-20">
                  {/* Círculo de fundo */}
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-muted/30"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={226}
                      strokeDashoffset={226 - (226 * countdown) / 5}
                      className="text-primary transition-all duration-1000 ease-linear"
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Número central */}
                  <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-foreground">
                    {countdown}
                  </span>
                </div>
                <p className="text-muted-foreground">
                  Redirecionando para o WhatsApp...
                </p>
              </div>

              {/* Botão manual */}
              <Button
                onClick={() => {
                  window.open(whatsappUrl, "_blank");
                  navigate("/");
                }}
                size="lg"
                className="bg-[#25D366] hover:bg-[#25D366]/90 text-white"
              >
                <MessageCircle className="w-5 h-5" />
                Ir para WhatsApp agora
              </Button>
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
