/*
Name: gibberishGeneration.ts
Description: Contains the code for the gibberish generator that takes in a list of 
characters and output a random string up to 5 to 8 letters
We can control the range of letters and the characters as well
*/

type gibberishData = {
    characters: string[],
    minLen: number,
    maxLen: number, 
}


class gibberishGenerator {
    characters: string[]; 
    minLen: number; 
    maxLen: number; 

    constructor(jsonData: gibberishData){
        if (jsonData.minLen <= 0){
            throw new Error('Minimum word length isn\'t greater than 0')
        }

        if (jsonData.maxLen <= jsonData.minLen){
            throw new Error('Maximum word length is equal to or less than the minimum word length')
        }

        if (jsonData.characters.length == 0){
            throw new Error('Number of characters passed is empty.')
        }

        for(const element of jsonData.characters){
            // If the length of a word is not 
            if(element.length != 1){
                throw new Error('Length of strings are not 1. Strings must be singular characters')
            }
        }

        this.characters = jsonData.characters
        this.minLen = jsonData.minLen
        this.maxLen = jsonData.maxLen
    }

    generate () {
        const wordLen = Math.floor(Math.random() * (this.maxLen - this.minLen + 1) + this.minLen) 

        let generatedWord = ""
        for(let i = 0; i<wordLen; i++){
            const chosenChar = this.characters[Math.floor(Math.random() * (this.characters.length))]

            generatedWord = generatedWord + chosenChar
        }

        return generatedWord
    }
}

export {gibberishGenerator}
export type {gibberishData}
