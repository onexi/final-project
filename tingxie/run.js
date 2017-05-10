// script to load drawing board on canvas (refer to drawingboard.js for settings)
// drawing board background is silver: RGB(192, 192, 192); marker is black: RGB(0, 0, 0)
var myBoard = new DrawingBoard.Board('draw', {
    controls: [ { Navigation: {back: false, forward: false} } ],
    controlsPosition: 'bottom',
    size: 16,
    background: '#C0C0C0',
    webStorage: false,
    enlargeYourContainer: true
});

// function to run code when 'Submit' button is clicked
/* the following steps are executed as part of the function:
    1. process canvas drawing to crop out only the part that has been drawn (remove white space)
    2. scale image to 70x70 pixels and store it in 'Your Submission' box
    2. access pixel data and convert image to black/white - threshold:  r, g, b all <= 100
    3. create binary array with 1s for black and 0s for white
    4. convert binary array to string and post it to the server using ajax
    5. if server response matches written word, allow access to game
    6. display correct way to write word in 'Correct Answer' box
    7. clear canvas and generate new random word
*/
function submitAnswer(){

    // reset dice roll display
    document.getElementById('dice').innerHTML = null;

    // save canvas drawing as new image
    var imgElement = new Image();
    imgElement.onload = function(){
        processImage(this);
    };
    imgElement.src = myBoard.getImg();

    // function to process image
    function processImage(img){

        // store raw image data
        var canvas0 = document.getElementById('drawStore');
        var ctx0 = canvas0.getContext('2d');
        ctx0.drawImage(img, 0, 0, canvas0.width, canvas0.height);

        // access pixel data
        var imageData0 = ctx0.getImageData(0, 0, canvas0.width, canvas0.height);
        var data0 = imageData0.data;
        var r0, g0, b0;

        // initialize array of pixel indexes
        var pixelIndexArray = [];

        // iterate across pixels
        for(var p0 = 0; p0 < data0.length; p0 += 4){
            r0 = data0[p0];
            g0 = data0[p0 + 1];
            b0 = data0[p0 + 2];

            // if threshold is met (red, green, blue all <= 100), push pixel index number into pixel array
            if((r0 >= 0 && r0 <= 100) && (g0 >= 0 && g0 <= 100) && (b0 >= 0 && b0 <= 100)){
                pixelIndexArray.push(p0 / 4 + 1);
            }
        }
        // console.log(pixelIndexArray);

        // determine the first and last row number that have written pixels (upper and lower bound)
        // done by dividing pixel index by image width and finding the largest integer
        var topRow = Math.ceil(pixelIndexArray[0] / canvas0.width);
        var bottomRow = Math.ceil(pixelIndexArray[pixelIndexArray.length - 1] / canvas0.width);

        // determine the first and last column number that have written pixels (left and right bound)
        // done by finding the remainder after dividing pixel index by image width
        // smallest modulus (excluding 0) corresponds to first column
        // largest modulus (0 is the largest) corresponds to last column
        var moduli = [];
        for(var i = 0; i < pixelIndexArray.length; i++){
            moduli.push(pixelIndexArray[i] % canvas0.width);
        }
        if(moduli.includes(0)){
            var rightColumn = canvas0.width;
            var leftColumn = Math.min.apply(null, moduli.filter(Boolean));
        } else {
            var rightColumn = Math.max.apply(null, moduli);
            var leftColumn = Math.min.apply(null, moduli);
        }
        // console.log('top row: ' + topRow);
        // console.log('bottom row: ' + bottomRow);
        // console.log('left column: ' + leftColumn);
        // console.log('right column: ' + rightColumn);

        // find the new width and height and crop the original image into a smaller square
        var scaledWidth = rightColumn - leftColumn + 1;
        var scaledHeight = bottomRow - topRow + 1;
        var difference = scaledWidth - scaledHeight;
        // console.log(difference);
        if(difference > 0){
            var scaledImageData = ctx0.getImageData(leftColumn, topRow - (difference / 2), scaledWidth, scaledWidth);
        } else if(difference < 0){
            var scaledImageData = ctx0.getImageData(leftColumn + (difference / 2), topRow, scaledHeight, scaledHeight);
        } else if(difference === 0){
            var scaledImageData = ctx0.getImageData(leftColumn, topRow, scaledWidth, scaledHeight);
        }
        // console.log(scaledImageData);

        // store the cropped image and use for next step of processing
        var newCanvas = document.createElement('canvas');
        newCanvas.id = 'scaledImage';
        newCanvas.width = Math.max(scaledWidth, scaledHeight);
        newCanvas.height = Math.max(scaledWidth, scaledHeight);
        newCanvas.style.display = 'none';
        document.body.appendChild(newCanvas);
        var newCtx = newCanvas.getContext('2d');
        newCtx.putImageData(scaledImageData, 0, 0);
        var scaledImage = new Image();
        scaledImage.onload = function(){
            storeImage(this);
        };
        scaledImage.src = newCanvas.toDataURL();

        // function to scale, store, and send image to server
        function storeImage(image){

            // scale and display image in 'Your Submission' box
            var canvas = document.getElementById('imageSub');
            var ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            // get pixel data from image
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var data = imageData.data;
            var r, g, b;

            // initialize binary array
            var binaryArray = [];

            // iterate across pixels
            for(var p = 0; p < data.length; p += 4){
                r = data[p];
                g = data[p + 1];
                b = data[p + 2];

                // if threshold is met (red, green, blue all <= 100), convert pixel to black and push '1' into binary array
                // else convert pixel to white and push '0' into binary array
                if((r >= 0 && r <= 100) && (g >= 0 && g <= 100) && (b >= 0 && b <= 100)){
                    binaryArray.push(1);
                    data[p] = 0;
                    data[p + 1] = 0;
                    data[p + 2] = 0;
                } else {
                    binaryArray.push(0);
                    data[p] = 255;
                    data[p + 1] = 255;
                    data[p + 2] = 255;
                }
            }

            // replace original pixel data
            ctx.putImageData(imageData, 0, 0);

            // convert binary array to appropriate format and send to server using ajax
            var binaryString = JSON.stringify(binaryArray).slice(1, -1);
            // console.log(binaryString);
            var formData = 'image=' + binaryString;
            // console.log(formData);

            // use ajax to send http request by post method
            var httpRequest = new XMLHttpRequest();

            // action to take when response is received
            httpRequest.onreadystatechange = function(){
                if(httpRequest.readyState === XMLHttpRequest.DONE){
                    if(httpRequest.status === 200){

                        // response is in the form: "character,probability"
                        var response = httpRequest.responseText.split(',');
                        var correctAns = response[0];
                        var probability = Number(response[1]);
                        console.log(correctAns);
                        console.log(probability);

                        // if predicted character is the same as the correct character, allow user to roll dice and move to next word
                        if(correctAns === document.getElementById('imageCorStore').innerHTML){
                            alert('Good job!');
                            var roll = document.getElementById('roll');
                            roll.style.display = 'block';

                            // increase counter for number of turns used (variable in game.js)
                            numberOfTurns++;
                            document.getElementById('turns').innerHTML = numberOfTurns;

                            // clear 'Correct Answer' box and display correct Chinese character
                            var canvas2 = document.getElementById('imageCor');
                            var ctx2 = canvas2.getContext('2d');
                            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                            ctx2.font = '50px arial';
                            ctx2.fillText(document.getElementById('imageCorStore').innerHTML, 9, 52, canvas2.width);

                            // clear drawing canvas and generate new random word
                            myBoard.reset({background: true});
                            nextWord();
                            // console.log(words.length);

                        } else {

                            // if probability of prediction is below 50%, allow user to try again
                            if(probability < 0.5){
                                myBoard.reset({background: true});
                                alert('Please write the character again.');

                                // clear 'Correct Answer' box
                                var canvas2 = document.getElementById('imageCor');
                                var ctx2 = canvas2.getContext('2d');
                                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

                            // if not, tell user it is wrong and move to next word
                            } else {
                                alert('Sorry, that is wrong. The correct character is shown below.');

                                // increase counter for number of turns used (variable in game.js)
                                numberOfTurns++;
                                document.getElementById('turns').innerHTML = numberOfTurns;

                                // clear 'Correct Answer' box and display correct Chinese character
                                var canvas2 = document.getElementById('imageCor');
                                var ctx2 = canvas2.getContext('2d');
                                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                                ctx2.font = '50px arial';
                                ctx2.fillText(document.getElementById('imageCorStore').innerHTML, 9, 52, canvas2.width);

                                // clear drawing canvas and generate new random word
                                myBoard.reset({background: true});
                                nextWord();
                                // console.log(words.length);
                            } 
                        }
                    } else {
                        alert('There was a problem with the request.');
                    }
                }
            };

            // set request parameters and send it to server
            httpRequest.open('POST', 'http://ec2-107-23-213-101.compute-1.amazonaws.com/classify', true);
            httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            httpRequest.send(formData);
        }                   
    }
}