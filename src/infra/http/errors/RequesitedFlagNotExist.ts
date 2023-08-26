export class RequisitedFlagNotExists extends Error {
  constructor(action: string) {
    super(
      `Rejected REQUEST, The Authorization requested is invalid or not found. ${action}`
    );
    this.name = "RequisitedFlagNotExists";
  }
}
