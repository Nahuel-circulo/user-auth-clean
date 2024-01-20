import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";


export class AuthService {

  constructor() { }

  public async registerUser(registerUserDto: RegisterUserDto) {

    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest('User already exists');

    try {

      const user = new UserModel(registerUserDto);
      await user.save();
      // encryptar la contraseña

      // JWT para mantener la autenticacion del usuario

      // email de confirmacion

      const { password, ...rest } = UserEntity.fronObject(user)
      return {
        ...rest,
        token: 'ABC'
      };

    } catch (error) {
      console.log({ error })
      throw CustomError.internalServer(`${error}`)
    }

  }

}