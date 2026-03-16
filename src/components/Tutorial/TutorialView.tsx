/*
Name: TutorialView.tsx
Purpose: Create the UI for the Tutorial compoment. The Tutorial should the first component
that the user sees. Then it's supposed to 
*/
import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react'
import "./TutorialView.css"
import '@coreui/coreui/dist/css/coreui.min.css';
import { Dialog } from '@base-ui/react';

type TutorialImage = {
  ImagePath : string;
  ImageDescription: string;
  ImageKey: string, 
};

type TutorialConfig = {
  TutorialImages: TutorialImage[];
};

function TutorialView(Config: TutorialConfig){
  const TutorialImage = Config.TutorialImages.map(TutorialImage =>
    <CCarouselItem key={TutorialImage.ImageKey}>
      <CImage className="CImageContainer" src={process.env.PUBLIC_URL + TutorialImage.ImagePath} alt={TutorialImage.ImageKey}></CImage>
      <CCarouselCaption className="d-none carousel-item d-md-block">
        <h1>{TutorialImage.ImageDescription}</h1>
      </CCarouselCaption>
     </CCarouselItem>
  );

  return (
    <div>
       <Dialog.Root defaultOpen={true}>
      <Dialog.Portal>
        <Dialog.Backdrop className="Backdrop" />
        <Dialog.Popup className="Popup">
          <Dialog.Title className="Title">Tutorial</Dialog.Title>
          <CCarousel className="CarouselContainer" interval={false} dark wrap={false} controls indicators>
              {TutorialImage}
            </CCarousel>
          <div className="Actions">
            <Dialog.Close className="Button">Close</Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
    </div>
  );
};

export default TutorialView;
export type {TutorialImage, TutorialConfig};