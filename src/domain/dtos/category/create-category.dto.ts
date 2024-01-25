


export class CreateCategoryDto {


  private constructor(
    public readonly name: string,
    public readonly available: string
  ) { }

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {


    const { name, available = false } = object;

    if (!name) return ['Missing name'];

    let availableBoolena = available;

    if (typeof available !== 'boolean') {
      availableBoolena = (available === 'true' ? true : false)
    }

    return [undefined, new CreateCategoryDto(name, availableBoolena)];

  }
}