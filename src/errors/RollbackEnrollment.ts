export default class CannotEnroll extends Error {
  constructor() {
    super("There was an error in the registration, your data was not saved");
  
    this.name = "unsavedData";
  }
}
