import { z } from "zod";

// Validação de email mais rigorosa
const emailDomainsList = [
  "gmail.com", "outlook.com", "hotmail.com", "yahoo.com", "icloud.com",
  "live.com", "msn.com", "uol.com.br", "bol.com.br", "terra.com.br",
  "globo.com", "ig.com.br", "r7.com"
];

export const emailSchema = z
  .string()
  .min(1, "E-mail é obrigatório")
  .email("E-mail inválido")
  .refine((email) => {
    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain) return false;
    
    // Verifica se o domínio tem pelo menos 2 partes (ex: gmail.com)
    const domainParts = domain.split(".");
    if (domainParts.length < 2) return false;
    
    // Verifica se não é um email temporário/descartável comum
    const disposablePatterns = ["temp", "fake", "test", "trash", "throwaway"];
    const isDomainSuspicious = disposablePatterns.some(pattern => 
      domain.includes(pattern)
    );
    
    return !isDomainSuspicious;
  }, "E-mail inválido ou descartável")
  .refine((email) => {
    // Verifica padrões suspeitos no nome do usuário
    const username = email.split("@")[0]?.toLowerCase();
    if (!username) return false;
    
    const suspiciousPatterns = ["test", "fake", "asdf", "qwerty", "123456"];
    return !suspiciousPatterns.some(pattern => username.includes(pattern));
  }, "E-mail parece ser inválido");

// Validação de telefone brasileiro
export const phoneSchema = z
  .string()
  .min(1, "Telefone é obrigatório")
  .refine((phone) => {
    // Remove caracteres não numéricos
    const numbers = phone.replace(/\D/g, "");
    
    // Deve ter 10 ou 11 dígitos (fixo ou celular)
    if (numbers.length < 10 || numbers.length > 11) return false;
    
    // Verifica se não é uma sequência óbvia
    const sequences = ["11111111", "22222222", "33333333", "44444444", 
                       "55555555", "66666666", "77777777", "88888888", 
                       "99999999", "00000000", "12345678"];
    
    const hasSequence = sequences.some(seq => numbers.includes(seq));
    if (hasSequence) return false;
    
    // Valida DDD (11 a 99)
    const ddd = parseInt(numbers.substring(0, 2));
    if (ddd < 11 || ddd > 99) return false;
    
    return true;
  }, "Telefone inválido");

// Função para formatar telefone com máscara
export const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  
  if (numbers.length <= 10) {
    // Formato: (11) 1234-5678
    return numbers
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    // Formato: (11) 91234-5678
    return numbers
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  }
};

// Lista de cargos comuns
export const cargosComuns = [
  "CEO / Fundador(a)",
  "Diretor(a) Geral",
  "Diretor(a) Comercial",
  "Diretor(a) de Marketing",
  "Diretor(a) de TI",
  "Diretor(a) Financeiro(a)",
  "Gerente Geral",
  "Gerente Comercial",
  "Gerente de Marketing",
  "Gerente de Vendas",
  "Gerente de TI",
  "Gerente de Projetos",
  "Coordenador(a) de Marketing",
  "Coordenador(a) Comercial",
  "Analista de Marketing",
  "Analista Comercial",
  "Analista de TI",
  "Supervisor(a) Comercial",
  "Consultor(a)",
  "Empresário(a)",
  "Autônomo(a)",
  "Outro"
];
