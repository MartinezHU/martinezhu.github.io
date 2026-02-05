import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit {
  codeLines: { text: string; top: string; left: string; delay: string }[] = [];
  sampleCode = [
    "const user = 'Héctor';",
    "function hello() { console.log('Hola'); }",
    "let skills = ['Web','Mobile','AI'];",
    "if (dev) { buildAwesomeStuff(); }",
    "return <Component />;",
    "npm install awesome-package",
    "git commit -m 'feat: new feature'",
    "const api = await fetch('/data');",
  ];

  ngOnInit() {
    for (let i = 0; i < 20; i++) {
      const randomTop = Math.floor(Math.random() * 90) + "%";
      const randomLeft = Math.floor(Math.random() * 90) + "%";
      const randomCode = this.sampleCode[Math.floor(Math.random() * this.sampleCode.length)];
      const randomDelay = (Math.random() * 20) + "s";
      this.codeLines.push({ text: randomCode, top: randomTop, left: randomLeft, delay: randomDelay });
    }
  }
}
