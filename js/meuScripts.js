function validarSenha(){
	idade = document.f1.idade.value
 
	if (idade >= 18)
	{
		$(document).ready(function()
		{
			$('span.classeExtra').removeClass("glyphicon-minus");
			$('span.classeExtra2').removeClass(" glyphicon-remove ");
			$('div.classeExtra').removeClass("has-error");
       		$('div.classeExtra').addClass("has-success");
       		$('span.classeExtra2').addClass(" glyphicon-ok ");
		});


		// http://ruancarlos.com.br/Blog/adicionando-linhas-em-uma-tabela-dinamicamente/
		tabelaa = document.getElementById('questao8');

		var novaLinha = tabelaa.insertRow(-1);
        var novaCelula;

        novaCelula = novaLinha.insertCell(0);
        novaCelula.innerHTML = document.f1.nome.value;
        novaCelula = novaLinha.insertCell(1);
        novaCelula.innerHTML = document.f1.idade.value;
        novaCelula = novaLinha.insertCell(2);
        novaCelula.innerHTML = document.f1.sexo.value;
	}
	else
	{
		$(document).ready(function()
		{
			$('span.classeExtra').removeClass("glyphicon-minus");
			$('span.classeExtra2').removeClass(" glyphicon-ok ");
			$('div.classeExtra').removeClass("has-success");
       		$('div.classeExtra').addClass("has-error");
       		$('span.classeExtra2').addClass(" glyphicon-remove ");
		});
	}
}

function testAlert(){
	if($('input[name=resposta]:checked', '#formResposta').val() == null)
	{
		alert("Por favor, insira uma resposta correta!");
		$( "#botaoCheck" ).attr( "href", "#" );
	}
	else
	{
		if ($('input[name=resposta]:checked', '#formResposta').val() == "alt3") {
			alert("Alternativa correta!");
			$( "#botaoCheck" ).attr( "href", "avaliacaoPergunta.html" );
		}
		else{
			alert("Alternativa errada!");
			$( "#botaoCheck" ).attr( "href", "avaliacaoPergunta.html" );
		}
	}
}

function naoAprova(){
	alert("Você não aprovou a pergunta! Obrigado pela colaboração! Equipe #KL");
}

function aprova(){
	alert("Você aprovou a pergunta! Obrigado pela colaboração! Equipe #KL");
}

function testCadastroPergunta(){
	pergunta = document.formCadastro.question.value;
	alternativa1 = document.formCadastro.alt1.value;
	alternativa2 = document.formCadastro.alt2.value;
	alternativa3 = document.formCadastro.alt3.value;
	alternativa4 = document.formCadastro.alt4.value;

	foto = document.formCadastro.foto.value;
	if(pergunta == "" || alternativa1 == "" || alternativa2 == "" || alternativa3 == "" || alternativa4 == "")
	{
		alert("Por favor, insira os dados corretamente!");
		$( "#botaoConfirmaCadastro" ).attr( "href", "#" );
	}
	else
	{
		if($('input[name=alternativas]:checked', '#formCadastro').val() == null){
			alert("Por favor, insira uma alternativa de resposta!");
			$( "#botaoConfirmaCadastro" ).attr( "href", "#" );
		}
		else{
			if(foto == ""){
				alert("Por favor, insira uma foto correspondente!");
				$( "#botaoConfirmaCadastro" ).attr( "href", "#" );
			}
			else{
				cadastraPergunta(); //chamando a função de cadastrar a pergunta;
				
			}
		}
	}
}

function carregaUsuarios() {
    axios.get('http://rest.learncode.academy/api/KidLearning/users')
        .then(function (response) {
            console.log(response);
            document.getElementById("usuarios").innerHTML = response.data[1].nome;
            array = response;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function carregaBanco(){ //função pra preencher o banco de dados caso ele seja apagado

}

var idPergunta = 0;

function cadastraPergunta(){ //http://rest.learncode.academy/api/KidLearning/perguntas/
	alert("aa");
	axios.post('http://rest.learncode.academy/api/KidLearning/perguntas', {
		_id: idPergunta,
    	pergunta: 'Qual cor da maçã vista na foto?',
    	alternativa1: 'Azul',
    	alternativa2: 'Rosa',
    	alternativa3: 'Amarela',
    	alternativa4: 'Vermelha',
    	alterativaCorreta: 'alt4', //valor da alternativa correta
    	foto: 'teste'
  	})
  	.then(function (response) {
    	console.log(response);
    	$( "#botaoConfirmaCadastro" ).attr( "href", "inicio.html" );
		alert("Pergunta cadastrada com sucesso! Equipe #KL");})
  	.catch(function (error) {
    	console.log(error);
  	});
  	alert("bb");
}

var i=0;

function alerta(){
	if (array.data[i] == null) {
		alert("Acabaram os dados")
		i=0;
	}
	else{
		alert(array.data[i].id);
		i++;
	}
}