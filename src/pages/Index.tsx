import { MessageCircle, TrendingUp, Sparkles, Target, BarChart3, Brain } from "lucide-react";
import { ServiceLink } from "@/components/ServiceLink";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ramaLogo from "@/assets/rama-logo.png";

const Index = () => {
  const navigate = useNavigate();
  const whatsappNumber = "5511982553815";
  
  const services = [
    {
      title: "Marketing Digital",
      description: "Estratégias completas para sua marca crescer online",
      href: `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=Olá! Gostaria de saber mais sobre *Marketing Digital* e como posso impulsionar minha marca online.&type=phone_number&app_absent=0`,
      icon: <TrendingUp className="w-6 h-6" />,
      iconAnimation: "animate-float-up",
    },
    {
      title: "Gestão de Vendas",
      description: "Otimização de processos e automação comercial",
      href: `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=Olá! Tenho interesse em *Gestão de Vendas* e gostaria de otimizar os processos comerciais da minha empresa.&type=phone_number&app_absent=0`,
      icon: <Target className="w-6 h-6" />,
      iconAnimation: "animate-pulse-target",
    },
    {
      title: "Inteligência Artificial",
      description: "Soluções empresariais com IA de ponta",
      href: `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=Olá! Quero conhecer as soluções de *Inteligência Artificial* para aplicar no meu negócio.&type=phone_number&app_absent=0`,
      icon: <Brain className="w-6 h-6" />,
      iconAnimation: "animate-pulse-glow",
    },
    {
      title: "Analytics & Dados",
      description: "Análise de métricas e insights estratégicos",
      href: `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=Olá! Gostaria de entender melhor sobre *Analytics e Dados* para tomar decisões mais estratégicas.&type=phone_number&app_absent=0`,
      icon: <BarChart3 className="w-6 h-6" />,
      iconAnimation: "animate-bounce-chart",
    },
  ];

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
      
      {/* Overlay to darken video */}
      <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(135deg, hsl(150, 15%, 18%) 0%, hsl(150, 18%, 20%) 50%, hsl(148, 20%, 22%) 100%)', opacity: 0.95 }} />
      
      <div className="w-full max-w-2xl space-y-6 sm:space-y-8 animate-in fade-in duration-700 relative z-10">
        {/* Logo e Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex justify-center mb-2 sm:mb-3">
            <img 
              src={ramaLogo} 
              alt="Rama Digital Logo" 
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain drop-shadow-2xl"
              style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight px-4">
            Rama Digital
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-md mx-auto px-4">
            Ecossistema de soluções empresariais com foco em Marketing, Vendas & IA
          </p>
          <div className="flex items-center justify-center gap-2 text-primary px-4">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium">Transformando negócios digitalmente</span>
          </div>
        </div>

        {/* Links de Serviços */}
        <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4 flex flex-col items-center w-full px-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="animate-in slide-in-from-bottom duration-500 w-full flex justify-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ServiceLink {...service} />
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="pt-4 sm:pt-6 animate-in fade-in duration-700 delay-500 flex justify-center px-4">
          <Button
            onClick={() => navigate("/atendimento")}
            variant="accent"
            size="xl"
            className="w-full max-w-md animate-pulse text-sm sm:text-base"
            style={{ animationDuration: '3s' }}
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-smooth" />
            Quero falar com um especialista
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center pt-6 sm:pt-8 text-xs sm:text-sm text-muted-foreground px-4">
          <p>© 2024 Rama Digital. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
