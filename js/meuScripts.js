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
	alert("Teste");
}

function naoAprova(){
	alert("Você não aprovou a pergunta! Obrigado pela colaboração! Equipe #KL");
}

function aprova(){
	alert("Você aprovou a pergunta! Obrigado pela colaboração! Equipe #KL");
}