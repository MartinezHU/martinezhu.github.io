export class Skill {
  public name: string;
  public level: string;
  public tools: string[];
  public percent: string;

  constructor(name: string, level: string, percent: string, tools: string[]) {
    this.name = name;
    this.level = level;
    this.percent = percent;
    this.tools = tools;
  }
}
