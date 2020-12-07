class Proceso{
    constructor(noProceso){
        this.noProceso = noProceso;
        this.neCiclos = Math.floor(Math.random()*(15-4))+4;
        this.siguiente = null;
    };
};

class Procesador{
    constructor(){
        this.inicio = null;
        this.proceso = new Proceso();
        this.probabilidad = Math.floor(Math.random()*(100));
    };

    agregar(proceso){

        if(this.inicio){
            var aux = this.inicio;
            while(aux.siguiente != this.inicio) {
                aux = aux.siguiente;
            };
            aux.siguiente = proceso;
        } else {
            this.inicio = proceso;
        };
        proceso.siguiente = this.inicio;
    };

    imprimir() {
		if (this.inicio){
			var p = '';
			var aux = this.inicio;
			do {
				p += aux.noProceso+':'+aux.neCiclos+' ';
				aux = aux.siguiente;
			} while(aux != this.inicio) {
				console.log(p);
			};
		} else {
			return null;
		};
    };

    pendientes() {
		if (this.inicio != null) {
			var p = 0;
			var aux = this.inicio;
			do {
				p++;
				aux = aux.siguiente;
			} while(aux != this.inicio) {
				return p;
			};
		} else {
			return null;
		};
    };

    pendientesTotales() {
		if (this.inicio != null) {
			var p = 0;
			var aux = this.inicio;
			do {
				p += aux.neCiclos;
				aux = aux.siguiente;
			} while(aux != this.inicio) {
				return p;
			};
		} else {
			return null;
		};
    };

    eliminar(noProceso){
        let aux = this.inicio;
        let anterior = null;
        let auxi

        if(aux.noProceso == noProceso){
            this.inicio = aux.siguiente;
            auxi = this.inicio;

            while(auxi.siguiente.noProceso !== noProceso){
                auxi = auxi.siguiente;
            };
            auxi.siguiente = this.inicio;
        } else{
            while(aux != null){
                if(aux.noProceso == noProceso){
                    if(!anterior){
                        this.inicio = aux.siguiente;
                    } else{
                        anterior.siguiente = aux.siguiente;
                    };
                    return aux.noProceso;
                };
                anterior = aux;
                aux = aux.siguiente;
            };
            return null;
		};
	};
};

var btnI = document.querySelector('#btnI');
var pros = new Procesador();
var emp = 0;
var n = 1
var completado = 0

btnI.addEventListener('click', () => {

    for (let i = 0; i <= 300; i++) {
        if (Math.trunc(Math.random()*100) <= 39) {
            pros.agregar(new Proceso("P" + n));
            if (n != null) {
                aux = pros.inicio;
            	n++;            
            
            }else if (pros.inicio) {
            	pros.inicio.neCiclos--;
            if (pros.inicio.neCiclos == 0) {
                pros.eliminar(pros.inicio);
                completado++;
            };
            aux = aux.siguiente;	
        } else {
            emp++;
        };        
    };
		pros.imprimir();
    };
    
    console.log("Procesos vacíos: " + emp);
    console.log("Procesos Completados: " + completado);
    console.log('Ciclos Pendientes: ' + pros.pendientes());
    console.log('Total de Ciclos Pendientes: ' + pros.pendientesTotales());
});