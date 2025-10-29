import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ramaLogo from "@/assets/rama-logo.png";

const PoliticaPrivacidade = () => {
  const navigate = useNavigate();

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
      
      <div className="w-full max-w-4xl relative z-10">
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
              className="w-16 h-16 object-contain drop-shadow-2xl"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-8">
            Política de Privacidade
          </h1>

          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Introdução</h2>
              <p>
                A Rama Digital está comprometida em proteger a privacidade e os dados pessoais de seus clientes e visitantes. 
                Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações quando 
                você utiliza nossos serviços de Marketing Digital, Vendas e Inteligência Artificial.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Informações Coletadas</h2>
              <p className="mb-2">Coletamos as seguintes informações quando você utiliza nossos serviços:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Dados de identificação: nome, e-mail, telefone</li>
                <li>Informações empresariais: nome da empresa, cargo, setor de atuação</li>
                <li>Dados de projeto: orçamento, prazos, objetivos de negócio</li>
                <li>Informações de navegação: cookies, endereço IP, comportamento no site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Uso das Informações</h2>
              <p className="mb-2">Utilizamos suas informações para:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Fornecer e melhorar nossos serviços de Marketing Digital, Tráfego Pago, Desenvolvimento de Sites e Agentes de IA</li>
                <li>Entrar em contato para apresentação de propostas comerciais</li>
                <li>Personalizar sua experiência e oferecer soluções adequadas ao seu negócio</li>
                <li>Enviar comunicações sobre nossos serviços e atualizações relevantes</li>
                <li>Analisar o desempenho de nossas campanhas e estratégias</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Compartilhamento de Dados</h2>
              <p>
                A Rama Digital não vende, aluga ou compartilha suas informações pessoais com terceiros, exceto quando 
                necessário para a prestação de nossos serviços (como plataformas de tráfego pago, hospedagem de sites) 
                ou quando exigido por lei. Todos os parceiros são cuidadosamente selecionados e comprometidos com a 
                proteção de dados.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Segurança dos Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra 
                acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia, controles de acesso 
                e monitoramento contínuo de nossos sistemas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Seus Direitos</h2>
              <p className="mb-2">Você tem direito a:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Acessar seus dados pessoais que mantemos</li>
                <li>Solicitar a correção de informações incorretas</li>
                <li>Solicitar a exclusão de seus dados pessoais</li>
                <li>Revogar o consentimento para uso de seus dados</li>
                <li>Solicitar a portabilidade de seus dados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Cookies</h2>
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site, analisar o 
                tráfego e personalizar conteúdo. Você pode gerenciar suas preferências de cookies nas configurações 
                do seu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Retenção de Dados</h2>
              <p>
                Mantemos suas informações pessoais pelo tempo necessário para cumprir os propósitos descritos nesta 
                política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre alterações 
                significativas através de nosso site ou por e-mail. Recomendamos que você revise esta página 
                regularmente para se manter informado.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Contato</h2>
              <p>
                Para questões sobre esta Política de Privacidade ou sobre como tratamos seus dados pessoais, 
                entre em contato conosco através do WhatsApp: (11) 98255-3815 ou através do formulário de contato 
                em nosso site.
              </p>
            </section>

            <section className="pt-4 border-t border-border">
              <p className="text-sm">
                <strong>Última atualização:</strong> Janeiro de 2025
              </p>
              <p className="text-sm mt-2">
                Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </section>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 text-sm text-muted-foreground">
            <p>© 2024 Desenvolvido por Rama Digital</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidade;
