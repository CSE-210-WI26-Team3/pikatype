import { TutorialImage } from "./TutorialView";

const PlaceHolderImages: TutorialImage[] = [
    {
      ImagePath: "/img/tutorial/PlaceHolders/image1.jpg",
      ImageDescription: "Position your fingers in this matter on the home row",
      ImageKey: "img1"
    },
    {
      ImagePath: "/img/tutorial/PlaceHolders/image2.png",
      ImageDescription: "Position your fingers in this matter on the home row",
      ImageKey: "img2"
    }
  ];

const HomeRowTutorial: TutorialImage[] = [
    {
        ImagePath: "/img/tutorial/HomeRow/HomeRow1.svg",
        ImageDescription: "Here's how to position your left hand on the home row",
        ImageKey: "img1"
    },
        {
        ImagePath: "/img/tutorial/HomeRow/HomeRow2.svg",
        ImageDescription: "Put your middle finger (In Yellow) on the D key and your index finger (In Green) on the F key.",
        ImageKey: "img2"
    },
        {
        ImagePath: "/img/tutorial/HomeRow/HomeRow3.svg",
        ImageDescription: "Then put your ring finger (In Orange) on the S key and your pinky finger (In Red) on the A key",
        ImageKey: "img3"
    },
        {
        ImagePath: "/img/tutorial/HomeRow/HomeRow4.svg",
        ImageDescription: "To type the G key move your index finger from F to G then back to F once done.",
        ImageKey: "img4"
    },

];

export {PlaceHolderImages, HomeRowTutorial}
