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
		return this.http.get<Cliente[]>('http://localhost/cliente/clientes');
	}
	
	saveClientes(post: Cliente): Observable<Cliente>{
    	return this.http.post<Cliente>("http://localhost/cliente/add", post, httpOptions);
  	}
  	
	updateClientes(post: Cliente): Observable<Cliente>{
    	return this.http.put<Cliente>("http://localhost/cliente/"+post.id, post, httpOptions);
	}
	
	removeCliente(postId: String):Observable<Cliente>{
    	return this.http.delete<Cliente>("http://localhost/cliente/delete/"+postId, httpOptions);
	}
}