# WaterMarkAdd

## Como usar: 

```js

import Stamper from "./Stamper";
import WaterMarkConfig from "./WaterMarkConfigInterface";



const stamp:Stamper = new Stamper()

const ConfigWaterMark:WaterMarkConfig = {
    Height: 40,
    Width: 40,
    x: 30,
    y: 30,
    src: "teste/forgithub.jpeg"
}


stamp.StampImages(ConfigWaterMark, ["imagemprincipalsrc.jpeg"])

``` 
- Se tudo der certo, uma pasta com todas as suas imagens editadas será criada.


- Se você quiser editar muitas imagens, coloque todas em uma pasta e chame o metodo ReadAllImagesOfOneFolder, ela irá retornar o array com o src de todas as imagens. Assim: 

```js

const allimages:Array<string> = stamp.ReadAllImagesOfOneFolder("/foldersrc") 

stamp.StampImages(ConfigWaterMark, allimages)

```
