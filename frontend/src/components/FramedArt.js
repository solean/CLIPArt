
import { FrameContainer, Frame, FrameMat, Art } from './';


function FramedArt({ imgSrc, imgPrompt }) {
  return (
    <div>
      <FrameContainer>
        <Frame>
          <FrameMat>
            <Art>
              <img src={imgSrc} alt={imgPrompt} width="500" height="500" />
            </Art>
          </FrameMat>
        </Frame>
      </FrameContainer>
      <p>{imgPrompt}</p>
    </div>
  );
}

export default FramedArt;