class PayLink {
    constructor() {
        // A comissão é uma variável da classe
        this.commission = 1;

        // O 'mapping' do Solidity é simulado com objetos JavaScript
        // links: { linkId: { url: '', owner: '', fee: 0 } }
        this.links = {};

        // hasAccess: { linkId: { address: true/false } }
        this.hasAccess = {};
    }

    // Função para adicionar um novo link
    addLink(url, linkId, fee, senderAddress) {
        // Simulação do 'require' do Solidity
        const link = this.links[linkId];
        if (link && link.owner !== senderAddress) {
            throw new Error("This linkId already has an owner");
        }

        if (fee !== 0 && fee < this.commission) {
            throw new Error("Fee very low");
        }

        // Se o linkId não existe, inicializa o objeto
        if (!link) {
            this.links[linkId] = {};
        }

        // Atualiza os dados do link
        this.links[linkId].url = url;
        this.links[linkId].fee = fee;
        this.links[linkId].owner = senderAddress;

        // Concede acesso ao criador do link
        if (!this.hasAccess[linkId]) {
            this.hasAccess[linkId] = {};
        }
        this.hasAccess[linkId][senderAddress] = true;

        console.log(`Link com ID '${linkId}' adicionado/atualizado por ${senderAddress}.`);
    }

    // Função para obter o link (simula o 'view' do Solidity)
    getLink(linkId, senderAddress) {
        const link = this.links[linkId];

        // Se o link não existir
        if (!link) {
            console.log("Link não encontrado.");
            return null;
        }

        // Se a taxa for zero, o link é público
        if (link.fee === 0) {
            return {
                url: link.url,
                owner: link.owner,
                fee: link.fee
            };
        }

        // Verifica se o usuário tem acesso
        const hasUserAccess = this.hasAccess[linkId] && this.hasAccess[linkId][senderAddress];
        if (!hasUserAccess) {
            console.log(`Acesso negado para o link '${linkId}'.`);
            return {
                url: "", // Retorna URL vazia se não houver acesso
                owner: link.owner,
                fee: link.fee
            };
        }

        return {
            url: link.url,
            owner: link.owner,
            fee: link.fee
        };
    }

    // Função de pagamento (simula o 'payable' do Solidity)
    payLink(linkId, senderAddress, paidValue) {
        const link = this.links[linkId];

        if (!link) {
            throw new Error("Link not found");
        }

        if (this.hasAccess[linkId] && this.hasAccess[linkId][senderAddress]) {
            throw new Error("You already have access");
        }

        if (paidValue < link.fee) {
            throw new Error("Insufficient payment");
        }

        // Concede acesso após o pagamento
        if (!this.hasAccess[linkId]) {
            this.hasAccess[linkId] = {};
        }
        this.hasAccess[linkId][senderAddress] = true;

        // O valor transferido seria a diferença (pago - comissão)
        const amountToTransfer = paidValue - this.commission;
        
        console.log(`Pagamento de ${paidValue} realizado por ${senderAddress} para o link '${linkId}'.`);
        console.log(`Valor de ${amountToTransfer} seria transferido para o dono do link.`);
    }
}

// Exemplo de uso:
const payLinkContract = new PayLink();
const ownerAddress = "0x123...";
const userAddress = "0x456...";

try {
    // 1. Adicionar um link com taxa
    payLinkContract.addLink("https://exemplo.com", "link1", 10, ownerAddress);

    // 2. Tentar acessar o link (sem pagar)
    const linkInfoSemAcesso = payLinkContract.getLink("link1", userAddress);
    console.log("Link sem acesso:", linkInfoSemAcesso);

    // 3. Pagar pelo link
    payLinkContract.payLink("link1", userAddress, 12);

    // 4. Acessar o link após o pagamento
    const linkInfoComAcesso = payLinkContract.getLink("link1", userAddress);
    console.log("Link com acesso:", linkInfoComAcesso);

} catch (error) {
    console.error("Erro:", error.message);
}