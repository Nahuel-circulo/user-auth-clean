import { JwtAdapter, bcryptAdapter, envs } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";


export class AuthService {

  constructor(
    private readonly emailService: EmailService
  ) { }

  public async registerUser(registerUserDto: RegisterUserDto) {

    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest('User already exists');

    try {

      const user = new UserModel(registerUserDto);
      // encryptar la contraseña
      user.password = bcryptAdapter.hash(registerUserDto.password)

      await user.save();
      // JWT para mantener la autenticacion del usuario
      const token = await JwtAdapter.generateToken({ id: user.id });

      if (!token) throw CustomError.internalServer('Error while creating JWT');
      // email de confirmacion

      await this.sendEmailValidationLink(user.email)

      const { password, ...userEntity } = UserEntity.fronObject(user);

      return {
        user: userEntity,
        token
      };

    } catch (error) {
      console.log({ error })
      throw CustomError.internalServer(`${error}`)
    }

  }

  public async loginUser(loginUserDto: LoginUserDto) {

    //findOne para verificar si existe
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.badRequest('User not found');

    // match del password
    const isMatch = bcryptAdapter.compare(loginUserDto.password, user.password)

    if (!isMatch) throw CustomError.badRequest('email or password not valid');

    const token = await JwtAdapter.generateToken({ id: user.id });

    if (!token) throw CustomError.internalServer('Error while creating JWT')

    const { password, ...userEntity } = UserEntity.fronObject(user);
    //retornar el usuario sin la contrasena y el token ABC
    return {
      user: userEntity,
      token
    }
  }


  private sendEmailValidationLink = async (email: string) => {

    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServer('Error while creating JWT')

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
    const html = `
    <h1>Validate your email</hl>
    <p>Click on the following link to validate your email</p>
    <a href="${link}">Validate your email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html
    }

    const isSent = await this.emailService.sendEmail(options);

    if (!isSent) throw CustomError.internalServer('Error while sending email');

    return true;

  }

}