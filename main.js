const tablero = document.getElementById("tablero");
const desordenBoton = document.getElementById("desorden");
const reloj = document.getElementById("timer");

let img = [
    {
        url:"https://live.staticflickr.com/65535/52001106527_414bda8025_n.jpg",
        id:1,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52002376129_b94dfe2125_n.jpg",
        id:2,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52002122241_47ab591157_m.jpg",
        id:3,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52002183613_afd58294a2_n.jpg",
        id:4,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52002183638_c42f0dd20d_n.jpg",
        id:5,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52002183673_3030c23d46_m.jpg",
        id:6,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52002650500_26b319ae72_m.jpg",
        id:7,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52002376209_a708472796_n.jpg",
        id:8,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52002122316_0db841dc01_n.jpg",
        id:9,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52001106732_fcbd6f9a94_n.jpg",
        id:10,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52002376274_16363763d8_n.jpg",
        id:11,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52002183798_390e4bfc28_n.jpg",
        id:12,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52002650640_27bdb9a0da_n.jpg",
        id:13,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52002183833_6b185721c5_m.jpg",
        id:14,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52002183828_cde67c6594_n.jpg",
        id:15,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52002650675_c1bc473dae_n.jpg",
        id:16,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52002122461_493ca9422c_n.jpg",
        id:17,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52002122486_0bea9fc7b8_m.jpg",
        id:18,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52002650700_704a587b15_n.jpg",
        id:19,
        held:false,
    },
    {
        url:"https://live.staticflickr.com/65535/52001106857_d03e489c14_n.jpg",
        id:20,
        held:false,
    },
]

class Casilla{
    constructor(elemento,valor){
        this.elemento=elemento;
        this.valor=valor;
        this.selected=false;
        this.held=false;
    }
    cambiarStado(){
        this.held=!this.held;
    }
}

let objetos=[];
for(let i=1;i<41;i++){
    let elem = document.createElement("div");
    let num = i>20? i-20:i;
    // elem.innerHTML=num;
    let imagenVal=`<img src="${img[num-1].url}" alt="logo">`;
    elem.innerHTML=imagenVal;
    elem.classList.add("caja");
    tablero.append(elem);
    let obj = new Casilla(elem,imagenVal);
    // elem.onclick=()=>seleccionar(obj);  // es para que al principio se puedo tocar el boton
    objetos.push(obj);
}
let timerObervacion;
function verMedioSegundo(obj){
    obj.elemento.classList.toggle("selected",false);
    obj.elemento.classList.toggle("cajaBorde",true);
    seleccion=[];
}
let seleccion = [];
function seleccionar(obj){
    if(seleccion.length<2){
        obj.selected=true;
        obj.elemento.classList.toggle("cajaBorde",false);
        obj.elemento.classList.toggle("selected",true);
        seleccion.push(obj)
    }
    if(seleccion.length==2&&seleccion[0].valor===seleccion[1].valor&&seleccion[0]!=seleccion[1]){
        seleccion[0].held=true;
        seleccion[1].held=true;

        seleccion[0].selected=false;
        seleccion[1].selected=false;

        seleccion[0].elemento.onclick=false;
        seleccion[1].elemento.onclick=false;
        

        seleccion[0].elemento.classList.toggle("selected",false);
        seleccion[0].elemento.classList.toggle("congelado",true);
        seleccion[1].elemento.classList.toggle("selected",false);
        seleccion[1].elemento.classList.toggle("congelado",true);
        
        seleccion=[];
        win();
    }
    if(seleccion.length==2&&(seleccion[0].valor!==seleccion[1].valor||seleccion[0]==seleccion[1])){
        seleccion[0].selected=false;
        seleccion[1].selected=false;
        seleccion[0].elemento.classList.toggle("selected",false);
        seleccion[0].elemento.classList.toggle("cajaBorde",true);

        // ver medio segundo el segundo elemento:

        seleccion[1].elemento.classList.toggle("selected",true);

        timerObervacion= setTimeout(()=>verMedioSegundo(seleccion[1]),250);
    }
}

function desordenar(lista){
    seleccion=[];
    let nuevaLista = lista.filter(x=>x.held==false);
    for(let i=0;i<nuevaLista.length;i++){
        let num = Math.floor(Math.random()*nuevaLista.length);
        [nuevaLista[i].valor,nuevaLista[num].valor]=[nuevaLista[num].valor,nuevaLista[i].valor];
    }
    for(let i=0;i<lista.length;i++){
        lista[i].elemento.innerHTML=lista[i].valor;
        if(lista[i].selected==true){
            lista[i].selected=false;
            lista[i].elemento.classList.toggle("selected",false);
            lista[i].elemento.classList.toggle("cajaBorde",true);
        }
    }
}

// desordenBoton.onclick=()=>desordenar(objetos);


function todosVisibles(boleano){
    if(boleano){
        for(let i=0;i<objetos.length;i++){
            objetos[i].elemento.onclick=false;
            objetos[i].elemento.classList.toggle("cajaBorde",false);
            objetos[i].elemento.classList.toggle("selected",false);
            objetos[i].elemento.classList.toggle("mostrar",true);
        }
    }
    if(!boleano){
        for(let i=0;i<objetos.length;i++){
            if(!objetos[i].held){
                objetos[i].elemento.onclick=()=>seleccionar(objetos[i]);
            }
            objetos[i].elemento.classList.toggle("cajaBorde",true);
            objetos[i].elemento.classList.toggle("mostrar",false);
        }
    }
};

let intervalo;
let timer;

function corriendo(){
    todosVisibles(true);
    timer= setTimeout(()=>todosVisibles(false),12000);
}

function clickOnOff(){
    todosVisibles(true);
    timer = setTimeout(()=>todosVisibles(false),10000)
    intervalo = setInterval(corriendo,20000);
}

let relojIntervalo;
let clock=0;
function segundero(seg=0){
    let contador=seg
    let time={
      minuto:0,
      segundo:0,
    }
    while(contador>59){
      time.minuto=time.minuto+1;
      contador-=60;
    }
    time.segundo=contador;
    let dato=time.minuto!=0? `${time.minuto}:${time.segundo}`:`${time.segundo}`
    return dato;
  }
  
function relojTiempo(){
    clock+=1;
    reloj.innerHTML=`timer: ${segundero(clock)}`;
}

function win(){
    if(objetos.every(x=>x.held==true)){
        reloj.innerHTML=`Ganaste y tu tiempo es ${segundero(clock)}`
        clearInterval(relojIntervalo);
        clearInterval(intervalo);
    }
}

let explicacion = document.getElementById("explicacion");
let resto = document.getElementById("resto");
let botonReiniciar = document.createElement("button");
botonReiniciar.innerHTML="reiniciar";
botonReiniciar.onclick=()=>location.reload();

desordenBoton.onclick = () =>{
    desordenBoton.style.display="none";
    explicacion.style.display="none";
    resto.append(botonReiniciar)
    desordenar(objetos)
    relojIntervalo = setInterval(relojTiempo,1000);
    clickOnOff();
};

