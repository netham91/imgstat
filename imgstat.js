function PixelData(canvas_id, img_path, callback) {
    ctx = document.getElementById(canvas_id).getContext('2d');
    var img = new Image();
    var data = [];
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        console.log("done");
        //callback("1");
        var d1 = loadData(img, ctx);
        console.log(d1);
        return d1;
    };
    img.src = img_path;
}

function loadData(img, ctx) {
    var pixels = ctx.getImageData(0, 0, img.width, img.height).data; //extracting pixel data in Uint8ClampedArray 
    //console.log(pixels);
    var data = [];
    for (x = 0; x < img.width; x++) {
        data[x] = [];
        for (y = 0; y < img.height; y++) {
            currentPos = y * img.height * 4 + x * 4; //maps x,y to Uint8ClampedArray pos
            var pData = new Pixels();
            pData.pos(x, y);
            pData.pushdata(pixels[currentPos], pixels[currentPos + 1], pixels[currentPos + 2], pixels[currentPos + 3]);
            data[x][y] = pData;
            //data[x][y].pushData(currentPos,currentPos+1,currentPos+2,currentPos+3); 
        }
    }
    //callback(data);
    return data;
}

//defining a pixel
var Pixel = function(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
};
var Pos = function() {
    this.x = 0;
    this.y = 0;
};
//defining pixelData
var Pixels = function() {};
Pixels.prototype.pos = function(x, y) {
    this.pos = new Pos();
    this.pos.x = x;
    this.pos.y = y;
    return this.pos;
};
//function to fill r,g,b,a values
Pixels.prototype.pushdata = function(r, g, b, a) {
    this.rgba = new Pixel(r, g, b, a);
    return this.rgba;
};