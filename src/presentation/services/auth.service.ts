import { JwtAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";


export class AuthService {

  constructor() { }

  public async registerUser(registerUserDto: RegisterUserDto) {

    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest('User already exists');

    try {

      const user = new UserModel(registerUserDto);
      // encryptar la contraseña
      user.password = bcryptAdapter.hash(registerUserDto.password)

      await user.save();
      // JWT para mantener la autenticacion del usuario

      // email de confirmacion

      const { password, ...userEntity } = UserEntity.fronObject(user);

      return {
        user: userEntity,
        token: 'ABC'
      };

    } catch (error) {
      console.log({ error })
      throw CustomError.internalServer(`${error}`)
    }

  }

  public async loginUser(loginUserDto:LoginUserDto) {

    //findOne para verificar si existe
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.badRequest('User not found');

    // math del password
    const isMatch = bcryptAdapter.compare(loginUserDto.password,user.password)

    if (!isMatch) throw CustomError.badRequest('email or password not valid');

    const token = await JwtAdapter.generateToken({ id: user.id });

    if (!token)  throw CustomError.internalServer('Error while creating JWT')

    const { password, ...userEntity } = UserEntity.fronObject(user);
    //retornar el usuario sin la contrasena y el token ABC
    return {
      user: userEntity,
      token
    }
  }

}