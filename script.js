document.getElementById('policyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generatePolicy();
});

function generatePolicy() {
    const appName = document.getElementById('appName').value;
    const companyName = document.getElementById('companyName').value;
    const email = document.getElementById('email').value;
    const website = document.getElementById('website').value || 'Não aplicável';
    const country = document.getElementById('country').value;
    
    const dataCheckboxes = document.querySelectorAll('input[name="data"]:checked');
    const collectedData = Array.from(dataCheckboxes).map(cb => cb.value);
    
    let policy = `Política de Privacidade - ${appName}

Última atualização: ${new Date().toLocaleDateString('pt-BR')}

1. INFORMAÇÕES GERAIS

O aplicativo "${appName}" ("nós", "nosso") é desenvolvido por ${companyName}. Esta Política de Privacidade descreve como coletamos, usamos e compartilhamos suas informações quando você usa nosso aplicativo.

2. DADOS COLETADOS

Coletamos os seguintes tipos de informações:`;

    // Adiciona dados coletados
    collectedData.forEach(data => {
        switch(data) {
            case 'nome':
                policy += '\n- Informações de identificação pessoal (nome)';
                break;
            case 'email':
                policy += '\n- Endereço de e-mail';
                break;
            case 'localizacao':
                policy += '\n- Dados de localização (quando permitido)';
                break;
            case 'dispositivo':
                policy += '\n- Informações do dispositivo (modelo, sistema operacional)';
                break;
            case 'uso':
                policy += '\n- Dados de uso do aplicativo';
                break;
        }
    });

    policy += `

3. COMO USAMOS SEUS DADOS

- Para fornecer e manter nosso serviço
- Para notificá-lo sobre alterações no aplicativo
- Para permitir a participação em recursos interativos
- Para fornecer suporte ao cliente
- Para coletar análise ou informações valiosas
- Para detectar, prevenir e resolver problemas técnicos

4. COMPARTILHAMENTO DE DADOS

Não vendemos suas informações pessoais. Podemos compartilhar dados com:
- Prestadores de serviços que auxiliam na operação do aplicativo
- Autoridades legais quando exigido por lei

5. SEUS DIREITOS

De acordo com a legislação ${getCountryLaw(country)}, você tem direito a:
- Acessar seus dados pessoais
- Corrigir dados imprecisos
- Solicitar a exclusão de dados
- Opor-se ao processamento de dados

6. CONTATO

Para exercer seus direitos ou questions sobre esta política, entre em contato:

E-mail: ${email}
Website: ${website}

7. ALTERAÇÕES NA POLÍTICA

Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre quaisquer alterações publicando a nova Política de Privacidade nesta página.`;

    document.getElementById('policyText').value = policy;
    document.getElementById('result').classList.remove('hidden');
}

function getCountryLaw(country) {
    const laws = {
        'BR': 'LGPD (Lei Geral de Proteção de Dados)',
        'US': 'legislação estadunidense aplicável',
        'EU': 'GDPR (General Data Protection Regulation)'
    };
    return laws[country] || 'local';
}

function copyToClipboard() {
    const policyText = document.getElementById('policyText');
    policyText.select();
    document.execCommand('copy');
    alert('Política copiada para a área de transferência!');
}

function downloadPolicy() {
    const policyText = document.getElementById('policyText').value;
    const appName = document.getElementById('appName').value;
    const blob = new Blob([policyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `politica-privacidade-${appName.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
