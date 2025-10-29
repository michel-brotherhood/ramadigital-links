import { Card } from "@/components/ui/card";
import { Target, Globe, Bot } from "lucide-react";

interface ServiceSelectionProps {
  onSelectService: (service: string) => void;
}

const ServiceSelection = ({ onSelectService }: ServiceSelectionProps) => {
  const services = [
    {
      id: "trafego-pago",
      title: "Tráfego Pago",
      description: "Impulsione suas vendas com campanhas de alta performance em Google, Meta e LinkedIn",
      icon: Target,
    },
    {
      id: "sites-landing-pages",
      title: "Sites/Landing Pages",
      description: "Páginas profissionais otimizadas para conversão e experiência do usuário",
      icon: Globe,
    },
    {
      id: "agentes-ia",
      title: "Contratar Agentes de IA",
      description: "Automação inteligente que aprende e evolui com sua empresa",
      icon: Bot,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Escolha o serviço que você precisa
        </h2>
        <p className="text-muted-foreground">
          Selecione abaixo para preencher o formulário específico
        </p>
      </div>

      <div className="grid gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card
              key={service.id}
              className="glass-card p-6 cursor-pointer hover:border-primary transition-smooth hover:shadow-lg"
              onClick={() => onSelectService(service.id)}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSelection;
