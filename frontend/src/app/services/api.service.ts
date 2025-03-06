import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // ✅ Laravel Backend

  constructor(private http: HttpClient) {}

  /*** Autenticación ***/
  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  /*** Gestión de Usuarios ***/
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  createUsers(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, userData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  /*** Gestión de Tareas ***/
  getTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks`);
  }

  getTaskById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/${id}`);
  }

  createTask(taskData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks`, taskData);
  }

  updateTask(id: number, taskData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/${id}`, taskData);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`);
  }

  getTotalTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/count`);
  }

  getPendingTasksCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/pending/count`);
  }

  getCompletedTasksCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/completed/count`);
  }

  /*** Gestión de Estados (Status) ***/
  // Método 1 (original)
  getstatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/status`);
  }

  // Método 2 (opcional, redundante con getstatus)
  getStatuses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/status`);
  }

  getStatusById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/status/${id}`);
  }

  createStatus(statusData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/status`, statusData);
  }

  updateStatus(id: number, statusData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/status/${id}`, statusData);
  }

  deleteStatus(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/status/${id}`);
  }
}
