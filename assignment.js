const fs = require('fs');
const readline = require('readline');
const {AnagramHandler} = require('./anagramHandler');

const handleError = (errorMsg) => {
    console.error(errorMsg);
    process.exit(1);
};

if (process.argv.length != 3) {
    handleError("ERROR: incorrect params supplied. \nUsage: node assignment.js filename_to_process\n");
}

// --

const anagrams = new AnagramHandler();
const filePath = process.argv[2];

// NB: File handling dealt with in this script, anagram logic in AnagramHandler module

const readStream = fs.createReadStream(filePath);
// No built-in error handler for readline so we need to add one to the stream interface
readStream.on('error', function (errorMsg) {
    handleError("Error while opening file:\n" + errorMsg);
});

// Now set up file handling events
const fileInterface = readline.createInterface({
  input: readStream // NB: kicks off file input automatically
});

fileInterface.on('line', line => {
    anagrams.newWord(line);
    
    if (anagrams.getError()) {
        handleError(anagrams.getError());
    }
});
    
fileInterface.on('close', () => {
    // all words read, now need to print out last chunk  
    anagrams.printWords(this.wordSet);
});




