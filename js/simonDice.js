/*
JS del Juego SimonDice si quieres probarlo puedes ir a 
https://inesr21.github.io/
hecho por InesR
*/

var nombreJug = prompt('Hola, quieres jugar? Dime tu nombre')

     
          if (nombreJug === null ){
            nombreJug ='Misterioso'
            swal( 'No pusiste tu nombre, asi que te llamaremos Misterioso', 'error', )
            document.getElementById('jugadorNombre').innerHTML = nombreJug
           

          } else if (nombreJug === "") {
            nombreJug ='Misterioso'
            swal( 'No pusiste tu nombre, asi que te llamaremos Misterioso', 'error', )
            document.getElementById('jugadorNombre').innerHTML = nombreJug
            

           
          } else{

          document.getElementById('jugadorNombre').innerHTML = nombreJug
          }
       

          const rojo = document.getElementById('rojo')
        const azul = document.getElementById('azul')
        const amarillo = document.getElementById('amarillo')
        const verde = document.getElementById('verde')
        const btnEmpezar = document.getElementById('btnEmpezar')
        const ultimoNivel = 31
        const audio = document.getElementById('tick')
        const ganar = document.getElementById('gano')
        const perder = document.getElementById('perdio')
        var seconds = 30;
        var intervalId = null;
        var timer = document.getElementById('timer');

        class Juego {
          
          constructor() {
            this.inicializar = this.inicializar.bind(this)
            this.inicializar()
            this.generarSecuencia()
            setTimeout(() => {
            this.siguienteNivel()
            }, 300)
            
          }
          inicializar() {
            this.siguienteNivel = this.siguienteNivel.bind(this)
            this.elegirColor = this.elegirColor.bind(this)
            this.toggleBtnEmpezar()
            this.nivel = 1
            this.colores = {
              rojo,
              azul,
              amarillo,
              verde
            }
            this.iluminando = false;
         
          }
          toggleBtnEmpezar() {
            if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
            } else {
              btnEmpezar.classList.add('hide')
            }
          }
          generarSecuencia() {
            this.secuencia = new Array(ultimoNivel).fill(0).map(n => Math.floor(Math.random() * 4))

          }
          siguienteNivel() {

            this.subnivel = 0
            document.getElementById('numero-nivel').innerHTML = this.nivel;
            this.iluminarSecuencia()
            this.agregarEventosClick()
          }

            transformarNumeroAColor(numero) {
              switch (numero) {
                  case 0:
                    return 'rojo'
                  case 1:
                    return 'azul'
                  case 2:
                    return 'amarillo'
                  case 3:
                    return 'verde'
              }
            }

            transformarColorANumero(color) {
             
              switch (color) {
                  case 'rojo':
                    return 0
                  case 'azul':
                    return 1
                  case 'amarillo':
                    return 2
                  case 'verde':
                    return 3
              }
            }

          iluminarSecuencia() {
            this.iluminando = true;
            for (let i = 0; i< this.nivel; i++) {
                let color = this.transformarNumeroAColor(this.secuencia[i])
                setTimeout(() => this.iluminarColor(color), 400 * i)
            }
          }
          iluminarColor(color) {
            this.colores[color].classList.add('light')
            audio.play();
            setTimeout(() => this.apagarColor(color), 100)
          }
          apagarColor(color) {
            this.colores[color].classList.remove('light')
            this.iluminando = false;
          }
          agregarEventosClick() {
            this.colores.rojo.addEventListener('click', this.elegirColor)
            this.colores.verde.addEventListener('click', this.elegirColor)
            this.colores.azul.addEventListener('click', this.elegirColor)
            this.colores.amarillo.addEventListener('click', this.elegirColor)
          }
          eliminarEventosClick() {
            this.colores.rojo.removeEventListener('click', this.elegirColor)
            this.colores.verde.removeEventListener('click', this.elegirColor)
            this.colores.azul.removeEventListener('click', this.elegirColor)
            this.colores.amarillo.removeEventListener('click', this.elegirColor)
          }
          elegirColor(ev) {
            if(this.iluminando){
                console.log('qui no hace nada')

              }else{

              const nombreColor = ev.target.dataset.color
              const numeroColor = this.transformarColorANumero(nombreColor)
              this.iluminarColor(nombreColor)
                
              if (numeroColor === this.secuencia[this.subnivel]) {
                this.subnivel++
                if (this.subnivel === this.nivel) {
                  this.nivel++
                  this.eliminarEventosClick()
                    if (this.nivel === (ultimoNivel + 1)) {
                        this.gano()
                        console.log("gano")
                      } else {
                        setTimeout(this.siguienteNivel, 700)
                        console.log("siguienteNivel", this.nivel)
                        }
                  }
              } else {
                  this.perdio()
              }
              }
          }

            gano() {
              clearInterval(intervalId);
              ganar.play();
              seconds = 30
              timer.innerHTML = seconds;
              swal('¡Felicitaciones,' + ' ' + nombreJug + ' ' + 'GANASTE! en el nivel ' + ' ' +  this.nivel, '¿Crees que algun amigo lo puede hacer mejor? ¡Compártelo!', 'success', {
              icon: "img/w.png"
              })
              .then(this.inicializar)
              }

            perdio() {
              clearInterval(intervalId);
              perder.play();
              swal('¡Lo siento,' + ' ' + nombreJug + ' ' + 'PERDISTE! en el nivel ' + ' ' +  this.nivel, '¿Crees que algun amigo lo puede hacer mejor? ¡Compártelo!', 'error', {
                icon: "img/p.png"
              })
              .then(() => {
                  this.eliminarEventosClick()
                  this.inicializar()
                  seconds = 30
                  timer.innerHTML = seconds; 
                  
                
                })
            }


          }
        function empezarJuego() {
          var juego = new Juego()
          
          $(".gameboard").click(function (e) {seconds = 30;});
          intervalId = setInterval(function () {segundos(seconds);}, 1000);

          function segundos(e){
            seconds = seconds - 1
            timer.innerHTML = seconds; 
              if (seconds === 0) {
                //console.log(juego, "objeto");
                clearInterval(intervalId);
                juego.perdio()
                }
            }
          }  