import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { formatPhone, emailSchema, phoneSchema, cargosComuns } from "@/lib/formValidation";
import { useToast } from "@/hooks/use-toast";

interface FormTrafegoPagoProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

const FormTrafegoPago = ({ onBack, onSubmit }: FormTrafegoPagoProps) => {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cargo: "",
    empresa: "",
    website: "",
    orcamentoMensal: "",
    plataformas: [] as string[],
    objetivos: "",
    publicoAlvo: "",
    mensagem: "",
  });

  const plataformasOptions = [
    "Google Ads",
    "Meta Ads (Facebook/Instagram)",
    "LinkedIn Ads",
    "TikTok Ads",
    "YouTube Ads",
  ];

  const handlePlatformToggle = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      plataformas: prev.plataformas.includes(platform)
        ? prev.plataformas.filter(p => p !== platform)
        : [...prev.plataformas, platform]
    }));
    if (errors.plataformas) {
      setErrors(prev => ({ ...prev, plataformas: "" }));
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setFormData({ ...formData, telefone: formatted });
    if (errors.telefone) {
      setErrors(prev => ({ ...prev, telefone: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.cargo.trim()) newErrors.cargo = "Cargo é obrigatório";
    if (!formData.empresa.trim()) newErrors.empresa = "Empresa é obrigatória";
    
    const emailValidation = emailSchema.safeParse(formData.email);
    if (!emailValidation.success) {
      newErrors.email = emailValidation.error.errors[0].message;
    }
    
    const phoneValidation = phoneSchema.safeParse(formData.telefone);
    if (!phoneValidation.success) {
      newErrors.telefone = phoneValidation.error.errors[0].message;
    }
    
    if (!formData.orcamentoMensal) newErrors.orcamentoMensal = "Orçamento é obrigatório";
    if (formData.plataformas.length === 0) newErrors.plataformas = "Selecione pelo menos uma plataforma";
    if (!formData.objetivos.trim()) newErrors.objetivos = "Objetivos são obrigatórios";
    if (!formData.publicoAlvo.trim()) newErrors.publicoAlvo = "Público-alvo é obrigatório";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      toast({
        title: "Atenção",
        description: "Por favor, preencha todos os campos obrigatórios corretamente",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Button>

      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Tráfego Pago
        </h2>
        <p className="text-muted-foreground">
          Vamos criar uma estratégia de tráfego pago personalizada para o seu negócio
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nome">Nome completo *</Label>
        <Input
          id="nome"
          required
          value={formData.nome}
          onChange={(e) => {
            setFormData({ ...formData, nome: e.target.value });
            if (errors.nome) setErrors(prev => ({ ...prev, nome: "" }));
          }}
          placeholder="Seu nome"
          className={`bg-background/50 ${errors.nome ? 'border-destructive' : ''}`}
        />
        {errors.nome && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.nome}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail *</Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
          }}
          placeholder="seu@email.com"
          className={`bg-background/50 ${errors.email ? 'border-destructive' : ''}`}
        />
        {errors.email && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefone">Telefone / WhatsApp *</Label>
        <Input
          id="telefone"
          required
          value={formData.telefone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder="(11) 98255-3815"
          maxLength={15}
          className={`bg-background/50 ${errors.telefone ? 'border-destructive' : ''}`}
        />
        {errors.telefone && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.telefone}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cargo">Cargo/Função *</Label>
        <Select
          value={formData.cargo}
          onValueChange={(value) => {
            setFormData({ ...formData, cargo: value });
            if (errors.cargo) setErrors(prev => ({ ...prev, cargo: "" }));
          }}
          required
        >
          <SelectTrigger className={`bg-background/50 ${errors.cargo ? 'border-destructive' : ''}`}>
            <SelectValue placeholder="Selecione seu cargo" />
          </SelectTrigger>
          <SelectContent>
            {cargosComuns.map((cargo) => (
              <SelectItem key={cargo} value={cargo}>{cargo}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.cargo && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.cargo}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="empresa">Nome da empresa *</Label>
        <Input
          id="empresa"
          required
          value={formData.empresa}
          onChange={(e) => {
            setFormData({ ...formData, empresa: e.target.value });
            if (errors.empresa) setErrors(prev => ({ ...prev, empresa: "" }));
          }}
          placeholder="Sua empresa"
          className={`bg-background/50 ${errors.empresa ? 'border-destructive' : ''}`}
        />
        {errors.empresa && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.empresa}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website (se houver)</Label>
        <Input
          id="website"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          placeholder="www.suaempresa.com.br"
          className="bg-background/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="orcamentoMensal">Orçamento mensal previsto *</Label>
        <Select
          value={formData.orcamentoMensal}
          onValueChange={(value) => {
            setFormData({ ...formData, orcamentoMensal: value });
            if (errors.orcamentoMensal) setErrors(prev => ({ ...prev, orcamentoMensal: "" }));
          }}
          required
        >
          <SelectTrigger className={`bg-background/50 ${errors.orcamentoMensal ? 'border-destructive' : ''}`}>
            <SelectValue placeholder="Selecione o orçamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ate-5k">Até R$ 5.000</SelectItem>
            <SelectItem value="5k-10k">R$ 5.000 - R$ 10.000</SelectItem>
            <SelectItem value="10k-20k">R$ 10.000 - R$ 20.000</SelectItem>
            <SelectItem value="20k-50k">R$ 20.000 - R$ 50.000</SelectItem>
            <SelectItem value="acima-50k">Acima de R$ 50.000</SelectItem>
          </SelectContent>
        </Select>
        {errors.orcamentoMensal && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.orcamentoMensal}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Plataformas de interesse *</Label>
        {plataformasOptions.map((platform) => (
          <div key={platform} className="flex items-center gap-2">
            <Checkbox
              id={platform}
              checked={formData.plataformas.includes(platform)}
              onCheckedChange={() => handlePlatformToggle(platform)}
            />
            <Label htmlFor={platform} className="cursor-pointer font-normal">
              {platform}
            </Label>
          </div>
        ))}
        {errors.plataformas && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.plataformas}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="objetivos">Principais objetivos *</Label>
        <Input
          id="objetivos"
          required
          value={formData.objetivos}
          onChange={(e) => {
            setFormData({ ...formData, objetivos: e.target.value });
            if (errors.objetivos) setErrors(prev => ({ ...prev, objetivos: "" }));
          }}
          placeholder="Ex: Gerar leads, aumentar vendas, reconhecimento de marca..."
          className={`bg-background/50 ${errors.objetivos ? 'border-destructive' : ''}`}
        />
        {errors.objetivos && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.objetivos}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="publicoAlvo">Público-alvo *</Label>
        <Textarea
          id="publicoAlvo"
          required
          value={formData.publicoAlvo}
          onChange={(e) => {
            setFormData({ ...formData, publicoAlvo: e.target.value });
            if (errors.publicoAlvo) setErrors(prev => ({ ...prev, publicoAlvo: "" }));
          }}
          placeholder="Descreva seu público-alvo (idade, localização, interesses...)"
          className={`bg-background/50 min-h-24 ${errors.publicoAlvo ? 'border-destructive' : ''}`}
        />
        {errors.publicoAlvo && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.publicoAlvo}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="mensagem">Informações adicionais</Label>
        <Textarea
          id="mensagem"
          value={formData.mensagem}
          onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
          placeholder="Conte mais sobre suas necessidades..."
          className="bg-background/50 min-h-32"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        variant="accent"
      >
        Enviar Solicitação
      </Button>
    </form>
  );
};

export default FormTrafegoPago;
