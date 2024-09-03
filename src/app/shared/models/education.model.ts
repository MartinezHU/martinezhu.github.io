export class Education {
  public title: string;
  public institution: string;
  public location: string;
  public finish_date: Date;
  public description: string;

  constructor(
    title: string,
    institution: string,
    location: string,
    finish_date: Date,
    description: string
  ) {
    this.title = title;
    this.institution = institution;
    this.location = location;
    this.finish_date = finish_date;
    this.description = description;
  }
}
