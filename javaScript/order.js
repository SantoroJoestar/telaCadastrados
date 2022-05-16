const DOM = {
    tabela: document.querySelector(".tabela"),
    corpoTabela: document.querySelector(".corpoTabela"),
    botaoRender: document.getElementById("render-table"),
    botaoNomeAsc: document.getElementById("nome-asc"),
    botaoNomeDesc: document.getElementById("nome-desc"),
    botaoSobrenomeDesc: document.getElementById("sobrenome-desc"),
    botaoSobrenomeAsc: document.getElementById("sobrenome-asc"),
    botaoEmailDesc: document.getElementById("email-desc"),
    botaoEmailAsc: document.getElementById("email-asc"),
    campoFiltro: document.querySelector(".busca"),
    usuarios: document.querySelectorAll(".usuario"),
    tdNome: document.querySelector(".nome"),
    tdBotao: $("tdBotao"),
    botaoPegarNome: $("botaoPegarNome"),
}


const Utils = {
    sortDesc: function (identificador, array) {
        const arrayOrdenado = array.sort(function (a, b) {
            return a[identificador] > b[identificador] ? -1 : true
        });

        return arrayOrdenado;
    },
    sortAsc: function (identificador, array) {
        const arrayOrdenado = array.sort(function (a, b) {
            return a[identificador] < b[identificador] ? -1 : true
        });

        return arrayOrdenado;
    },

}

const App = {
    getNomes: function () {
        const nomesLabels = document.querySelectorAll("label[name='nome']");
        const nomesArray = Array.from(nomesLabels).map(label => label.innerText.trim())
        return nomesArray;
    },
    getSobrenomes: function () {
        const sobrenomesTD = document.querySelectorAll("td[name='sobrenome']");
        const sobrenomesArray = Array.from(sobrenomesTD).map(td => td.innerText.trim());
        return sobrenomesArray;
    },
    getEmails: function () {
        const emailsTD = document.querySelectorAll("td[name='email']");
        const emailsArray = Array.from(emailsTD).map(td => td.innerText.trim());
        return emailsArray;
    },
    getUsuarios: function () {
        const usuarios = [];

        const nomes = App.getNomes();
        const sobreNomes = App.getSobrenomes();
        const emails = App.getEmails();

        for (let i = 0; i < nomes.length; i++) {
            usuarios.push({
                nome: nomes[i],
                sobrenome: sobreNomes[i],
                email: emails[i]
            })
        }

        return usuarios;
    },
    createNomeTD: function (nome) {
        const nomeTD = document.createElement("td");
        const nomeLabel = document.createElement("label")

        nomeLabel.setAttribute("name", "nome");
        nomeLabel.classList.add("nome");

        const nomeCheckbox = document.createElement("input")
        nomeCheckbox.setAttribute("type", "checkbox");
        nomeCheckbox.classList.add("checkbox");

        console.log(nomeCheckbox)

        nomeLabel.appendChild(nomeCheckbox);
        nomeLabel.appendChild(document.createTextNode(nome));

        nomeTD.appendChild(nomeLabel);

        return nomeTD;
    },

    createSobrenomeTD: function (sobrenome) {
        const sobrenomeTd = document.createElement("td");

        sobrenomeTd.setAttribute("name", "sobrenome");
        sobrenomeTd.classList.add("sobrenome");

        sobrenomeTd.appendChild(document.createTextNode(sobrenome));

        return sobrenomeTd;

    },

    createEmailTD: function (email) {
        const emailTd = document.createElement("td");

        emailTd.setAttribute("name", "email");
        emailTd.classList.add("email");

        emailTd.appendChild(document.createTextNode(email));

        return emailTd;
    },

    createBotaoTd: function(){
        const botaoTd = $("tdBotao");

        botaoTd.classList.add("tdBotao");

        botaoTd.td.appendChild();

        console.log(botaoTd);

        return botaoTd;
    },

    render: function (usuarios) {
        DOM.corpoTabela.innerHTML = "";

        for (let i = 0; i < usuarios.length; i++) {
            const usuarioTr = document.createElement("tr");

            const nomeTd = App.createNomeTD(usuarios[i].nome);
            const sobrenomeTd = App.createSobrenomeTD(usuarios[i].sobrenome);
            const emailTd = App.createEmailTD(usuarios[i].email);

            usuarioTr.appendChild(nomeTd);
            usuarioTr.appendChild(sobrenomeTd);
            usuarioTr.appendChild(emailTd);

            DOM.corpoTabela.appendChild(usuarioTr);
        }

    },
    
    initialize: function () {
        DOM.botaoRender.addEventListener("click", function (event) {
            event.preventDefault();

            const usuarios = App.getUsuarios();
            App.render(usuarios)
        })

        DOM.botaoNomeAsc.addEventListener("click", function (event) {
            event.preventDefault();

            const usuarios = App.getUsuarios();

            console.log(usuarios)

            const usuariosOrdenados = Utils.sortAsc("nome", usuarios);

            App.render(usuariosOrdenados)
        })

        DOM.botaoNomeDesc.addEventListener("click", function (event) {
            event.preventDefault();

            const usuarios = App.getUsuarios();

            const usuariosOrdenados = Utils.sortDesc("nome", usuarios);

            App.render(usuariosOrdenados);
        })

        DOM.botaoSobrenomeDesc.addEventListener("click", function (event) {
            event.preventDefault();

            const usuarios = App.getUsuarios();

            const usuariosOrdenados = Utils.sortDesc("sobrenome", usuarios);

            App.render(usuariosOrdenados);
        })

        DOM.botaoSobrenomeAsc.addEventListener("click", function(event){
            event.preventDefault();

            const usuarios = App.getUsuarios();

            const usuariosOrdenados = Utils.sortAsc("sobrenome", usuarios);

            App.render(usuariosOrdenados);
        })
        
        DOM.botaoEmailDesc.addEventListener("click", function(event){
            event.preventDefault();

            const usuarios = App.getUsuarios();

            const usuariosOrdenados = Utils.sortDesc("email", usuarios);

            App.render(usuariosOrdenados);
        })

        DOM.botaoEmailAsc.addEventListener("click", function(event){
            event.preventDefault();

            const usuarios = App.getUsuarios();

            const usuariosOrdenados = Utils.sortAsc("email", usuarios);

            App.render(usuariosOrdenados);
        })

        DOM.campoFiltro.addEventListener("input", function(event){
            event.preventDefault();
            
            console.log(this.value);

            if(this.value.length > 0){
                for(var i = 0; i < DOM.usuarios.length; i++){
                    var usuarioListado = DOM.usuarios[i];
                    var nome = DOM.tdNome.textContent;
                    if(nome != this.value){
                        usuarioListado.classList.add("invisivel");
                    }else{
                        usuarioListado.classList.remove("invisivel");
                    }
                }
            }else{
                for (var i = 0; i < DOM.usuarios.length; i++){
                    var usuarioListado = DOM.usuarios[i];
                    usuarioListado.classList.remove("invisivel");
                }
            }

           
        })
    }
}

App.initialize();