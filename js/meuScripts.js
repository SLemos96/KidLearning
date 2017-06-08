var _pergunta;
var _alternativa1;
var _alternativa2;
var _alternativa3;
var _alternativa4;
var _alterativaCorreta;
var _foto;
var _qualidadePergunta; // variavel referente à aceitação da pergunta
var idPergunta;
var i=0;
var qtdPerguntas; //quantidade de perguntas cadastradas
var arrayPerguntas = [];
var indiceAleatorioPergunta; //usado para gerar um valor aleatório dentro do banco de perguntas

function atualizaData() {
    axios.get('http://rest.learncode.academy/api/KidLearning/data')
        .then(function (response) {
            console.log(response);
            idPergunta = response.data[0]._idPergunta;
            arrayUsers = response; //local onde ficam armazenados os dados de /users
        })
        .catch(function (error) {
            console.log(error);
        });
}

function testCorretude(){
	if($('input[name=resposta]:checked', '#formResposta').val() == null)
	{
		alert("Por favor, insira uma resposta correta!");
		$( "#botaoCheck" ).attr( "href", "#" );
	}
	else
	{
		if ($('input[name=resposta]:checked', '#formResposta').val() == arrayPerguntas[0].alterativaCorreta) {
			alert("Alternativa correta!");
			$( "#botaoCheck" ).attr( "href", "inicio.html" );
		}
		else{
			alert("Alternativa errada!");
			$( "#botaoCheck" ).attr( "href", "inicio.html" );
		}
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
		if ($('input[name=resposta]:checked', '#formResposta').val() == arrayPerguntas[0].alterativaCorreta) {
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
	root = arrayPerguntas.id;
	popPergunta += arrayPerguntas[0].popularidadePergunta;

	axios.get('http://rest.learncode.academy/api/KidLearning/perguntas/')
        .then(function (response) {
            console.log(response);
            arrayPerguntas = response.data;
            console.log(arrayPerguntas[0]);
        })
        .catch(function (error) {
            console.log(error);
        });

	$.ajax({
	  type: 'PUT',
	  data: {
	  	_id: String(idPergunta),
	    pergunta: arrayPerguntas[0].pergunta,
	    alternativa1: arrayPerguntas[0].alternativa1,
	    alternativa2: arrayPerguntas[0].alternativa2,
	    alternativa3: arrayPerguntas[0].alternativa3,
	    alternativa4: arrayPerguntas[0].alternativa4,
	    alterativaCorreta: arrayPerguntas[0].alterativaCorreta, //valor da alternativa correta
	    popularidadePergunta: popPergunta,
	    foto: arrayPerguntas[0].foto
	  },
	  url: 'http://rest.learncode.academy/api/KidLearning/perguntas/'+ String(arrayPerguntas[0].id),
	  success: function() {
	    //no data...just a success (200) status code
	    console.log('Friend Updated Successfully!');
  }
});
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
				carregaDadosPergunta(); //chamando a função de cadastrar a pergunta;
			}
		}
	}
}

function carregaDadosPergunta(){
	_pergunta = document.formCadastro.question.value;
	_alternativa1 = document.formCadastro.alt1.value;
	_alternativa2 = document.formCadastro.alt2.value;
	_alternativa3 = document.formCadastro.alt3.value;
	_alternativa4 = document.formCadastro.alt4.value;
	_alterativaCorreta = $('input[name=alternativas]:checked', '#formCadastro').val();
	_foto = "aaa"; // alterar para inserir o caminho da foto
	cadastraPergunta();
}

function cadastraPergunta(){ //http://rest.learncode.academy/api/KidLearning/perguntas/

	atualizaDados();
	atualizaData();

	axios.post('http://rest.learncode.academy/api/KidLearning/perguntas', {
	    _id: String(idPergunta),
	    pergunta: _pergunta,
	    alternativa1: _alternativa1,
	    alternativa2: _alternativa2,
	    alternativa3: _alternativa3,
	    alternativa4: _alternativa4,
	    alterativaCorreta: _alterativaCorreta, //valor da alternativa correta
	    foto: _foto
  }).then(function (response) {
	  	idPergunta++;
	  	console.log(idPergunta);
	    window.location.href="./inicio.html"
  });
  atualizaDados();
}

function atualizaDados(){ //atualiza quantidade de dados para manter atualizado o id

	console.log("Valor do idPergunta: "+idPergunta+"\n");
    
	$.ajax({
	  type: 'PUT',
	  data: {
	  	_idAlunos: 0, //quantidade de alunos-1
		_idProfesores: 0, //quantidade de professores-1
		_idAvaliadores: 0, //quantidade de avaliadores-1
		_idPergunta: idPergunta
	},
	  url: 'http://rest.learncode.academy/api/johnbob/friends/1',
	  success: function() {
	    //no data...just a success (200) status code
	    console.log('Friend Updated Successfully!');
	  }
	});

	atualizaData();

    /*axios.put('http://rest.learncode.academy/api/KidLearning/data/59360ba6704f430100a99a65', {
		_idAlunos: 0, //quantidade de alunos-1
		_idProfesores: 0, //quantidade de professores-1
		_idAvaliadores: 0, //quantidade de avaliadores-1
		_idPergunta: idPergunta.data
  	})
  	.then(function (response) {
  		console.log("Dados atualizados");
    	console.log(response.data);
  	})
  	.catch(function (error) {
    	console.log(error);
	});*/
}

function carregaUsuarios() {
    axios.get('http://rest.learncode.academy/api/KidLearning/users')
        .then(function (response) {
            console.log(response);
            document.getElementById("usuarios").innerHTML = response.data[1].nome;
            arrayUsers = response; //local onde ficam armazenados os dados de /users
        })
        .catch(function (error) {
            console.log(error);
        });

    axios.get('http://rest.learncode.academy/api/KidLearning/data')
        .then(function (response) {
            console.log(response.data);
            idPergunta = response.data[0]._idPergunta;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function inserirPergunta(){
	axios.get('http://rest.learncode.academy/api/KidLearning/perguntas/')
        .then(function (response) {
            console.log(response);
            document.getElementById("pergunta").innerHTML = response.data[0].pergunta;
            document.getElementById("alt1").innerHTML = response.data[0].alternativa1;
            document.getElementById("alt2").innerHTML = response.data[0].alternativa2;
            document.getElementById("alt3").innerHTML = response.data[0].alternativa3;
            document.getElementById("alt4").innerHTML = response.data[0].alternativa4;
            arrayPerguntas = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function contaPerguntas(){
	i=0;
	qtdPerguntas=0;

	axios.get('http://rest.learncode.academy/api/KidLearning/perguntas/')
        .then(function (response) {
            console.log(response);
            qtdPerguntas = response.data.length;
            arrayPerguntas = response.data;
            geraIndiceAleatorio();
        })
        .catch(function (error) {
            console.log(error);
        });
        //alert(qtdPerguntas);
        
}

function geraIndiceAleatorio(){
	indiceAleatorioPergunta = Math.floor(Math.random() * 10)%qtdPerguntas;
	alert(indiceAleatorioPergunta);
}



/*function alerta(){
	if (arrayUsers.data[i] == null) {
		alert("Acabaram os dados")
		i=0;
		$( "#corpo" ).attr( "onmousemove", "" );
	}
	else{
		alert(arrayUsers.data[i].id);
		i++;
	}
}*/