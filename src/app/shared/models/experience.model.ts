export class Experience {
  public title: string;
  public company: string;
  public dir: string;
  public tasks: string[];

  constructor(title: string, company: string, dir: string, tasks: string[]) {
    this.title = title;
    this.company = company;
    this.dir = dir;
    this.tasks = tasks;
  }
}
