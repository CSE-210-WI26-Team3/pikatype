/*
Name: gibberishGenerator.test.ts
Description: Tests the gibberishGenerator, mainly ensuring that the character generates 
a random string given a list of characters
 */

//Imports
import { gibberishGenerator } from "./gibberishGenerator";
import * as fs from 'fs' 

//Main test for describe
describe('Testing gibberishGenerator Suite', () => {
    //Test #1, creating a constructor by taking in a json file
    it('Testing Constructor', () => {
        // Create object
        const testParams = {
            'minLen': 5,
            'maxLen': 7,
            'characters': ["a", "s", "d", "f", "g"]
        }
        const testObj = new gibberishGenerator(testParams)
 
        //Check if object created has correct info
        expect(testObj.minLen).toBe(5)
        expect(testObj.maxLen).toBe(7)
        expect(testObj.characters).toEqual(["a", "s", "d", "f", "g"])
    });

    //Test #2, generate a random word in this 3 words, one a minimum, on at max, and one in between
    it('Testing Word Generation', () => {
        // Create object
        const testParams = {
            'minLen': 5,
            'maxLen': 7,
            'characters': ["a", "s", "d", "f", "g"]
        }
        const testObj = new gibberishGenerator(testParams)

        // Mock random 
        const mockRandom = jest.spyOn(Math, 'random');

        // Define sequence of return values
        //Minimum Word Length
        mockRandom.mockReturnValueOnce(0) // Length of 5
        mockRandom.mockReturnValueOnce(0) // Characters
        mockRandom.mockReturnValueOnce(0.2)
        mockRandom.mockReturnValueOnce(0.4)
        mockRandom.mockReturnValueOnce(0.6)
        mockRandom.mockReturnValueOnce(0.8)

        //Geneate word and check 
        const minWord = testObj.generate()
        expect(minWord).toBe("asdfg")

        //Maximum word
        mockRandom.mockReturnValueOnce(0.99) // Length of 7
        mockRandom.mockReturnValueOnce(0) // Characters
        mockRandom.mockReturnValueOnce(0.2)
        mockRandom.mockReturnValueOnce(0.4)
        mockRandom.mockReturnValueOnce(0.6)
        mockRandom.mockReturnValueOnce(0.8)
        mockRandom.mockReturnValueOnce(0) 
        mockRandom.mockReturnValueOnce(0.2)

        const maxWord = testObj.generate()
        expect(maxWord).toBe("asdfgas")

        //In beetwen Word
        mockRandom.mockReturnValueOnce(0.5) // Length of 6
        mockRandom.mockReturnValueOnce(0) // Characters
        mockRandom.mockReturnValueOnce(0.2)
        mockRandom.mockReturnValueOnce(0.4)
        mockRandom.mockReturnValueOnce(0.6)
        mockRandom.mockReturnValueOnce(0.8)
        mockRandom.mockReturnValueOnce(0) 
        const inBetweenWord = testObj.generate()
        expect(inBetweenWord).toBe('asdfga')
    });

    
    //Test #3, test isGibberish from the constructor and go through each possible value that 
    //Would cause a failure
    it('Testing if constructor checks if json object passed is correct', () => {
        //Create test objects
        //Test each possible exception
        // Test 1: Not an object
        const jsonData1 = 1

        //Test 2: Doesn't have minLen or maxLen
        const jsonData2 = {
            'characters': 1,
        }

        //Test 3: Characters is a list of numbers
        const jsonData3 = {
            'minLen': 5,
            'maxLen': 8,
            'characters': [5, 8]
        }

        //Test 4: minLen is 0
        const jsonData4 = {
            'minLen': 0,
            'maxLen': 8,
            'characters': ['a', 'b', 'c']
        }

        //Test 5: maxLen is greater than minLen
        const jsonData5 = {
            'minLen': 9,
            'maxLen': 7,
            'characters': ['a', 'b', 'c']
        }
        
        //Test 6: characters param is empty
        const jsonData6 = {
            'minLen': 5,
            'maxLen': 8,
            'characters': []
        }

        //Test 7: One character in characters has length of 2
        const jsonData7 = {
            'minLen': 5,
            'maxLen': 8,
            'characters': ['a', 'b', 'ac']
        }

        const test_objs = [jsonData1, jsonData2, jsonData3, 
            jsonData4, jsonData5, jsonData6, jsonData7]
        
        //Go through each object and check if an exception is thrown 
        //If it isn't, then another error is thrown that isn't the corroect one
        for(const obj of test_objs){
            try
            {
                new gibberishGenerator(obj)
                throw new Error('fail is not defined')
            } catch (e){
                if (e instanceof Error){
                    expect(e.message).not.toBe('fail is not defined') 
                }
                
            }
        }
        
    })
        

});