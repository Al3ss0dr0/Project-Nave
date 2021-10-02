function start() { // Inicio da fun��o start()

	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2' class='anima2'></div>");
	$("#fundoGame").append("<div id='placar'></div>");
	$("#fundoGame").append("<div id='energia'></div>");
	
//Principais vari�veis do jogo

var podeAtirar=true;
var podeAtirar2=true;
var fimdejogo=false;
var pontos=0;
var somDisparo=document.getElementById("somDisparo");
var somDisparo2=document.getElementById("somDisparo2");
var somExplosao=document.getElementById("somExplosao");
var musica=document.getElementById("musica");
var somGameover=document.getElementById("somGameover");
var distancia=0;
var energiaAtual=3;
var jogo = {};
var velocidade=5;
var posicaoY = parseInt(Math.random() * 334);
var TECLA = {

	W: 87,
	S: 83,
	F: 70, //disparo//
	D: 68,
	A: 65,
	R: 82, //disparo2//
	}

	jogo.pressionou = [];

//M�sica em loop
musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
musica.play();

	//Verifica se o usu�rio pressionou alguma tecla	
	
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
		});
	
	
		$(document).keyup(function(e){
		jogo.pressionou[e.which] = false;
		});

	
	
//Game Loop

jogo.timer = setInterval(loop,30);

function loop() {

movefundo();
movejogador();
moveinimigo1();
moveinimigo2();
colisao();
placar();
energia();




//Fun��o que movimenta o fundo do jogo
	
function movefundo() {
	
	esquerda = parseInt($("#fundoGame").css("background-position"));
	$("#fundoGame").css("background-position",esquerda-8);
	
	} // fim da fun��o movefundo()

	function movejogador() {
	
		if (jogo.pressionou[TECLA.W]) {
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo-15);

			if (topo<=0) {
		
			$("#jogador").css("top",topo+10);
			}
		}
		
		if (jogo.pressionou[TECLA.S]) {
			
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo+15);
			
			if (topo>=434) {	
			
			$("#jogador").css("top",topo-10);		
			}
		}
		
		if (jogo.pressionou[TECLA.F]) {
			
			//Chama fun��o Disparo	
			disparo();
		}

		if (jogo.pressionou[TECLA.R]) {
			
			//Chama fun��o Disparo	
			disparo2();
		}

		if (jogo.pressionou[TECLA.D]) {

			var left = parseInt($("#jogador").css("left"));
			$("#jogador").css("left",left+10);

			if (left>=770) {
		
			$("#jogador").css("left",left-10);
			}
		}

		if (jogo.pressionou[TECLA.A]) {

			var left = parseInt($("#jogador").css("left"));
			$("#jogador").css("left",left-10);

			if (left<=0) {
		
			$("#jogador").css("left",left+10);
			}
			
		}
	
		} // fim da fun��o movejogador()
		

		function moveinimigo1() {
            
			distancia++;
			posicaoX = parseInt($("#inimigo1").css("left"));
			$("#inimigo1").css("left",posicaoX-13,velocidade);
			$("#inimigo1").css("top",posicaoY);
				
			if (posicaoX<=0) {
			gameOver();
				
			posicaoY = parseInt(Math.random() * 399);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);
					
			}
		
		} //Fim da fun��o moveinimigo1()

		function moveinimigo2() {
     
			distancia++;
		    posicaoX = parseInt($("#inimigo2").css("left"));
		    $("#inimigo2").css("left",posicaoX-10);
					
		    if (posicaoX<=0) {
			gameOver();
				
		    $("#inimigo2").css("left",720);
						
		    }
        
		
	    } // Fim da fun��o moveinimigo2()

		function disparo() {
	
			if (podeAtirar==true) {
				somDisparo.play();
				
			podeAtirar=false;
			
			topo = parseInt($("#jogador").css("top"))
			posicaoX= parseInt($("#jogador").css("left"))
			tiroX = posicaoX + 190;
			topoTiro=topo+25;
			$("#fundoGame").append("<div id='disparo'></div");
			$("#disparo").css("top",topoTiro);
			$("#disparo").css("left",tiroX);
			
			var tempoDisparo=window.setInterval(executaDisparo, 10);
			
			} //Fecha podeAtirar
		 
				   function executaDisparo() {
				posicaoX = parseInt($("#disparo").css("left"));
				$("#disparo").css("left",posicaoX+15); 
		
					if (posicaoX>1500) {
								
					window.clearInterval(tempoDisparo);
					tempoDisparo=null;
					$("#disparo").remove();
					podeAtirar=true;
							
				}
			} // Fecha executaDisparo()
		} // Fecha disparo()

		function disparo2() {
	
			if (podeAtirar2==true) {
				somDisparo2.play();
				somDisparo.play();
				
			podeAtirar2=false;
			
			topo = parseInt($("#jogador").css("top"))
			posicaoX= parseInt($("#jogador").css("left"))
			tiroX = posicaoX + 40;
			topoTiro=topo-80;
			$("#fundoGame").append("<div id='disparo2'></div");
			$("#disparo2").css("top",topoTiro);
			$("#disparo2").css("left",tiroX);
			
			var tempoDisparo=window.setInterval(executaDisparo, 1);
			
			} //Fecha podeAtirar
		 
				   function executaDisparo() {
				posicaoX = parseInt($("#disparo2").css("left"));
				$("#disparo2").css("left",posicaoX+1); 
		
					if (posicaoX>800) {
								
					window.clearInterval(tempoDisparo);
					tempoDisparo=null;
					$("#disparo2").remove();
					podeAtirar2=true;
							
				}
			} // Fecha executaDisparo()
		} // Fecha disparo()	

		function colisao() {
			var colisao1 = ($("#jogador").collision($("#inimigo1")));
			var colisao2 = ($("#jogador").collision($("#inimigo2")));
            var colisao3 = ($("#disparo").collision($("#inimigo1")));
            var colisao4 = ($("#disparo").collision($("#inimigo2")));
			var colisao5 = ($("#disparo2").collision($("#inimigo1")));
            var colisao6 = ($("#disparo2").collision($("#inimigo2")));
			
			
			// jogador com o inimigo1
				
			if (colisao1.length>0) {
			

			energiaAtual--;
			
					
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
			explosao1(inimigo1X,inimigo1Y);
			
			posicaoY = parseInt(Math.random() * 354);
			$("#inimigo1").css("left",1320);
			$("#inimigo1").css("top",posicaoY);

			}


			// jogador com o inimigo2 
			
			if (colisao2.length>0) {

			energiaAtual--;
	
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			explosao2(inimigo2X,inimigo2Y);
						
			$("#inimigo2").remove();
					
			reposicionaInimigo2();
					
			}

			
			// Disparo com o inimigo1
		
	if (colisao3.length>0) {
			
		   pontos=pontos+10;
		   inimigo1X = parseInt($("#inimigo1").css("left"));
		   inimigo1Y = parseInt($("#inimigo1").css("top"));
			
		   explosao1(inimigo1X,inimigo1Y);
		   $("#disparo").css("left",1400);
			
		   posicaoY = parseInt(Math.random() * 334);
		   $("#inimigo1").css("left",1300);
		   $("#inimigo1").css("top",posicaoY);
			
	}

		
// Disparo com o inimigo2
		
	if (colisao4.length>0) {
		
		pontos=pontos+10;
		inimigo2X = parseInt($("#inimigo2").css("left"));
		inimigo2Y = parseInt($("#inimigo2").css("top"));
		$("#inimigo2").remove();
	
		posicaoX = parseInt(Math.random() * 600);
		explosao2(inimigo2X,inimigo2Y);
		$("#disparo").css("left",1320);
		
		reposicionaInimigo2();
			
	}

	// Disparo com o inimigo1
		
	if (colisao5.length>0) {
		

		pontos=pontos+10;
		inimigo1X = parseInt($("#inimigo1").css("left"));
		inimigo1Y = parseInt($("#inimigo1").css("top"));
		 
		explosao1(inimigo1X,inimigo1Y);
		$("#disparo2").css("left",1400);
		 
		posicaoY = parseInt(Math.random() * 334);
		$("#inimigo1").css("left",1300);
		$("#inimigo1").css("top",posicaoY);

		 
 }

	 
  // Disparo com o inimigo2
	 
    if (colisao6.length>0) {
	 
	 pontos=pontos+10;
	 inimigo2X = parseInt($("#inimigo2").css("left"));
	 inimigo2Y = parseInt($("#inimigo2").css("top"));
	 $("#inimigo2").remove();
 
	 posicaoX = parseInt(Math.random() * 600);
	 explosao2(inimigo2X,inimigo2Y);
	 $("#disparo2").css("left",1320);
	 
	 reposicionaInimigo2();
		 
 }
		
	

} //Fim da fun��o colisao()

    

    //Explos�o 1

    function explosao1(inimigo1X,inimigo1Y) {
	somExplosao.play();
	$("#fundoGame").append("<div id='explosao1'></div");
	$("#explosao1").css("background-image", "url(../JogosHTML5/jogo1/imgs/explosao.png)");
	var div=$("#explosao1");
	div.css("top", inimigo1Y);
	div.css("left", inimigo1X);
	div.animate({width:200, opacity:0}, "slow");
	
	var tempoExplosao=window.setInterval(removeExplosao, 1000);
	
	    function removeExplosao() {
			
		   div.remove();
		   window.clearInterval(tempoExplosao);
		   tempoExplosao=null;
			
		}
		
	} // Fim da fun��o explosao1()

	//Reposiciona Inimigo2
	
	function reposicionaInimigo2() {
		somExplosao.play();
		
	
		var tempoColisao4=window.setInterval(reposiciona4, 1000);
			
			function reposiciona4() {
			window.clearInterval(tempoColisao4);
			tempoColisao4=null;
				
				if (fimdejogo==false) {
				
				$("#fundoGame").append("<div id=inimigo2></div");
				
				}
				
			}	
		}
		
		//Explos�o2
	
	function explosao2(inimigo2X,inimigo2Y) {
	somExplosao.play();
	
		$("#fundoGame").append("<div id='explosao2'></div");
		$("#explosao2").css("background-image", "url(../JogosHTML5/jogo1/imgs/explosao.png)");
		var div2=$("#explosao2");
		div2.css("top", inimigo2Y);
		div2.css("left", inimigo2X);
		div2.animate({width:200, opacity:0}, "slow");
		
		var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
		
			function removeExplosao2() {
				
				div2.remove();
				window.clearInterval(tempoExplosao2);
				tempoExplosao2=null;
				
			}
			
			
		} // Fim da fun��o explosao2()

	
} // Fim da fun��o loop()
     
    function placar() {
	
	$("#placar").html("<h2> Pontos: " + pontos + " Distancia: " + distancia + "</h2>");
	
} //fim da fun��o placar()

    //Barra de energia

function energia() {
	
	
	if (energiaAtual==3) {
		
		$("#energia").css("background-image", "url(../JogosHTML5/jogo1/imgs/energia3.png)");
	}

	if (energiaAtual==2) {
		
		$("#energia").css("background-image", "url(../JogosHTML5/jogo1/imgs/energia2.png)");
	}

	if (energiaAtual==1) {
		
		$("#energia").css("background-image", "url(../JogosHTML5/jogo1/imgs/energia1.png)");
	}

	if (energiaAtual==0) {
		
		$("#energia").css("background-image", "url(../JogosHTML5/jogo1/imgs/energia0.png)");
		
		//Game Over
		gameOver();
	}

} // Fim da fun��o energia()

//Fun��o GAME OVER
function gameOver() {
	fimdejogo=true;
	musica.pause();
	somGameover.play();
	
	window.clearInterval(jogo.timer);
	jogo.timer=null;
	
	$("#jogador").remove();
	$("#inimigo1").remove();
	$("#inimigo2").remove();
	
	$("#fundoGame").append("<div id='fim'></div>");
	
	$("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
	
} // Fim da fun��o gameOver();

} // Fim da fun��o start


//Reinicia o Jogo
		
function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();
	start();
	
} //Fim da fun��o reiniciaJogo




