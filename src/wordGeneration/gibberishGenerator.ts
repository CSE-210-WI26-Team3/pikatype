/*
Name: gibberishGeneration.ts
Description: Contains the code for the gibberish generator that takes in a list of 
characters and output a random string up to 5 to 8 letters
We can control the range of letters and the characters as well
*/



//Checks if jsonData has correct types
function isGibberish(obj: unknown){
    //Return if the obj is an object
    // Has parameters characters, minLen, and maxLen
    // Type of minLen and maxLen are numbers and are integers
    // Type of characters is list of strings
    return (
        typeof obj === 'object' &&
        obj != null &&
        'characters' in obj &&
        'minLen' in obj &&
        'maxLen' in obj &&
        typeof obj.minLen === 'number' && 
        Number.isInteger(obj.minLen) &&
        typeof obj.maxLen === 'number' && 
        Number.isInteger(obj.maxLen) &&
        Array.isArray(obj.characters) 
    );
}

//Create character generator class
class gibberishGenerator {
    // Containing the list of characters to create words from
    characters: string[]; //Contains the characters to make the string
    minLen: number; //Contains the minimum length the generated words should be
    maxLen: number; //Contains the maximum length the generated word should be

    //Create a constructor that takes in a json object to create it
    constructor(jsonData: any){
        //Firstly, check if jsonDate is an object and all 3 parameters and their types
        //Return an exception if this fails
        if (!isGibberish(jsonData)){
            throw new Error('JSON Object isn\'t object or have the correct parameters and types')
        }

        // Next, check if characters are all strings
        for(const obj of jsonData.characters){
            //If the object isn't a string
            if (!(typeof obj === 'string')){
                throw new Error('List of chracters are not strings')
            }
        }
        //Next, check if minLen is greater than 0 
        //Thow an exception if that 's the case
        if (jsonData.minLen <= 0){
            throw new Error('Minimum word length isn\'t greater than 0')
        }

        //Next heck if maxLen is greater than minLen
        //Throw an error if maxLen is less than or equal to minLen
        if (jsonData.maxLen <= jsonData.minLen){
            throw new Error('Maximum word length is equal to or less than the minimum word length')
        }

        //Next check if length of of characters isn't 0 
        //Throw an error if the number of characters is 0
        if (jsonData.characters.length == 0){
            throw new Error('Number of characters passed is empty.')
        }

        //Finally, check if the length of each word is 1
        for(const element of jsonData.characters){
            // If the length of a word is not 
            if(element.length != 1){
                throw new Error('Length of strings are not 1. Strings must be singular characters')
            }
        }

        //Get the properties and store in the character generator
        this.characters = jsonData.characters
        this.minLen = jsonData.minLen
        this.maxLen = jsonData.maxLen
    }

    // Generates a word from the list of characters
    generate () {
        // Generate a random number between minLen and maxLen
        const wordLen = Math.floor(Math.random() * (this.maxLen - this.minLen + 1) + this.minLen) 

        //Next, create a new string
        let str = ""

        //Loop based on the length of the word that will be returned
        for(let i: number = 0; i<wordLen; i++){
            //Choose a random character chracters
            const character = this.characters[Math.floor(Math.random() * (this.characters.length))]

            //Add the character to the string
            str = str + character
        }

        // Return the string
        return str
    }
}

//Export the character generator
export {gibberishGenerator}