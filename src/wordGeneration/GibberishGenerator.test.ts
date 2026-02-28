/*
Name: gibberishGenerator.test.ts
Description: Tests the gibberishGenerator, mainly ensuring that the character generates 
a random string given a list of characters
 */

//Imports
import { GibberishGenerator, GibberishData } from "./GibberishGenerator";
import * as fs from "fs";

describe("Testing gibberishGenerator Suite", () => {
  it("Testing Constructor", () => {
    // Create object
    const TestParams = {
      MinLen: 5,
      MaxLen: 7,
      Characters: ["a", "s", "d", "f", "g"],
      Type: "gibberish",
    };
    const TestObj = new GibberishGenerator(TestParams);

    expect(TestObj.MinLen).toBe(5);
    expect(TestObj.MaxLen).toBe(7);
    expect(TestObj.Characters).toEqual(["a", "s", "d", "f", "g"]);
  });

  it("Testing Word Generation", () => {
    const TestParams = {
      MinLen: 5,
      MaxLen: 7,
      Characters: ["a", "s", "d", "f", "g"],
      Type: "gibberish",
    };
    const TestObj = new GibberishGenerator(TestParams);

    const MockRandom = jest.spyOn(Math, "random");

    MockRandom.mockReturnValueOnce(0); // Generate word of Length of 5
    MockRandom.mockReturnValueOnce(0);
    MockRandom.mockReturnValueOnce(0.2);
    MockRandom.mockReturnValueOnce(0.4);
    MockRandom.mockReturnValueOnce(0.6);
    MockRandom.mockReturnValueOnce(0.8);

    const MinWord = TestObj.generate();
    expect(MinWord).toBe("asdfg");

    MockRandom.mockReturnValueOnce(0.99); // Generate word of Length of 7
    MockRandom.mockReturnValueOnce(0);
    MockRandom.mockReturnValueOnce(0.2);
    MockRandom.mockReturnValueOnce(0.4);
    MockRandom.mockReturnValueOnce(0.6);
    MockRandom.mockReturnValueOnce(0.8);
    MockRandom.mockReturnValueOnce(0);
    MockRandom.mockReturnValueOnce(0.2);

    const MaxWord = TestObj.generate();
    expect(MaxWord).toBe("asdfgas");

    MockRandom.mockReturnValueOnce(0.5); // Generate word of  Length of 6
    MockRandom.mockReturnValueOnce(0);
    MockRandom.mockReturnValueOnce(0.2);
    MockRandom.mockReturnValueOnce(0.4);
    MockRandom.mockReturnValueOnce(0.6);
    MockRandom.mockReturnValueOnce(0.8);
    MockRandom.mockReturnValueOnce(0);
    const InBetweenWord = TestObj.generate();
    expect(InBetweenWord).toBe("asdfga");
  });

  it("Testing if constructor checks if json object passed is correct", () => {
    //Test 1: minLen is 0
    const JsonData4 = {
      MinLen: 0,
      MaxLen: 8,
      Characters: ["a", "b", "c"],
    };

    //Test 2: maxLen is greater than minLen
    const JsonData5 = {
      MinLen: 9,
      MaxLen: 7,
      Characters: ["a", "b", "c"],
    };

    //Test 3: characters param is empty
    const JsonData6 = {
      MinLen: 5,
      MaxLen: 8,
      Characters: [],
    };

    //Test 4: One character in characters has length of 2
    const JsonData7 = {
      MinLen: 5,
      MaxLen: 8,
      Characters: ["a", "b", "ac"],
    };

    expect(() => {
      new GibberishGenerator(JsonData4);
    }).toThrow();

    expect(() => {
      new GibberishGenerator(JsonData5);
    }).toThrow();

    expect(() => {
      new GibberishGenerator(JsonData6);
    }).toThrow();

    expect(() => {
      new GibberishGenerator(JsonData7);
    }).toThrow();
    
  });
});
