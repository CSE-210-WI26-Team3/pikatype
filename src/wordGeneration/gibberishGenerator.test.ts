/*
Name: gibberishGenerator.test.ts
Description: Tests the gibberishGenerator, mainly ensuring that the character generates 
a random string given a list of characters
 */

//Imports
import { gibberishGenerator, gibberishData} from "./gibberishGenerator";
import * as fs from 'fs' 

describe('Testing gibberishGenerator Suite', () => {
    it('Testing Constructor', () => {
        // Create object
        const testParams = {
            'minLen': 5,
            'maxLen': 7,
            'characters': ["a", "s", "d", "f", "g"], 
            'type': 'gibberish'
        }
        const testObj = new gibberishGenerator(testParams)
 
        expect(testObj.minLen).toBe(5)
        expect(testObj.maxLen).toBe(7)
        expect(testObj.characters).toEqual(["a", "s", "d", "f", "g"])
    });

    it('Testing Word Generation', () => {
        const testParams = {
            'minLen': 5,
            'maxLen': 7,
            'characters': ["a", "s", "d", "f", "g"],
            'type': 'gibberish'
        }
        const testObj = new gibberishGenerator(testParams)

        const mockRandom = jest.spyOn(Math, 'random');

        mockRandom.mockReturnValueOnce(0) // Generate word of Length of 5
        mockRandom.mockReturnValueOnce(0)
        mockRandom.mockReturnValueOnce(0.2)
        mockRandom.mockReturnValueOnce(0.4)
        mockRandom.mockReturnValueOnce(0.6)
        mockRandom.mockReturnValueOnce(0.8)

        const minWord = testObj.generate()
        expect(minWord).toBe("asdfg")

        mockRandom.mockReturnValueOnce(0.99) // Generate word of Length of 7
        mockRandom.mockReturnValueOnce(0) 
        mockRandom.mockReturnValueOnce(0.2)
        mockRandom.mockReturnValueOnce(0.4)
        mockRandom.mockReturnValueOnce(0.6)
        mockRandom.mockReturnValueOnce(0.8)
        mockRandom.mockReturnValueOnce(0) 
        mockRandom.mockReturnValueOnce(0.2)

        const maxWord = testObj.generate()
        expect(maxWord).toBe("asdfgas")

        mockRandom.mockReturnValueOnce(0.5) // Generate word of  Length of 6
        mockRandom.mockReturnValueOnce(0) 
        mockRandom.mockReturnValueOnce(0.2)
        mockRandom.mockReturnValueOnce(0.4)
        mockRandom.mockReturnValueOnce(0.6)
        mockRandom.mockReturnValueOnce(0.8)
        mockRandom.mockReturnValueOnce(0) 
        const inBetweenWord = testObj.generate()
        expect(inBetweenWord).toBe('asdfga')
    });

    
    it('Testing if constructor checks if json object passed is correct', () => {
        //Test 1: minLen is 0
        const jsonData4 = {
            'minLen': 0,
            'maxLen': 8,
            'characters': ['a', 'b', 'c']
        }

        //Test 2: maxLen is greater than minLen
        const jsonData5 = {
            'minLen': 9,
            'maxLen': 7,
            'characters': ['a', 'b', 'c']
        }
        
        //Test 3: characters param is empty
        const jsonData6 = {
            'minLen': 5,
            'maxLen': 8,
            'characters': []
        }

        //Test 4: One character in characters has length of 2
        const jsonData7 = {
            'minLen': 5,
            'maxLen': 8,
            'characters': ['a', 'b', 'ac']
        }

        const test_objs = [jsonData4, jsonData5, jsonData6, jsonData7]
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