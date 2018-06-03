const NUM_IMAGES = 100;

let count = 0;
let flipped = [];
let unflipped = Array.apply(null, { length: NUM_IMAGES }).map((v, i) => i); //initialize the unflipped to 1 - 100

function flip(nIndex) {
    //edge cases
    switch (nIndex) {
        case -1:
            return;
        case NUM_IMAGES - 1:
            flipped.push(unflipped[nIndex]);
            unflipped = unflipped.slice(0, NUM_IMAGES - 1);
            return;
        case 0:
            flipped.push(unflipped[nIndex]);
            unflipped = unflipped.slice(1, NUM_IMAGES);
            return;
    }
    let firstHalf = unflipped.slice(0, nIndex);
    let secondHalf = unflipped.slice(nIndex + 1, unflipped.length);
    flipped.push(unflipped[nIndex]);
    unflipped = [...firstHalf, ...secondHalf];
}

module.exports = (req, res) => {
    if (req.url != "/favicon.ico") {
        count++;
        if (count <= NUM_IMAGES) {
            let randomIndex = Math.floor(Math.random() * unflipped.length);
            console.log(randomIndex);
            let toFlip = unflipped[randomIndex];
            flip(randomIndex);
            return toFlip;
            // return "Index to be flipped: " + toFlip + "| Current #page loads: " + count + "| Current flipped indices: " + flipped + "| Current unflipped indices: " + unflipped;
        }
        // return "Everything is flipped!"
        return -1;
    }
};
