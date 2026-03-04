/*
Name: gibberishGenerator.test.ts
Description: Tests the gibberishGenerator, mainly ensuring that the character generates 
a random string given a list of characters
 */

//Imports
import { GibberishGenerator, GibberishData } from "./GibberishGenerator";
import * as fs from "fs";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Testing gibberishGenerator Suite", () => {
  it("Testing Constructor", () => {
    // Create object
    const testParams = {
      minLen: 5,
      maxLen: 7,
      characters: ["a", "s", "d", "f", "g"],
      type: "gibberish",
    };
    const testObj = new GibberishGenerator(
      testParams.minLen,
      testParams.maxLen,
      testParams.characters,
    );

    expect(testObj.minLen).toBe(5);
    expect(testObj.maxLen).toBe(7);
    expect(testObj.characters).toEqual(["a", "s", "d", "f", "g"]);
  });

  it("Testing Word Generation", async () => {
    const testParams = {
      minLen: 5,
      maxLen: 7,
      characters: ["a", "s", "d", "f", "g"],
      Type: "gibberish",
    };
    const testObj = new GibberishGenerator(
      testParams.minLen,
      testParams.maxLen,
      testParams.characters,
    );

    const mockRandom = jest.spyOn(Math, "random");

    mockRandom.mockReturnValueOnce(0); // Generate word of Length of 5
    mockRandom.mockReturnValueOnce(0);
    mockRandom.mockReturnValueOnce(0.2);
    mockRandom.mockReturnValueOnce(0.4);
    mockRandom.mockReturnValueOnce(0.6);
    mockRandom.mockReturnValueOnce(0.8);

    const minWord = await testObj.getTypingPrompt();
    expect(minWord).toBe("asdfg");

    mockRandom.mockReturnValueOnce(0.99); // Generate word of Length of 7
    mockRandom.mockReturnValueOnce(0);
    mockRandom.mockReturnValueOnce(0.2);
    mockRandom.mockReturnValueOnce(0.4);
    mockRandom.mockReturnValueOnce(0.6);
    mockRandom.mockReturnValueOnce(0.8);
    mockRandom.mockReturnValueOnce(0);
    mockRandom.mockReturnValueOnce(0.2);

    const maxWord = await testObj.getTypingPrompt();
    expect(maxWord).toBe("asdfgas");

    mockRandom.mockReturnValueOnce(0.5); // Generate word of  Length of 6
    mockRandom.mockReturnValueOnce(0);
    mockRandom.mockReturnValueOnce(0.2);
    mockRandom.mockReturnValueOnce(0.4);
    mockRandom.mockReturnValueOnce(0.6);
    mockRandom.mockReturnValueOnce(0.8);
    mockRandom.mockReturnValueOnce(0);
    const inBetweenWord = await testObj.getTypingPrompt();
    expect(inBetweenWord).toBe("asdfga");
  });

  it("Testing if constructor checks if json object passed is correct", () => {
    //Test 1: minLen is 0
    const jsonData4 = {
      minLen: 0,
      maxLen: 8,
      characters: ["a", "b", "c"],
    };

    //Test 2: maxLen is greater than minLen
    const jsonData5 = {
      minLen: 9,
      maxLen: 7,
      characters: ["a", "b", "c"],
    };

    //Test 3: characters param is empty
    const jsonData6 = {
      minLen: 5,
      maxLen: 8,
      characters: [],
    };

    //Test 4: One character in characters has length of 2
    const jsonData7 = {
      minLen: 5,
      maxLen: 8,
      characters: ["a", "b", "ac"],
    };

    expect(() => {
      new GibberishGenerator(
        jsonData4.minLen,
        jsonData4.maxLen,
        jsonData4.characters,
      );
    }).toThrow();

    expect(() => {
      new GibberishGenerator(
        jsonData5.minLen,
        jsonData5.maxLen,
        jsonData5.characters,
      );
    }).toThrow();

    expect(() => {
      new GibberishGenerator(
        jsonData6.minLen,
        jsonData6.maxLen,
        jsonData6.characters,
      );
    }).toThrow();

    expect(() => {
      new GibberishGenerator(
        jsonData7.minLen,
        jsonData7.maxLen,
        jsonData7.characters,
      );
    }).toThrow();
  });
});
