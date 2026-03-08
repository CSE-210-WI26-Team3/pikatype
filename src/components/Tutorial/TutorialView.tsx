/*
Name: TutorialView.tsx
Purpose: Create the UI for the Tutorial compoment. The Tutorial should the first component
that the user sees. Then it's supposed to 
*/
import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react'
import "./TutorialView.css"
import '@coreui/coreui/dist/css/coreui.min.css';
import { Dialog } from '@base-ui/react';


function TutorialView(){
  return (
       <Dialog.Root defaultOpen={true}>
      <Dialog.Portal>
        <Dialog.Backdrop className="Backdrop" />
        <Dialog.Popup className="Popup">
          <Dialog.Title className="Title">Tutorial</Dialog.Title>
          <CCarousel className="CarouselContainer" interval={false} dark wrap={false} controls indicators>
              <CCarouselItem>
                <CImage className="d-block CImageContainer" src={process.env.PUBLIC_URL + "/img/tutorial/image1.jpg"}></CImage>
                <CCarouselCaption className="d-none d-md-block">
                  <h1>Some representative placeholder content for the first slide.</h1>
                </CCarouselCaption>
              </CCarouselItem>
              <CCarouselItem>
                <CImage className="d-block CImageContainer" src={process.env.PUBLIC_URL + "/img/tutorial/image2.png"}></CImage>
                   <CCarouselCaption className="d-none d-md-block">
                  <h1>Some representative placeholder content for the first slide.</h1>
                </CCarouselCaption>
              </CCarouselItem>
            </CCarousel>
          <div className="Actions">
            <Dialog.Close className="Button">Close</Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default TutorialView