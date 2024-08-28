/* mensagens de erro */

const tiposDeErro = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "tooShort",
    "customError",
]; 

const mensagens = {
    first_name: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
    },
    last_name: {
        valueMissing: "O campo de último nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    message: {
        valueMissing: "O campo de mensagem não pode estar vazio.",
    }
}


/* Funções de validação */


const camposDoFormulario = document.querySelectorAll("[data-elementos-requeridos]");
const formulario = document.querySelector("[data-formulario]");
const botaoEnviar = document.querySelector("[data-botao-enviar]");
const checkCampoRadio = document.querySelectorAll(".form__radio");
const campoRadioMensagens = document.querySelector(".mensagem__erro-radio");
const cabecalho = document.querySelector(".header");


function validarRadio() {
    let checkRadio = false
    checkCampoRadio.forEach((radio) => {
         if(radio.querySelector("input").checked) {
             checkRadio = true;
         }
    })
    if(!checkRadio) {
        campoRadioMensagens.textContent = 'Selecione uma opção';
        return false;
    } else {
        campoRadioMensagens.textContent = '';
        return true;
    }  
}

function validadorDoTermo() {
    const termo = document.getElementById("checkbox");
    const termoMensagens = document.getElementById("termo-erro");

    if(!termo.checked) {
        termoMensagens.textContent = "Por favor, aceite os termos.";
        return false;
    } else {
        termoMensagens.textContent = '';
        return true;
    }
}

function verificaCampo(campo) {
    let mensagemVerificar = "";

    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagemVerificar = mensagens[campo.name][erro];
        }
    })

    const mensagemDeErro = campo.parentNode.querySelector(".mensagem__erro"); 
    const bordaDeErro = campo;

    if(!campo.checkValidity()) {
        mensagemDeErro.textContent = mensagemVerificar;
        bordaDeErro.style.borderColor = 'var(--cor-de-erro)';
    } else{
       mensagemDeErro.textContent = '';
       bordaDeErro.style.borderColor = '';
    }
}


/* FORMULARIO */


camposDoFormulario.forEach((campo) => {
    
    campo.addEventListener("invalid", (e) => e.preventDefault());
    campo.addEventListener("blur", () => verificaCampo(campo));
});

botaoEnviar.addEventListener("click", (evento) => {
    console.log('enviando');
    
    
        evento.preventDefault();
        let validandoCampos = true;
    
        camposDoFormulario.forEach((campo) => {
            if(!campo.checkValidity()) { 
                verificaCampo(campo);
                validandoCampos = false;
            }
        });

        if(!validarRadio()) {
            validandoCampos = false;
        }
        if (!validadorDoTermo()) {
            validandoCampos = false;
        }
    
        if(validandoCampos) {
            cabecalho.style.display = 'block';
        }
});

const campoRadio = document.querySelectorAll("[data-formulario-radio-elemento]");
const formRadio = document.querySelectorAll("[data-formulario-radio]");

campoRadio.forEach((radio) => {
    radio.addEventListener("change", () => {
        if(radio.checked){
            formRadio.forEach((elemento) => {
                if(elemento.id == `radio__${radio.value}`){
                    const pegarElementoAtivo = elemento;
                    pegarElementoAtivo.classList.add("ativo")
                } else{
                    const pegarElementoDesativo = elemento;
                    pegarElementoDesativo.classList.remove("ativo")
                }
            })
        }
    });

    radio.addEventListener("invalid", (e) => e.preventDefault());
});