# Sample Hardhat Project
## This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

VSCODE | extension: Solidity [Nomic Foundation] <br>
Windows 10 | WSL2 | Ubuntu 22.04 <br><br>

<p>1. Preparando o Ambiente
Crie um arquivo: Salve o código JavaScript em um arquivo com a extensão .js.

Abra o terminal: Use o terminal integrado do VS Code (Ctrl + ).

Certifique-se de ter o Node.js instalado: O Node.js é o ambiente de tempo de execução que permite executar JavaScript fora de um navegador. Se você seguiu as instruções anteriores para o WSL2, ele já deve estar instalado. Para confirmar, execute:

### node -v   <br> <br> <br>
</p>
<p>
2. Executando o Código
Para executar o arquivo paylink.js, basta usar o comando node seguido do nome do arquivo.


### node paylink.js 
</p><br> <br> <br>

<p>
3. Exemplo Prático de Execução
Supondo que você salvou o código em paylink.js, o processo seria este:

Navegue até o diretório onde o arquivo está salvo.

No seu terminal, execute:

### node paylink.js  <br>
Você verá a saída do código no terminal, mostrando os resultados das interações com o "contrato":

Link com ID 'link1' adicionado/atualizado por 0x123.... <br>
Link sem acesso: { url: '', owner: '0x123...', fee: 10 }<br>
Pagamento de 10 realizado por 0x456... para o link 'link1'.<br>
Valor de 9 seria transferido para o dono do link.<br>
Link com acesso: { url: 'https://exemplo.com', owner: '0x123...', fee: 10 }
