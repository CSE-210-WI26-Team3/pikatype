import { getAllByAltText, render, screen } from "@testing-library/react";
import TutorialView from "./TutorialView";
import { TutorialConfig, TutorialImage } from "./TutorialView";

describe("Testing TutorialView Suite", () => {
    it("Test Creating Tutorial View", () => {
        const testObj : TutorialConfig = {
            TutorialImages: [
                {
                    ImagePath: "/img/tutorial/image1.jpg",
                    ImageDescription: "Description 1",
                    ImageKey: "img1"},
                {
                    ImagePath: "/img/tutorial/image2.jpg",
                    ImageDescription: "Description 2",
                    ImageKey: "img2"
                },]}
        
        render(<TutorialView TutorialImages={testObj.TutorialImages}/>)
        const  tutorial = screen.getByTestId
        expect(screen.getByText('Description 1')).toBeInTheDocument()
        expect(screen.getByText('Description 2')).toBeInTheDocument()
        
        const img1 = screen.getByAltText("img1")
        const img2 = screen.getByAltText("img2")
        expect(img1.getAttribute("src")).toBe("/img/tutorial/image1.jpg")
        expect(img2.getAttribute("src")).toBe("/img/tutorial/image2.jpg")
    })
})