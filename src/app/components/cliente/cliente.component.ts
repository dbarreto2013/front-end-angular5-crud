import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})

export class ClientesComponent implements OnInit {
	cliente: Cliente = this.initCliente();
	clientes: Cliente[];
	showExtended: boolean = true;
	loaded: boolean = false;
	enableAdd: boolean = true;
	currentClasses = {};
	currentStyles = {};
	showClienteForm: boolean = false;
	@ViewChild('clienteForm') form: any;

	constructor(private clienteService: ClienteService) { }

	ngOnInit() {
		this.clienteService.getClientes()
		.subscribe(data => {
			this.clientes = data;
        	this.loaded = true;
      	});
  	}

	initCliente() {
    	return {
      		id: '',
  	  		nome: '',
      		limiteCredito: null,
  	  		risco: null,
  	  		edicao: false
    	}
  	}
  
  	onSubmit({value, valid}: {value: Cliente, valid: boolean}){
	    if(!valid){
			console.log("Dados inválidos");
	    } else {
			this.clienteService.saveClientes(value)
	        .subscribe(post => {
				this.clienteService.getClientes()
			    .subscribe(data => {
			        this.clientes = data;
			        this.loaded = true;
				});
			});
			this.form.reset();
		}
	}
  
	removeCliente(id) {
		if(confirm('Deseja realmente excluir?')) {
			this.clienteService.removeCliente(id)
			.subscribe(() =>{
         
				this.clienteService.getClientes()
		    	.subscribe(data => {
		        	this.clientes = data;
		        	this.loaded = true;
		      	});
        	});
    	}
  	}
    
	alterarCliente(id, nome, limiteCredito, risco) {
    	this.cliente = {
    		id: id,
    		nome: nome,
    		limiteCredito: limiteCredito,
    		risco: risco,
    		edicao: false
    	};
    
		this.clienteService.updateClientes(this.cliente)
        .subscribe(() =>{
			this.clienteService.getClientes()
		    .subscribe(data => {
		        this.clientes = data;
		        this.loaded = true;
			});
        });
	}
}