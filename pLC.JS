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
    }

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

    buscar(noProceso) {
		var aux = this.inicio;
		do {
			if (aux.siguiente.noProceso == noProceso) {
				return aux;
			} else {
				aux = aux.siguiente;
			} 
		} while(aux != this.inicio) {
				return null;
			}
	}

    pendientes() {
		if (this.inicio) {
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
		if (this.inicio) {
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
		var n = this.buscar(noProceso);
		if (n) {
			if (n.siguiente == this.inicio) {
				if (n == this.inicio) {
					this.inicio = null;
				} else {
					this.inicio = n.siguiente.siguiente;
					n.siguiente = this.inicio;
				}
			} else {
				n.siguiente = n.siguiente.siguiente;
			}
			return true;
		} else {
			return null;
		}
	}
};

var btnI = document.querySelector('#btnI');
var pros = new Procesador();
var emp = 0;
var n = 1
var completado = 0

btnI.addEventListener('click', () => {
	let aux;
    for (var i = 0; i < 300; i++) {
        if (Math.trunc(Math.random()*100+1) <= 39) {
            pros.agregar(new Proceso("P" + n));
            if (n == 1) {
                aux = pros.primero;
            n++;            
            
            }else if (pros.primero) {
            aux.neCiclos--;
            if (aux.neCiclos == 0) {
                pros.eliminar(aux);
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