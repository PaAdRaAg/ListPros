class Proceso{
    constructor(noProceso){
        this.noProceso = noProceso;
		this.neCiclos = Math.floor(Math.random()*(15-4))+4;
        this.siguiente = null;
    };
};

class Registro{
    constructor(){
        this.inicio = null;
        this.proceso = new Proceso();
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
			}
			while(aux != this.inicio) {
				return p;
			};
		} else {
			return null;
		};
	};
	
	buscar(noProceso) {
		let aux = this.inicio;
		do {
			if (aux.siguiente.noProceso == noProceso) {
				return aux;
			} else {
				aux = aux.siguiente;
			};
		}
		while(aux != this.inicio) {
			return null;
		};
	};

    eliminar(noProceso){
		let aux = this.buscar(noProceso);

		if (aux != null) {
			if (aux.siguiente == this.inicio) {
				if (aux == this.inicio) {
					this.inicio = null;
				} else {
					this.inicio = aux.siguiente.siguiente;
					aux.siguiente = this.inicio;
				};
			} else {
				aux.siguiente = aux.siguiente.siguiente;
			};
			return true;
		} else {
			return null;
		};
	};

};

var btnI = document.querySelector('#btnI');
var reg = new Registro();
var emp = 0;
var n = 1;
var completado = 0;

btnI.addEventListener('click', () => {

    for (let i = 1; i <= 300; i++) {
		let probabilidad = Math.trunc(Math.random()*100);
        if (probabilidad <= 39) {
			let pro = new Proceso("P" + n);
			reg.agregar(pro);
            if (n) {
                aux = reg.inicio;
				n++;
				aux.neCiclos--;
				if(aux.neCiclos == 0){
					reg.eliminar(aux.noProceso);
					completado++;
				};
				aux = aux.siguiente;
			};
        } else {
            emp++;
        };        
		reg.imprimir();
    };
    
	console.log("Ciclos vacíos: " + emp);
	console.log("Procesos Pendientes: " + reg.pendientes());
	console.log("Total de Ciclos Pendientes: " + reg.pendientesTotales());
    console.log("Procesos Completados: " + completado);
});