from fpdf import FPDF

class BauhausPDF(FPDF):
    def header(self):
        pass

    def footer(self):
        # Footer for all pages except the cover (which will handle its own footer)
        if self.page_no() > 1:
            self.set_y(-15)
            self.set_font("Helvetica", "I", 8)
            self.set_text_color(15, 15, 16) # soft black
            self.cell(0, 10, f"Paulo Daniel Blum | Blum Digital (digitalblum.com) - Página {self.page_no()}", 0, 0, "C")

def generate_pdf():
    pdf = BauhausPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    
    # Colors
    DEEP_TEAL = (31, 77, 69)     # #1F4D45
    MEDIUM_GREEN = (46, 106, 95)  # #2E6A5F
    LIGHT_GRAY = (242, 244, 245)  # #F2F4F5
    SOFT_BLACK = (15, 15, 16)     # #0F0F10
    WHITE = (255, 255, 255)

    # PAGE 1: CAPA
    pdf.add_page()
    pdf.set_fill_color(*LIGHT_GRAY)
    pdf.rect(0, 0, 210, 297, "F")
    
    # Bauhaus geometric elements
    pdf.set_fill_color(*DEEP_TEAL)
    pdf.rect(0, 0, 210, 80, "F") # Top block
    
    pdf.set_fill_color(*MEDIUM_GREEN)
    pdf.rect(20, 100, 5, 100, "F") # Vertical line
    
    # Title
    pdf.set_y(120)
    pdf.set_font("Helvetica", "B", 34)
    pdf.set_text_color(*SOFT_BLACK)
    pdf.multi_cell(0, 15, "Planejamento\nEstratégico de\nPosicionamento Digital", 0, "C")
    
    # Subtitle
    pdf.set_y(180)
    pdf.set_font("Helvetica", "", 18)
    pdf.cell(0, 20, "Preparado para: Ásia Express", 0, 1, "C")
    
    # Footer Capa
    pdf.set_y(-25)
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(0, 10, "Paulo Daniel Blum | Blum Digital (digitalblum.com)", 0, 0, "C")

    # PAGE 2: SOCIAL MEDIA
    pdf.add_page()
    pdf.set_fill_color(*WHITE)
    pdf.rect(0, 0, 210, 297, "F")
    
    # Header Section
    pdf.set_fill_color(*DEEP_TEAL)
    pdf.rect(0, 0, 210, 40, "F")
    pdf.set_y(15)
    pdf.set_font("Helvetica", "B", 20)
    pdf.set_text_color(*WHITE)
    pdf.cell(0, 10, "Social Media (Gestão de Redes Sociais)", 0, 1, "C")
    
    pdf.ln(20)
    pdf.set_text_color(*SOFT_BLACK)
    
    # Plano Essencial
    pdf.set_font("Helvetica", "B", 16)
    pdf.set_text_color(*DEEP_TEAL)
    pdf.cell(0, 10, "Plano Essencial", 0, 1)
    pdf.set_font("Helvetica", "B", 14)
    pdf.cell(0, 8, "R$ 1.000/mês", 0, 1)
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(*SOFT_BLACK)
    pdf.multi_cell(0, 7, "• 8 posts/mês\n• Stories semanais\n• Design e Legendas Estratégicas")
    
    pdf.ln(10)
    
    # Plano Profissional
    pdf.set_font("Helvetica", "B", 16)
    pdf.set_text_color(*DEEP_TEAL)
    pdf.cell(0, 10, "Plano Profissional", 0, 1)
    pdf.set_font("Helvetica", "B", 14)
    pdf.cell(0, 8, "R$ 1.800/mês", 0, 1)
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(*SOFT_BLACK)
    pdf.multi_cell(0, 7, "• 12 posts/mês\n• Stories frequentes\n• 4 Reels com edição Premium\n• Calendário Editorial")
    
    pdf.ln(10)
    pdf.set_font("Helvetica", "I", 10)
    pdf.multi_cell(0, 6, "Nota: Vídeos captados pelo cliente e editados pela Blum Digital.")

    # PAGE 3: GOOGLE E PERFORMANCE
    pdf.add_page()
    pdf.set_fill_color(*DEEP_TEAL)
    pdf.rect(0, 0, 210, 40, "F")
    pdf.set_y(15)
    pdf.set_font("Helvetica", "B", 20)
    pdf.set_text_color(*WHITE)
    pdf.cell(0, 10, "Google e Performance", 0, 1, "C")
    
    pdf.ln(20)
    pdf.set_text_color(*SOFT_BLACK)
    
    # Gestão de Tráfego
    pdf.set_font("Helvetica", "B", 16)
    pdf.set_text_color(*DEEP_TEAL)
    pdf.cell(0, 10, "Gestão de Tráfego (Google Ads)", 0, 1)
    pdf.set_font("Helvetica", "B", 14)
    pdf.cell(0, 8, "R$ 1.000/mês (Valor especial por indicação)", 0, 1)
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(*SOFT_BLACK)
    pdf.multi_cell(0, 7, "• Foco em aparecer no topo das buscas em Criciúma.")
    
    pdf.ln(10)
    
    # Combo de Expansão
    pdf.set_font("Helvetica", "B", 16)
    pdf.set_text_color(*DEEP_TEAL)
    pdf.cell(0, 10, "Combo de Expansão (Plano Gold)", 0, 1)
    pdf.set_font("Helvetica", "B", 14)
    pdf.cell(0, 8, "Setup Único de R$ 1.885", 0, 1)
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(*SOFT_BLACK)
    pdf.multi_cell(0, 7, "• Tour Virtual 360º\n• Site Landing Page\n• Otimização do Google Meu Negócio")
    
    pdf.ln(5)
    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(0, 8, "Manutenção Mensal: R$ 450/mês (Hospedagem + Gestão do Google)", 0, 1)

    # PAGE 4: BÔNUS E FECHAMENTO
    pdf.add_page()
    pdf.set_fill_color(*DEEP_TEAL)
    pdf.rect(0, 0, 210, 40, "F")
    pdf.set_y(15)
    pdf.set_font("Helvetica", "B", 20)
    pdf.set_text_color(*WHITE)
    pdf.cell(0, 10, "Bônus e Fechamento", 0, 1, "C")
    
    pdf.ln(20)
    pdf.set_text_color(*SOFT_BLACK)
    
    # Bônus
    pdf.set_font("Helvetica", "B", 16)
    pdf.set_text_color(*DEEP_TEAL)
    pdf.cell(0, 10, "Bônus Inclusos:", 0, 1)
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(*SOFT_BLACK)
    pdf.multi_cell(0, 8, "• 4 Totens NFC de Avaliação Google\n• 2 Totens de Redes Sociais\n• Linktree Profissional")
    
    pdf.ln(15)
    
    # Super Bônus
    pdf.set_fill_color(*MEDIUM_GREEN)
    pdf.rect(10, pdf.get_y(), 190, 40, "F")
    pdf.set_y(pdf.get_y() + 5)
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(*WHITE)
    pdf.cell(0, 10, "  SUPER BÔNUS:", 0, 1)
    pdf.set_font("Helvetica", "", 14)
    pdf.multi_cell(0, 8, "  Fechando o Combo Completo, ganha Gravação Aérea com\n  Drone da localização no centro.")
    
    pdf.output("Proposta_Asia_Express_Blum.pdf")
    print("PDF gerado com sucesso: Proposta_Asia_Express_Blum.pdf")

if __name__ == "__main__":
    generate_pdf()
