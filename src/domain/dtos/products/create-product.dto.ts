import { Validators } from "../../../config";


export class CreateProductDto {

  private constructor(
    public readonly available: boolean,
    public readonly category: string,
    public readonly description: string,
    public readonly name: string,
    public readonly price: number,
    public readonly user: string,
  ) { }

  static create(props: { [key: string]: any }): [string?, CreateProductDto?] {

    const {
      name,
      available,
      price,
      description,
      user,
      category
    } = props;

    if (!name) return ['Missing name'];
    if (!user) return ['Missing user'];
    if (!Validators.isMongoID(user)) return ['Invalid User ID']
    if (!category) return ['Missing category'];
    if (!Validators.isMongoID(category)) return ['Invalid Category ID']



    return [
      undefined,
      new CreateProductDto(!!available, category, description, name, price, user)
    ]
  }
}