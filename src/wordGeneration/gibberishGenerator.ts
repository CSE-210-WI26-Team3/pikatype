/*
Name: gibberishGeneration.ts
Description: Contains the code for the gibberish generator that takes in a list of 
characters and output a random string up to 5 to 8 letters
We can control the range of letters and the characters as well
*/

type GibberishData = {
    characters: string[],
    minLen: number,
    maxLen: number, 
}


class GibberishGenerator {
    characters: string[]; 
    minLen: number; 
    maxLen: number; 

    constructor(JsonData: GibberishData){
        if (JsonData.minLen <= 0){
            throw new Error('Minimum word length isn\'t greater than 0')
        }

        if (JsonData.maxLen <= JsonData.minLen){
            throw new Error('Maximum word length is equal to or less than the minimum word length')
        }

        if (JsonData.characters.length == 0){
            throw new Error('Number of characters passed is empty.')
        }

        for(const element of JsonData.characters){
            // If the length of a word is not 
            if(element.length != 1){
                throw new Error('Length of strings are not 1. Strings must be singular characters')
            }
        }

        this.characters = JsonData.characters
        this.minLen = JsonData.minLen
        this.maxLen = JsonData.maxLen
    }

    // Generates a word from the list of characters
    generate () {
        // Generate a random number between minLen and maxLen
        const wordLen = Math.floor(Math.random() * (this.maxLen - this.minLen + 1) + this.minLen) 

        let GeneratedWord = ""
        for(let i = 0; i<wordLen; i++){
            const ChosenChar = this.characters[Math.floor(Math.random() * (this.characters.length))]

            GeneratedWord = GeneratedWord + ChosenChar
        }

        return GeneratedWord
    }
}

export {GibberishGenerator}
export type {GibberishData}
