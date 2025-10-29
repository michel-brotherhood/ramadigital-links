import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import { formatPhone, emailSchema, phoneSchema, cargosComuns } from "@/lib/formValidation";
import { useToast } from "@/hooks/use-toast";

interface FormAgentesIAProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

const FormAgentesIA = ({ onBack, onSubmit }: FormAgentesIAProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Etapa 1 - Configuração Inicial
    nomeCompleto: "",
    empresa: "",
    cargo: "",
    emailCorporativo: "",
    whatsapp: "",
    setorAtuacao: "",
    
    // Etapa 2 - Análise do Negócio
    focoAutomacao: "",
    problemaResolver: "",
    volumeMensal: "",
    sistemas: [] as string[],
    
    // Campos condicionais por tipo de automação
    // Atendimento ao Cliente
    canaisAtendimento: [] as string[],
    tempoRespostaAtual: "",
    ticketsMensais: "",
    
    // Vendas e Leads
    etapasFunil: "",
    taxaConversaoAtual: "",
    cicloVendas: "",
    
    // Processos Internos
    departamentosEnvolvidos: [] as string[],
    frequenciaProcesso: "",
    tempoAtualProcesso: "",
    
    // Marketing
    tiposCampanha: [] as string[],
    publicoAlvo: "",
    ferramentasMarketing: "",
    
    // Análise de Dados
    tiposDados: [] as string[],
    frequenciaRelatorios: "",
    fonteDados: "",
    
    // Etapa 3 - Detalhes do Projeto
    desafio: "",
    orcamento: "",
    prazo: "",
    informacoesAdicionais: "",
  });

  const sistemasOptions = [
    "WhatsApp Business",
    "Site/E-commerce",
    "CRM (Salesforce, HubSpot, etc.)",
    "ERP/Sistema de Gestão",
    "E-mail Marketing",
    "Redes Sociais",
    "Outros",
  ];

  const handleSistemaToggle = (sistema: string) => {
    setFormData(prev => ({
      ...prev,
      sistemas: prev.sistemas.includes(sistema)
        ? prev.sistemas.filter(s => s !== sistema)
        : [...prev.sistemas, sistema]
    }));
    if (errors.sistemas) {
      setErrors(prev => ({ ...prev, sistemas: "" }));
    }
  };

  const handleArrayToggle = (field: string, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field as keyof typeof prev] as string[];
      return {
        ...prev,
        [field]: currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      };
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.nomeCompleto.trim()) newErrors.nomeCompleto = "Nome é obrigatório";
      if (!formData.empresa.trim()) newErrors.empresa = "Empresa é obrigatória";
      if (!formData.cargo.trim()) newErrors.cargo = "Cargo é obrigatório";
      
      const emailValidation = emailSchema.safeParse(formData.emailCorporativo);
      if (!emailValidation.success) {
        newErrors.emailCorporativo = emailValidation.error.errors[0].message;
      }
      
      const phoneValidation = phoneSchema.safeParse(formData.whatsapp);
      if (!phoneValidation.success) {
        newErrors.whatsapp = phoneValidation.error.errors[0].message;
      }
      
      if (!formData.setorAtuacao) newErrors.setorAtuacao = "Setor é obrigatório";
    }
    
    if (step === 2) {
      if (!formData.focoAutomacao) newErrors.focoAutomacao = "Foco da automação é obrigatório";
      if (!formData.problemaResolver.trim()) newErrors.problemaResolver = "Campo obrigatório";
      if (!formData.volumeMensal) newErrors.volumeMensal = "Volume mensal é obrigatório";
      if (formData.sistemas.length === 0) newErrors.sistemas = "Selecione pelo menos um sistema";
    }
    
    if (step === 3) {
      if (!formData.desafio.trim()) newErrors.desafio = "Descreva seu desafio";
    }
    
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

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      onSubmit(formData);
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setFormData({ ...formData, whatsapp: formatted });
    if (errors.whatsapp) {
      setErrors(prev => ({ ...prev, whatsapp: "" }));
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
          AI Agents Personalizados
        </h2>
        <p className="text-muted-foreground mb-4">
          Transforme seu negócio com inteligência artificial de ponta
        </p>
        <div className="text-sm text-muted-foreground">
          Etapa {currentStep} de 3
        </div>
      </div>

      {/* Etapa 1 - Configuração Inicial */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🏢</div>
            <h3 className="text-xl font-semibold text-foreground">Configuração Inicial</h3>
            <p className="text-sm text-muted-foreground">Vamos conhecer sua empresa para criar o AI Agent perfeito</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nomeCompleto">Nome Completo *</Label>
            <Input
              id="nomeCompleto"
              required
              value={formData.nomeCompleto}
              onChange={(e) => {
                setFormData({ ...formData, nomeCompleto: e.target.value });
                if (errors.nomeCompleto) setErrors(prev => ({ ...prev, nomeCompleto: "" }));
              }}
              placeholder="Seu nome completo"
              className={`bg-background/50 ${errors.nomeCompleto ? 'border-destructive' : ''}`}
            />
            {errors.nomeCompleto && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.nomeCompleto}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="empresa">Empresa *</Label>
            <Input
              id="empresa"
              required
              value={formData.empresa}
              onChange={(e) => {
                setFormData({ ...formData, empresa: e.target.value });
                if (errors.empresa) setErrors(prev => ({ ...prev, empresa: "" }));
              }}
              placeholder="Nome da sua empresa"
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
            <Label htmlFor="emailCorporativo">E-mail Corporativo *</Label>
            <Input
              id="emailCorporativo"
              type="email"
              required
              value={formData.emailCorporativo}
              onChange={(e) => {
                setFormData({ ...formData, emailCorporativo: e.target.value });
                if (errors.emailCorporativo) setErrors(prev => ({ ...prev, emailCorporativo: "" }));
              }}
              placeholder="seu@empresa.com"
              className={`bg-background/50 ${errors.emailCorporativo ? 'border-destructive' : ''}`}
            />
            {errors.emailCorporativo && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.emailCorporativo}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp *</Label>
            <Input
              id="whatsapp"
              required
              value={formData.whatsapp}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="(11) 98255-3815"
              maxLength={15}
              className={`bg-background/50 ${errors.whatsapp ? 'border-destructive' : ''}`}
            />
            {errors.whatsapp && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.whatsapp}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="setorAtuacao">Setor de Atuação *</Label>
            <Select
              value={formData.setorAtuacao}
              onValueChange={(value) => {
                setFormData({ ...formData, setorAtuacao: value });
                if (errors.setorAtuacao) setErrors(prev => ({ ...prev, setorAtuacao: "" }));
              }}
              required
            >
              <SelectTrigger className={`bg-background/50 ${errors.setorAtuacao ? 'border-destructive' : ''}`}>
                <SelectValue placeholder="Selecione o setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tecnologia">Tecnologia</SelectItem>
                <SelectItem value="saude">Saúde</SelectItem>
                <SelectItem value="educacao">Educação</SelectItem>
                <SelectItem value="financeiro">Financeiro</SelectItem>
                <SelectItem value="varejo">Varejo</SelectItem>
                <SelectItem value="servicos">Serviços</SelectItem>
                <SelectItem value="industria">Indústria</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
            {errors.setorAtuacao && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.setorAtuacao}
              </p>
            )}
          </div>

          <Button
            type="button"
            onClick={handleNext}
            size="lg"
            className="w-full"
            variant="accent"
          >
            Próxima Etapa
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      {/* Etapa 2 - Análise do Negócio */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-xl font-semibold text-foreground">Análise do Negócio</h3>
            <p className="text-sm text-muted-foreground">Vamos entender qual tipo de automação você precisa</p>
          </div>

          <div className="space-y-3">
            <Label>Qual é o principal foco da automação? *</Label>
            <RadioGroup
              value={formData.focoAutomacao}
              onValueChange={(value) => {
                setFormData({ ...formData, focoAutomacao: value });
                if (errors.focoAutomacao) setErrors(prev => ({ ...prev, focoAutomacao: "" }));
              }}
              required
            >
              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="atendimento" id="atendimento" />
                  <Label htmlFor="atendimento" className="cursor-pointer flex-1">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">💬</div>
                      <div>
                        <div className="font-semibold">Atendimento ao Cliente</div>
                        <div className="text-sm text-muted-foreground">Suporte, FAQ, resolução de dúvidas</div>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>

              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vendas" id="vendas" />
                  <Label htmlFor="vendas" className="cursor-pointer flex-1">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">📈</div>
                      <div>
                        <div className="font-semibold">Vendas e Leads</div>
                        <div className="text-sm text-muted-foreground">Qualificação, follow-up, conversão</div>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>

              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="processos" id="processos" />
                  <Label htmlFor="processos" className="cursor-pointer flex-1">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">⚙️</div>
                      <div>
                        <div className="font-semibold">Processos Internos</div>
                        <div className="text-sm text-muted-foreground">RH, financeiro, operacional</div>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>

              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="marketing" id="marketing" />
                  <Label htmlFor="marketing" className="cursor-pointer flex-1">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">🎯</div>
                      <div>
                        <div className="font-semibold">Marketing</div>
                        <div className="text-sm text-muted-foreground">Campanhas, segmentação, nutrição</div>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>

              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="analise" id="analise" />
                  <Label htmlFor="analise" className="cursor-pointer flex-1">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">📊</div>
                      <div>
                        <div className="font-semibold">Análise de Dados</div>
                        <div className="text-sm text-muted-foreground">Relatórios, insights, dashboards</div>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>

              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personalizado" id="personalizado" />
                  <Label htmlFor="personalizado" className="cursor-pointer flex-1">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">🔧</div>
                      <div>
                        <div className="font-semibold">Personalizado</div>
                        <div className="text-sm text-muted-foreground">Solução específica</div>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
            {errors.focoAutomacao && (
              <p className="text-sm text-destructive flex items-center gap-1 mt-2">
                <AlertCircle className="w-4 h-4" />
                {errors.focoAutomacao}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="problemaResolver">Qual o principal problema que você quer resolver? *</Label>
            <Textarea
              id="problemaResolver"
              required
              value={formData.problemaResolver}
              onChange={(e) => {
                setFormData({ ...formData, problemaResolver: e.target.value });
                if (errors.problemaResolver) setErrors(prev => ({ ...prev, problemaResolver: "" }));
              }}
              placeholder="Descreva o problema ou desafio..."
              className={`bg-background/50 min-h-24 ${errors.problemaResolver ? 'border-destructive' : ''}`}
            />
            {errors.problemaResolver && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.problemaResolver}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="volumeMensal">Volume mensal *</Label>
            <Select
              value={formData.volumeMensal}
              onValueChange={(value) => {
                setFormData({ ...formData, volumeMensal: value });
                if (errors.volumeMensal) setErrors(prev => ({ ...prev, volumeMensal: "" }));
              }}
              required
            >
              <SelectTrigger className={`bg-background/50 ${errors.volumeMensal ? 'border-destructive' : ''}`}>
                <SelectValue placeholder="Selecione o volume" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ate-100">Até 100</SelectItem>
                <SelectItem value="100-500">100 a 500</SelectItem>
                <SelectItem value="500-1000">500 a 1.000</SelectItem>
                <SelectItem value="1000-5000">1.000 a 5.000</SelectItem>
                <SelectItem value="acima-5000">Mais de 5.000</SelectItem>
              </SelectContent>
            </Select>
            {errors.volumeMensal && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.volumeMensal}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label>Principais sistemas/plataformas que usa *</Label>
            {sistemasOptions.map((sistema) => (
              <div key={sistema} className="flex items-center gap-2">
                <Checkbox
                  id={sistema}
                  checked={formData.sistemas.includes(sistema)}
                  onCheckedChange={() => handleSistemaToggle(sistema)}
                />
                <Label htmlFor={sistema} className="cursor-pointer font-normal">
                  {sistema}
                </Label>
              </div>
            ))}
            {errors.sistemas && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.sistemas}
              </p>
            )}
          </div>

          {/* Campos Condicionais baseados no Foco da Automação */}
          {formData.focoAutomacao === "atendimento" && (
            <div className="space-y-4 p-4 rounded-lg border border-primary/20 bg-primary/5 animate-fade-in">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="text-xl">💬</span>
                Detalhes do Atendimento
              </h4>
              
              <div className="space-y-3">
                <Label>Canais de Atendimento Atuais</Label>
                {["WhatsApp", "Chat do Site", "E-mail", "Telefone", "Redes Sociais"].map((canal) => (
                  <div key={canal} className="flex items-center gap-2">
                    <Checkbox
                      id={`canal-${canal}`}
                      checked={formData.canaisAtendimento.includes(canal)}
                      onCheckedChange={() => handleArrayToggle("canaisAtendimento", canal)}
                    />
                    <Label htmlFor={`canal-${canal}`} className="cursor-pointer font-normal">
                      {canal}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tempoRespostaAtual">Tempo médio de resposta atual</Label>
                <Select
                  value={formData.tempoRespostaAtual}
                  onValueChange={(value) => setFormData({ ...formData, tempoRespostaAtual: value })}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="imediato">Imediato (até 5 min)</SelectItem>
                    <SelectItem value="rapido">Rápido (5-30 min)</SelectItem>
                    <SelectItem value="moderado">Moderado (30min-2h)</SelectItem>
                    <SelectItem value="lento">Lento (2h+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ticketsMensais">Quantidade de tickets/atendimentos mensais</Label>
                <Input
                  id="ticketsMensais"
                  value={formData.ticketsMensais}
                  onChange={(e) => setFormData({ ...formData, ticketsMensais: e.target.value })}
                  placeholder="Ex: 500 atendimentos/mês"
                  className="bg-background/50"
                />
              </div>
            </div>
          )}

          {formData.focoAutomacao === "vendas" && (
            <div className="space-y-4 p-4 rounded-lg border border-primary/20 bg-primary/5 animate-fade-in">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="text-xl">📈</span>
                Detalhes de Vendas
              </h4>
              
              <div className="space-y-2">
                <Label htmlFor="etapasFunil">Quantas etapas tem seu funil de vendas?</Label>
                <Select
                  value={formData.etapasFunil}
                  onValueChange={(value) => setFormData({ ...formData, etapasFunil: value })}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 etapas</SelectItem>
                    <SelectItem value="4-5">4-5 etapas</SelectItem>
                    <SelectItem value="6+">6+ etapas</SelectItem>
                    <SelectItem value="nao-definido">Não tenho definido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxaConversaoAtual">Taxa de conversão atual (aproximada)</Label>
                <Input
                  id="taxaConversaoAtual"
                  value={formData.taxaConversaoAtual}
                  onChange={(e) => setFormData({ ...formData, taxaConversaoAtual: e.target.value })}
                  placeholder="Ex: 5% ou Não sei"
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cicloVendas">Ciclo médio de vendas</Label>
                <Select
                  value={formData.cicloVendas}
                  onValueChange={(value) => setFormData({ ...formData, cicloVendas: value })}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="curto">Curto (até 7 dias)</SelectItem>
                    <SelectItem value="medio">Médio (7-30 dias)</SelectItem>
                    <SelectItem value="longo">Longo (30-90 dias)</SelectItem>
                    <SelectItem value="muito-longo">Muito Longo (90+ dias)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {formData.focoAutomacao === "processos" && (
            <div className="space-y-4 p-4 rounded-lg border border-primary/20 bg-primary/5 animate-fade-in">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="text-xl">⚙️</span>
                Detalhes dos Processos
              </h4>
              
              <div className="space-y-3">
                <Label>Departamentos envolvidos</Label>
                {["RH", "Financeiro", "Operações", "TI", "Comercial", "Administrativo"].map((dept) => (
                  <div key={dept} className="flex items-center gap-2">
                    <Checkbox
                      id={`dept-${dept}`}
                      checked={formData.departamentosEnvolvidos.includes(dept)}
                      onCheckedChange={() => handleArrayToggle("departamentosEnvolvidos", dept)}
                    />
                    <Label htmlFor={`dept-${dept}`} className="cursor-pointer font-normal">
                      {dept}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequenciaProcesso">Frequência do processo</Label>
                <Select
                  value={formData.frequenciaProcesso}
                  onValueChange={(value) => setFormData({ ...formData, frequenciaProcesso: value })}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diaria">Diária</SelectItem>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="mensal">Mensal</SelectItem>
                    <SelectItem value="eventual">Eventual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tempoAtualProcesso">Tempo gasto atualmente no processo</Label>
                <Input
                  id="tempoAtualProcesso"
                  value={formData.tempoAtualProcesso}
                  onChange={(e) => setFormData({ ...formData, tempoAtualProcesso: e.target.value })}
                  placeholder="Ex: 2 horas por dia"
                  className="bg-background/50"
                />
              </div>
            </div>
          )}

          {formData.focoAutomacao === "marketing" && (
            <div className="space-y-4 p-4 rounded-lg border border-primary/20 bg-primary/5 animate-fade-in">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="text-xl">🎯</span>
                Detalhes de Marketing
              </h4>
              
              <div className="space-y-3">
                <Label>Tipos de campanhas</Label>
                {["E-mail Marketing", "Redes Sociais", "Google Ads", "Meta Ads", "LinkedIn Ads", "Conteúdo/Blog"].map((tipo) => (
                  <div key={tipo} className="flex items-center gap-2">
                    <Checkbox
                      id={`campanha-${tipo}`}
                      checked={formData.tiposCampanha.includes(tipo)}
                      onCheckedChange={() => handleArrayToggle("tiposCampanha", tipo)}
                    />
                    <Label htmlFor={`campanha-${tipo}`} className="cursor-pointer font-normal">
                      {tipo}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="publicoAlvo">Descreva seu público-alvo</Label>
                <Textarea
                  id="publicoAlvo"
                  value={formData.publicoAlvo}
                  onChange={(e) => setFormData({ ...formData, publicoAlvo: e.target.value })}
                  placeholder="Ex: Empresas B2B do setor de tecnologia, 50-200 funcionários..."
                  className="bg-background/50 min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ferramentasMarketing">Ferramentas de marketing que usa</Label>
                <Input
                  id="ferramentasMarketing"
                  value={formData.ferramentasMarketing}
                  onChange={(e) => setFormData({ ...formData, ferramentasMarketing: e.target.value })}
                  placeholder="Ex: RD Station, HubSpot, Mailchimp..."
                  className="bg-background/50"
                />
              </div>
            </div>
          )}

          {formData.focoAutomacao === "analise" && (
            <div className="space-y-4 p-4 rounded-lg border border-primary/20 bg-primary/5 animate-fade-in">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="text-xl">📊</span>
                Detalhes de Análise de Dados
              </h4>
              
              <div className="space-y-3">
                <Label>Tipos de dados para análise</Label>
                {["Vendas", "Marketing", "Financeiro", "Operacional", "Comportamento de Usuários", "Estoque"].map((tipo) => (
                  <div key={tipo} className="flex items-center gap-2">
                    <Checkbox
                      id={`dados-${tipo}`}
                      checked={formData.tiposDados.includes(tipo)}
                      onCheckedChange={() => handleArrayToggle("tiposDados", tipo)}
                    />
                    <Label htmlFor={`dados-${tipo}`} className="cursor-pointer font-normal">
                      {tipo}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequenciaRelatorios">Frequência desejada dos relatórios</Label>
                <Select
                  value={formData.frequenciaRelatorios}
                  onValueChange={(value) => setFormData({ ...formData, frequenciaRelatorios: value })}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tempo-real">Tempo Real</SelectItem>
                    <SelectItem value="diario">Diário</SelectItem>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="mensal">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fonteDados">Fontes de dados principais</Label>
                <Input
                  id="fonteDados"
                  value={formData.fonteDados}
                  onChange={(e) => setFormData({ ...formData, fonteDados: e.target.value })}
                  placeholder="Ex: Google Analytics, Banco de Dados SQL, Planilhas..."
                  className="bg-background/50"
                />
              </div>
            </div>
          )}

          {formData.focoAutomacao === "personalizado" && (
            <div className="space-y-4 p-4 rounded-lg border border-primary/20 bg-primary/5 animate-fade-in">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="text-xl">🔧</span>
                Solução Personalizada
              </h4>
              
              <div className="space-y-2">
                <Label htmlFor="descricaoPersonalizada">Descreva em detalhes sua necessidade</Label>
                <Textarea
                  id="descricaoPersonalizada"
                  value={formData.informacoesAdicionais}
                  onChange={(e) => setFormData({ ...formData, informacoesAdicionais: e.target.value })}
                  placeholder="Conte-nos tudo sobre o que você precisa: contexto, objetivos, desafios específicos..."
                  className="bg-background/50 min-h-32"
                />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              onClick={handlePrevious}
              size="lg"
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              size="lg"
              className="flex-1"
              variant="accent"
            >
              Próxima Etapa
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Etapa 3 - Detalhes do Projeto */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-xl font-semibold text-foreground">Detalhes do Projeto</h3>
            <p className="text-sm text-muted-foreground">Conte-nos mais sobre suas necessidades específicas</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="desafio">Descreva seu principal desafio *</Label>
            <Textarea
              id="desafio"
              required
              value={formData.desafio}
              onChange={(e) => {
                setFormData({ ...formData, desafio: e.target.value });
                if (errors.desafio) setErrors(prev => ({ ...prev, desafio: "" }));
              }}
              placeholder="Conte mais sobre o desafio que você enfrenta..."
              className={`bg-background/50 min-h-32 ${errors.desafio ? 'border-destructive' : ''}`}
            />
            {errors.desafio && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.desafio}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="orcamento">Orçamento Estimado</Label>
            <Select
              value={formData.orcamento}
              onValueChange={(value) => setFormData({ ...formData, orcamento: value })}
            >
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Selecione uma faixa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5k-15k">R$ 5.000 - R$ 15.000</SelectItem>
                <SelectItem value="15k-30k">R$ 15.000 - R$ 30.000</SelectItem>
                <SelectItem value="30k-50k">R$ 30.000 - R$ 50.000</SelectItem>
                <SelectItem value="acima-50k">Acima de R$ 50.000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prazo">Prazo Desejado</Label>
            <Select
              value={formData.prazo}
              onValueChange={(value) => setFormData({ ...formData, prazo: value })}
            >
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Selecione o prazo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgente">Urgente (até 30 dias)</SelectItem>
                <SelectItem value="normal">Normal (30-60 dias)</SelectItem>
                <SelectItem value="flexivel">Flexível (60+ dias)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="informacoesAdicionais">Informações Adicionais</Label>
            <Textarea
              id="informacoesAdicionais"
              value={formData.informacoesAdicionais}
              onChange={(e) => setFormData({ ...formData, informacoesAdicionais: e.target.value })}
              placeholder="Qualquer outra informação que considere relevante..."
              className="bg-background/50 min-h-32"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              onClick={handlePrevious}
              size="lg"
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
            <Button
              type="submit"
              size="lg"
              className="flex-1"
              variant="accent"
            >
              Enviar Solicitação
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default FormAgentesIA;
