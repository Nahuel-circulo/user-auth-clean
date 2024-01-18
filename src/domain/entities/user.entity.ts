import { CustomError } from "../errors/custom.error";


export class UserEntity {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly emailValidated: boolean,
    private readonly password: string,
    private readonly role: string[],
    private readonly img?: string,
  ) { }


  static fronObject(object: { [key: string]: any }) {
    const { id, name, email, emailValidated, password, role, img, _id } = object;

    if (!id && !_id) {
      throw CustomError.badRequest('Missing id');
    }

    if (!name) throw CustomError.badRequest('Missing name');
    if (!email) throw CustomError.badRequest('Missing email');
    if (emailValidated === undefined) throw CustomError.badRequest('Missing emailValidated');
    if (!password) throw CustomError.badRequest('Missing password');
    if (!role) throw CustomError.badRequest('Missing role');

    return new UserEntity(id || _id, name, email, emailValidated, password, role, img);

  }
}