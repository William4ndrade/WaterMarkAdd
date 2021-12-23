import { Canvas, Image, JPEGStream, loadImage, NodeCanvasRenderingContext2D } from "canvas";
import { error } from "console";
import fs from "fs";
import WaterMarkConfig from "./WaterMarkConfigInterface";




class Stamper {





    private async loadAllImages(WaterMarkImageSrc: string, MainImagesSrc: Array<string>): Promise<{ WaterMark: Image, MainImages: Promise<Image>[] }> {

        const WaterMark: Image = await loadImage(WaterMarkImageSrc);

        const MainImages: Promise<Image>[] = MainImagesSrc.map(async e => {
            return await loadImage(e);
        })

        return { WaterMark, MainImages }


    }


    private  DownloadNewImg(ImgStream: JPEGStream) {
        if (!fs.existsSync(__dirname + "/Images")) {
            fs.mkdirSync(__dirname + "/Images")
        }

        const writes: fs.WriteStream = fs.createWriteStream(__dirname + `/Images/${new Date().getTime()}-${Math.floor(Math.random() * 10000)}-WithWaterMark.jpeg`)
        ImgStream.pipe(writes)

        writes.on("finish", () => {
            console.info("Download Complete!")
        })

        writes.on("error", (e) => {
            throw error("Error on DownloadNewImg", e);
        })


    }

    public ReadAllImagesOfOneFolder(folderSrc: string):Array<string> {
       const dir =  fs.readdirSync(folderSrc).map(e => folderSrc + "/" + e);
       return dir
    }



    public async StampImages(WaterMarkImage: WaterMarkConfig, MainImagesSrc: Array<string>): Promise<void> {

        const { WaterMark, MainImages } = await this.loadAllImages(WaterMarkImage.src, MainImagesSrc);



        MainImages.forEach(async (e,i) => {
            const  canvas: Canvas = new Canvas(600, 600);
            const ctx: NodeCanvasRenderingContext2D =  canvas.getContext("2d");
            const img = await e;
            canvas.height = img.height
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0)
            ctx.drawImage(WaterMark, WaterMarkImage.x, WaterMarkImage.y, WaterMarkImage.Width, WaterMarkImage.Height)
            this.DownloadNewImg(canvas.createJPEGStream())
          
            
           
            
        })





    }








}

export default Stamper