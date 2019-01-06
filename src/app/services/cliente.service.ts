import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'
import { Cliente } from '../models/Cliente';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable()
export class ClienteService {

	constructor(private http: HttpClient) { }

	getClientes(): Observable<Cliente[]>{
		return this.http.get<Cliente[]>('http://localhost:8080/cliente/clientes');
	}
	
	saveClientes(post: Cliente): Observable<Cliente>{
    	return this.http.post<Cliente>("http://localhost:8080/cliente/add", post, httpOptions);
  	}
  	
	updateClientes(post: Cliente): Observable<Cliente>{
    	return this.http.put<Cliente>("http://localhost:8080/cliente/"+post.id, post, httpOptions);
	}
	
	removeCliente(postId: String):Observable<Cliente>{
    	return this.http.delete<Cliente>("http://localhost:8080/cliente/delete/"+postId, httpOptions);
	}
}