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
