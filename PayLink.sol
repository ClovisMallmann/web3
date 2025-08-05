    // SPDX-Licence-Identifier: MIT

    //O mesmo codigo porém em solidity


    //O que teremos
    // url
    // owner - dono do link
    // fee - taxa
    // id

pragma solidity ^0.8.30;

contract LinkShield {

    struct Link {
        string url;
        address owner; // tipo endereço porque é o endereço na blockchain
        uint256 fee; //positivos  e comprimento grande para finanças

    }

    uint256 public commission = 1; //comissao pela transação, serviço
    mapping (string => Link) private links; //coleção criada
    //coleção de usuarios e permissões
    mapping(string => mapping(address => bool)) public hasAccess;
    
    function addLink(string calldata url, string calldata linkId, uint256 fee) public {
        //calldata - memoria para somente leitura

        Link memory link =  links[linkId];

        require(link.owner == address(0) || link.owner == msg.sender, "This linkId alread has an owner");
        //Cobrança  deve ser superior a comissão
        require(fee == 0 || fee >= commission, "Fee very low");


        link.url = url;
        link.fee = fee;
        link.owner = msg.sender;

        links[linkId] = link;
        hasAccess[linkId][msg.sender] = true;

    }

    //função de leitura, modificador "view"
    function getLink(string calldata linkId) public view returns (Link memory){
        Link memory link = links[linkId];
        if(link.fee == 0) return link;
        if(hasAccess[linkId][msg.sender] == false)
            link.url = "";
      
        return link;
    }

    //Pagamento

    function payLink(string calldata linkId) public payable {
        Link memory link = links[linkId];

        //verirficar se o link existe
        require(link.owner != address(0), "Link not found");
        //verificar se a pessoa já não tem acesso para evitar pagamento duplicado
        require(hasAccess[linkId][msg.sender] == false, "You already have access" );
        //se o usuario pagou corretamente pelo link
        require(msg.value >= link.fee, "unsuficient payment");

        //verificações realizadas, logo...
        hasAccess[linkId][msg.sender] = true;

        //tranferir o pagamento ao dono do link
        payable(link.owner).transfer(msg.value - commission);

    }

}
