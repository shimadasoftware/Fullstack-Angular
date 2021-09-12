export class Painting {

  public paintingID: number;
  public startYear: number;
  public endingYear: number;
  public description: string;
  public movement: string;
  public paintingName: string;
  public picture: string;
  public pictBase64: string;

  /**
   * constructor method
   */
  constructor(id: number, startYear: number, endingYear: number, name: string, description: string, movement:string, picture: string, picBase64: string){
    this.paintingID = id;
    this.startYear = startYear;
    this.endingYear = endingYear;
    this.paintingName = name;
    this.description = description;
    this.movement = movement;
    this.picture = picture;
    this.pictBase64 = picBase64;
  }

}
