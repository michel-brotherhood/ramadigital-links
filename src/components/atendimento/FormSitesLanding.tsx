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

interface FormSitesLandingProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

const FormSitesLanding = ({ onBack, onSubmit }: FormSitesLandingProps) => {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cargo: "",
    empresa: "",
    tipoSite: "",
    orcamento: "",
    prazo: "",
    funcionalidades: [] as string[],
    referencia: "",
    mensagem: "",
  });

  const funcionalidadesOptions = [
    "Formulário de contato",
    "Chat online",
    "Integração com CRM",
    "Blog",
    "E-commerce",
    "Área de membros/Login",
    "Multidioma",
    "Agendamento online",
  ];

  const handleFuncionalidadeToggle = (func: string) => {
    setFormData(prev => ({
      ...prev,
      funcionalidades: prev.funcionalidades.includes(func)
        ? prev.funcionalidades.filter(f => f !== func)
        : [...prev.funcionalidades, func]
    }));
    if (errors.funcionalidades) {
      setErrors(prev => ({ ...prev, funcionalidades: "" }));
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
    
    if (!formData.tipoSite) newErrors.tipoSite = "Tipo de projeto é obrigatório";
    if (!formData.orcamento) newErrors.orcamento = "Orçamento é obrigatório";
    if (!formData.prazo) newErrors.prazo = "Prazo é obrigatório";
    if (formData.funcionalidades.length === 0) newErrors.funcionalidades = "Selecione pelo menos uma funcionalidade";
    
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
          Sites & Landing Pages
        </h2>
        <p className="text-muted-foreground">
          Vamos criar uma presença digital impactante para o seu negócio
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
        <Label htmlFor="tipoSite">Tipo de projeto *</Label>
        <Select
          value={formData.tipoSite}
          onValueChange={(value) => {
            setFormData({ ...formData, tipoSite: value });
            if (errors.tipoSite) setErrors(prev => ({ ...prev, tipoSite: "" }));
          }}
          required
        >
          <SelectTrigger className={`bg-background/50 ${errors.tipoSite ? 'border-destructive' : ''}`}>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="institucional">Site Institucional</SelectItem>
            <SelectItem value="landing-page">Landing Page</SelectItem>
            <SelectItem value="ecommerce">E-commerce</SelectItem>
            <SelectItem value="blog">Blog/Portal</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
          </SelectContent>
        </Select>
        {errors.tipoSite && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.tipoSite}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="orcamento">Orçamento estimado *</Label>
        <Select
          value={formData.orcamento}
          onValueChange={(value) => {
            setFormData({ ...formData, orcamento: value });
            if (errors.orcamento) setErrors(prev => ({ ...prev, orcamento: "" }));
          }}
          required
        >
          <SelectTrigger className={`bg-background/50 ${errors.orcamento ? 'border-destructive' : ''}`}>
            <SelectValue placeholder="Selecione o orçamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ate-5k">Até R$ 5.000</SelectItem>
            <SelectItem value="5k-10k">R$ 5.000 - R$ 10.000</SelectItem>
            <SelectItem value="10k-20k">R$ 10.000 - R$ 20.000</SelectItem>
            <SelectItem value="acima-20k">Acima de R$ 20.000</SelectItem>
          </SelectContent>
        </Select>
        {errors.orcamento && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.orcamento}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="prazo">Prazo desejado *</Label>
        <Select
          value={formData.prazo}
          onValueChange={(value) => {
            setFormData({ ...formData, prazo: value });
            if (errors.prazo) setErrors(prev => ({ ...prev, prazo: "" }));
          }}
          required
        >
          <SelectTrigger className={`bg-background/50 ${errors.prazo ? 'border-destructive' : ''}`}>
            <SelectValue placeholder="Selecione o prazo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="urgente">Urgente (até 15 dias)</SelectItem>
            <SelectItem value="normal">Normal (30-45 dias)</SelectItem>
            <SelectItem value="flexivel">Flexível (60+ dias)</SelectItem>
          </SelectContent>
        </Select>
        {errors.prazo && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.prazo}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Funcionalidades desejadas *</Label>
        {funcionalidadesOptions.map((func) => (
          <div key={func} className="flex items-center gap-2">
            <Checkbox
              id={func}
              checked={formData.funcionalidades.includes(func)}
              onCheckedChange={() => handleFuncionalidadeToggle(func)}
            />
            <Label htmlFor={func} className="cursor-pointer font-normal">
              {func}
            </Label>
          </div>
        ))}
        {errors.funcionalidades && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.funcionalidades}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="referencia">Sites de referência (opcional)</Label>
        <Textarea
          id="referencia"
          value={formData.referencia}
          onChange={(e) => setFormData({ ...formData, referencia: e.target.value })}
          placeholder="Cole links de sites que você gosta como inspiração..."
          className="bg-background/50 min-h-24"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mensagem">Informações adicionais</Label>
        <Textarea
          id="mensagem"
          value={formData.mensagem}
          onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
          placeholder="Conte mais sobre seu projeto..."
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

export default FormSitesLanding;
