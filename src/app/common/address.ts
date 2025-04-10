export class Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;

  constructor(
    street?: string,
    city?: string,
    state?: string,
    country?: string,
    zipCode?: string
  ) {
    this.street = street || "Street Name";
    this.city = city || "City Name";
    this.state = state || "State Name";
    this.country = country || "Country Name";
    this.zipCode = zipCode || "00000";
  }
}
