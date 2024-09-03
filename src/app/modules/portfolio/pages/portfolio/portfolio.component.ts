import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/shared/services/github.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  constructor(private githubService: GithubService) {}

  projects: any[] = [];

  ngOnInit(): void {
    this.githubService.getRepos().subscribe((data) => {
      this.projects = data.map((repo) => ({
        name: repo.name,
        description: repo.description,
        imageUrl: repo.owner.avatar_url,
        html_url: repo.html_url,
      }));
    });
  }
}
