

export class FileUploadService {

  constructor() { }

  private checkFolder(folderPath: string) {
    throw new Error("Method not implemented.");
  }

  public uploadSingleFile(
    file: any,
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif', 'webp']
  ) { }

  public uploadMultipleFile(
    file: any[],
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif', 'webp']
  ) { }


}