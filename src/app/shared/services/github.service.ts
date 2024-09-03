import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private apiUrl = 'https://api.github.com/users/MartinezHU/repos';

  constructor(private http: HttpClient) {}

  getRepos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
