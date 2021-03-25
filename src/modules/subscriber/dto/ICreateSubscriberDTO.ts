export default interface ICreateSubscriberDTO {
  name: string;
  email: string;
  rg: string;
  cpf: string;
  cep: string;
  address: string;
  city: string;
  university: string;
  phone: string;
  membership?: string | null;
  value: number;
}
