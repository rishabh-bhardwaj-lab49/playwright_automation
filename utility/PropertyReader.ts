import PropertiesReader from "properties-reader";
import * as Path from "path";

export class Propertyreader {
    
    private readonly relativePathOfConfigFile:string;

    constructor(relativePathOfConfigFile:string){
        this.relativePathOfConfigFile = relativePathOfConfigFile;
    }

    getProperty(propertyName:string):string{
        let absolutePath = Path.resolve(this.relativePathOfConfigFile)
        let pro = PropertiesReader(absolutePath)
        let propReader =  pro.get(propertyName)
        return propReader!.toString();
    }
  
}
