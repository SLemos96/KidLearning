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
var arrayUsers = [];
var usuarioLogado = [];
var indiceAleatorioPergunta; //usado para gerar um valor aleatório dentro do banco de perguntas
var linkFoto = null;
var valorPergunta = 1;
var qtdAcertos = 0;
var qtdPontos = 0;

function armazenaLinkFoto(res){
	console.log("Chegou aqui!e o link é esse: " + res);
	linkFoto = res;
}

function atualizaData() {
    axios.get('http://rest.learncode.academy/api/KidLearning/data')
        .then(function (response) {
            console.log(response);
            idPergunta = response.data[indiceAleatorioPergunta]._idPergunta;
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
		if ($('input[name=resposta]:checked', '#formResposta').val() == arrayPerguntas[indiceAleatorioPergunta].alterativaCorreta) {
			alert("Alternativa correta!");
			valorPergunta++;
			qtdAcertos++;
			if(valorPergunta < 6){
				inserirPergunta();
			} else{
				//contaPontuacao();
				$( "#botaoCheck" ).attr( "href", "telaDeEsperaResultadoCR.html" );
				document.querySelector('#acertos').textContent = qtdAcertos;
			}
		}
		else{
			alert("Alternativa errada!");
			valorPergunta++;
			if(valorPergunta < 6){
				inserirPergunta();
			} else{
				//contaPontuacao(getTempo());
				$( "#botaoCheck" ).attr( "href", "telaDeEsperaResultadoCR.html" );
				document.getElementById("acertos").innerHTML = qtdAcertos;
			}
		}
	}
}

function testCorretudeMC(){
	if($('input[name=resposta]:checked', '#formResposta').val() == null)
	{
		alert("Por favor, insira uma resposta correta!");
		$( "#botaoCheck" ).attr( "href", "#" );
	}
	else
	{
		if ($('input[name=resposta]:checked', '#formResposta').val() == arrayPerguntas[indiceAleatorioPergunta].alterativaCorreta) {
			alert("Alternativa correta!");
			$( "#botaoCheck" ).attr( "href", "inicio.html" );
			document.querySelector('#acertos').textContent = qtdAcertos;
		}
		else{
			alert("Alternativa errada!");
			$( "#botaoCheck" ).attr( "href", "inicio.html" );
			document.getElementById("acertos").innerHTML = qtdAcertos;
		}
	}
}

function inserirPontoAcertos(){
	document.getElementById("acertos").innerHTML = qtdAcertos;
	document.getElementById("pontuacao").innerHTML = qtdPontos;
}

function testAlert(){
	if($('input[name=resposta]:checked', '#formResposta').val() == null)
	{
		alert("Por favor, insira uma resposta correta!");
		$( "#botaoCheck" ).attr( "href", "#" );
	}
	else
	{
		if ($('input[name=resposta]:checked', '#formResposta').val() == arrayPerguntas[indiceAleatorioPergunta].alterativaCorreta) {
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
	//não aprovando a pergunta;
}

function aprova(){
	alert("Você aprovou a pergunta! Obrigado pela colaboração! Equipe #KL");
	root = arrayPerguntas.id;
	popPergunta += arrayPerguntas[indiceAleatorioPergunta].popularidadePergunta;

	axios.get('http://rest.learncode.academy/api/KidLearning/perguntas/')
        .then(function (response) {
            console.log(response);
            arrayPerguntas = response.data;
            console.log(arrayPerguntas[indiceAleatorioPergunta]);
        })
        .catch(function (error) {
            console.log(error);
        });

	$.ajax({
	  type: 'PUT',
	  data: {
	  	_id: String(idPergunta),
	    pergunta: arrayPerguntas[indiceAleatorioPergunta].pergunta,
	    alternativa1: arrayPerguntas[indiceAleatorioPergunta].alternativa1,
	    alternativa2: arrayPerguntas[indiceAleatorioPergunta].alternativa2,
	    alternativa3: arrayPerguntas[indiceAleatorioPergunta].alternativa3,
	    alternativa4: arrayPerguntas[indiceAleatorioPergunta].alternativa4,
	    alterativaCorreta: arrayPerguntas[indiceAleatorioPergunta].alterativaCorreta, //valor da alternativa correta
	    popularidadePergunta: popPergunta,
	    foto: arrayPerguntas[indiceAleatorioPergunta].foto
	  },
	  url: 'http://rest.learncode.academy/api/KidLearning/perguntas/'+ String(arrayPerguntas[indiceAleatorioPergunta].id),
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

	//foto = document.formCadastro.foto.value;
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
			if(linkFoto == null){
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
	_foto = linkFoto;
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
	  url: 'http://rest.learncode.academy/api/KidLearning/data/59360ba6704f430100a99a65',
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
            arrayUsers = response.data; //local onde ficam armazenados os dados de /users
            console.log(arrayUsers);
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

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
          window.location.replace("./inicio.html");
          
        }
    }, 1000);
}

function inserirPergunta(){
	contaPerguntas();
	axios.get('http://rest.learncode.academy/api/KidLearning/perguntas/')
        .then(function (response) {
            console.log(response);
            document.getElementById("pergunta").innerHTML = valorPergunta + ". " + response.data[indiceAleatorioPergunta].pergunta;
            document.getElementById("alt1").innerHTML = response.data[indiceAleatorioPergunta].alternativa1;
            document.getElementById("alt2").innerHTML = response.data[indiceAleatorioPergunta].alternativa2;
            document.getElementById("alt3").innerHTML = response.data[indiceAleatorioPergunta].alternativa3;
            document.getElementById("alt4").innerHTML = response.data[indiceAleatorioPergunta].alternativa4;
            document.getElementById("fotoPergunta").src = response.data[indiceAleatorioPergunta].foto;
            arrayPerguntas = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });

    if(valorPergunta == 1){
	    var display = document.querySelector('#time');
	    startTimer(30, display);
    }
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
}

function contaPontuacao(_tempoRestante){
	qtdPontos = (qtdAcertos * 300) - ((5 - qtdAcertos) * 50);

	qtdPontos -= ((30 - _tempoRestante) * 50);
	if(qtdPontos < 0){
		qtdPontos = 0;
	}
	document.querySelector('#pontuacao').textContent = qtdPontos;
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

function testCadastroUsuario(){
	nome = document.formLogin.nome.value;
	username = document.formLogin.uname.value;
	password = document.formLogin.psw.value;
	email = document.formLogin.email.value;
	instituicao = document.formLogin.instituicao.value;

	//foto = document.formCadastro.foto.value;
	if(nome == "" || username == "" || password == "" || email == "" || instituicao == "")
	{
		alert("Por favor, insira os dados corretamente!");
		$( "#btLogin" ).attr( "href", "#" );
	}
	else
	{
		if($('input[name=categorias]:checked', '#formLogin').val() == null){
			alert("Por favor, insira uma categoria!");
			$( "#btLogin" ).attr( "href", "#" );
		}
		else{
			carregaDadosCadUsuario(); //chamando a função de cadastrar a pergunta;
		}
	}
}

function carregaDadosCadUsuario(){
	/*_pergunta = document.formLogin.question.value;
	_alternativa1 = document.formLogin.alt1.value;
	_alternativa2 = document.formLogin.alt2.value;
	_alternativa3 = document.formLogin.alt3.value;
	_alternativa4 = document.formLogin.alt4.value;
	_alterativaCorreta = $('input[name=categorias]:checked', '#formLogin').val();*/

	nome = document.formLogin.nome.value;
	username = document.formLogin.uname.value;
	password = document.formLogin.psw.value;
	email = document.formLogin.email.value;
	instituicao = document.formLogin.instituicao.value;
	categoria = $('input[name=categorias]:checked', '#formLogin').val();

	var Bdate = document.getElementById('bday').value;
    var Bday = +new Date(Bdate);

    idade = ~~ ((Date.now() - Bday) / (31557600000));

    console.log("Nome: "+ nome);
    console.log("\nUsername: "+ username);
    console.log("\npassword: "+ password);
    console.log("\nemail: "+ email);
    console.log("\ninstituicao: "+ instituicao);
    console.log("\ncategoria: "+ categoria);
    console.log("\nidade: "+ idade);
    alert("Pausa rápuda");


	cadastraUsuario(nome, username, password, email, instituicao, categoria, idade);
}

function cadastraUsuario(_nome, _uname, _psw, _email, _instituicao, _cat, _idade){ //http://rest.learncode.academy/api/KidLearning/perguntas/

	atualizaDados();
	atualizaData();

	axios.post('http://rest.learncode.academy/api/KidLearning/users', {
	    _id: String(idPergunta),
	    nome: _nome,
	    username: _uname,
	    password: _psw,
	    email: _email,
	    idade: _idade,
	    categoria: _cat, //valor da alternativa correta
	    instituicao: _instituicao
  }).then(function (response) {
	  	idPergunta++;
	  	console.log(idPergunta);
	    window.location.href="./login.html"
  });
  atualizaDados();
}

function testLogin(){
	var logged = 0;
	var username = document.formLogin.uname.value;
	var senha = document.formLogin.psw.value;
	if(username == "" || senha == "")
	{
		if(senha == "")
		{
			alert("Insira sua senha corretamente");
			alert(arrayUsers.length);
		}

		if(username == "")
		{
			alert("Insira seu username corretamente");
		}
	}
	else{
		for (var i = 0; i < arrayUsers.length; i++) {
			if(arrayUsers[i].username == username && arrayUsers[i].password == senha)
			{
				usuarioLogado = arrayUsers[i];
				console.log(usuarioLogado.nome);
				alert("LOGIN");
				logged = 1;
				window.location.replace("./inicio.html?id="+usuarioLogado.id);
			}
		};
		if(logged == 0){
			alert("Usuário não encontrado!");
		}
	}
}


// código obtido no site: https://forum.imasters.com.br/topic/315478-recuperar-um-valor-com-javascript/
function QS(nome_variavel)
{
	var location = new String(window.location);
	var query_string = location.split('?')[1];
	if (nome_variavel)
	{
		if (query_string)
		{
			var retorno = new Array();
			var variaveis = query_string.split('&');
			for (i=0; i<variaveis.length; i++)
			{
				var chave = new String(variaveis[i].split('=')[0]);
				if (chave == nome_variavel)
				{
					return variaveis[i].split('=')[1];
				}
			}
			return false;
		}
		else
		{
			return false;
		}
	}
	else
	{
		return false;
	}
}

function pegaUsuario(){
	//document.getElementById("nomeUser").innerHTML = usuarioLogado.nome;
	var id = QS('id');
	axios.get('http://rest.learncode.academy/api/KidLearning/users/'+id)
        .then(function (response) {
            usuarioLogado = response.data;
            console.log(usuarioLogado.nome);
            preencheIncio();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function preencheIncio(){
	document.getElementById("nomeUser").innerHTML = usuarioLogado.nome;
}