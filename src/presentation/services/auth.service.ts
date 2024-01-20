import { UserModel } from "../../data";
import { CustomError, RegisterUserDto } from "../../domain";


export class AuthService {

  constructor() { }

  public async registerUser(registerUserDto: RegisterUserDto) {

    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest('User already exists');

    try {

      // encryptar la contraseña

      // JWT para mantener la autenticacion del usuario

      // email de confirmacion

      const user = new UserModel(registerUserDto);
      return await user.save();

    } catch (error) {
      console.log({ error })
      throw CustomError.internalServer(`${error}`)
    }

  }

}