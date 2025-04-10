export class Customer {
  firstName: string;
  lastName: string;
  email: string;

  constructor(
    firstName?: string,
    lastName?: string,
    email?: string
  ) {
    this.firstName = firstName || "First Name";
    this.lastName = lastName || "Last Name";
    this.email = email || "example@example.com";
  }
}
