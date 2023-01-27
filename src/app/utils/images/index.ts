export const blurPicture = (dataUrl: string, blur: number = 40, type: "image/png" | "image/jpeg" = "image/png", compression: number = 1) => {

    return new Promise((resolve) => {
        const img: any = new Image();
        const canvas: any = document.createElement('canvas');
        const ctx: any = canvas.getContext("2d");

        img.onload = () => {
            let width = img.naturalWidth,
                height = img.naturalHeight;
            canvas.width = width;
            canvas.height = height;
            ctx.filter = `blur(${blur}px)`;
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL(type, compression));
        };

        img.src = dataUrl;
    });

}

export const getA5HeightFromWidth = (width: number): number => {
    return width * Math.sqrt(2);
}

export const cropImage = (url: string, width: number = 512, height: number = 512): Promise<string> => {

    return new Promise((resolve) => {
        const img = new Image();
        const sizeHeight = height;
        const sizeWidth = width;
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = sizeWidth;
            canvas.height = sizeHeight;
            const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

            let x = 0;
            let y = 0;
            let scale = 1;
            let width = img.width;
            let height = img.height;
            if (sizeWidth / width < sizeHeight / height) {
                scale = width / height;
                width = sizeHeight * scale;
                height = sizeHeight;
                x = (width - sizeWidth) * -0.5;
            } else {
                scale = height / width;
                height = sizeWidth * scale;
                width = sizeWidth;
                y = (height - sizeHeight) * -0.5;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, x, y, width, height);
            resolve(canvas.toDataURL("image/png", 1));
        };
        img.src = url;
    })
};


export const optimizeImage = (dataUrl: string, type: "image/png" | "image/jpeg", compression: number = 1): Promise<string> => {

    return new Promise((resolve) => {
        const img: any = new Image();
        const canvas: any = document.createElement('canvas');
        const ctx: any = canvas.getContext("2d");

        img.onload = () => {
            /*let width = Math.floor(img.naturalWidth * 0.5),
                height = Math.floor(img.naturalHeight * 0.5);*/
            let width = img.naturalWidth,
                height = img.naturalHeight;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL(type, compression));
        };

        img.src = dataUrl;
    });
}



// https://livefiredev.com/html5-how-to-scale-image-to-fit-a-canvas-with-demos/
export const drawImageScaled = (ctx: any, img: any, x: number, y: number, maxWidth: number, maxHeight: number) => {
    var hRatio = maxWidth / img.width;
    var vRatio = maxHeight / img.height;
    var ratio = Math.min(hRatio, vRatio);
    var centerShift_x = (maxWidth - img.width * ratio) / 2;
    // var centerShift_y = (maxHeight - img.height * ratio) / 2;
    ctx.drawImage(img, x, 0, img.width, img.height,
        centerShift_x, y, img.width * ratio, img.height * ratio);
}


// Found here: https://fjolt.com/article/html-canvas-how-to-wrap-text
export const wrapText = (ctx: any, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    // First, start by splitting all of our text into words, but splitting it into an array split by spaces
    let words = text.split(' ');
    let line = ''; // This will store the text of the current line
    let testLine = ''; // This will store the text when we add a word, to test if it's too long
    let lineArray = []; // This is an array of lines, which the function will return

    // Lets iterate over each word
    for (var n = 0; n < words.length; n++) {
        // Create a test line, and measure it..
        testLine += `${words[n]} `;
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        // If the width of this test line is more than the max width
        if (testWidth > maxWidth && n > 0) {
            // Then the line is finished, push the current line into "lineArray"
            lineArray.push([line, x, y]);
            // Increase the line height, so a new line is started
            y += lineHeight;
            // Update line and test line to use this word as the first word on the next line
            line = `${words[n]} `;
            testLine = `${words[n]} `;
        }
        else {
            // If the test line is still less than the max width, then add the word to the current line
            line += `${words[n]} `;
        }
        // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
        if (n === words.length - 1) {
            lineArray.push([line, x, y]);
        }
    }
    // Return the line array
    return lineArray;
}
