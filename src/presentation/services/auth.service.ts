import { UserModel } from "../../data";
import { CustomError, RegisterUserDto } from "../../domain";


export class AuthService {

  constructor() { }

  public async registerUser(registerUserDto: RegisterUserDto) {

    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest('User already exists');

    // const user = new UserModel(registerUserDto);
    // return await user.save();
    return 'todo ok'

  }

}