import styled from "styled-components";

interface PropsType {
  rating: {
    count: number;
    rate: number;
  };
}

export const StarRating = ({ rating }: PropsType) => {
  const filledStars = Math.round((rating.rate / 5) * 100);

  const ratingToPercent = {
    width: `${filledStars}%`,
  };

  return (
    <StarRatingContainer>
      <div className="star-container">
        <div className="star-rating-fill" style={ratingToPercent}>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
        <div className="star-rating-base">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      </div>
      <div className="rating">
        {rating.rate} / {rating.count}명 참여
      </div>
    </StarRatingContainer>
  );
};

const StarRatingContainer = styled.div`
  display: flex;
  font-size: 24px;
  align-items: flex-end;

  .star-container {
    color: #989898;
    position: relative;
    unicode-bidi: bidi-override;
    width: max-content;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #fcc419;
    margin-right: 10px;
  }

  .star-rating-fill {
    color: #fcc419;
    padding: 0;
    position: absolute;
    z-index: 1;
    display: flex;
    top: 0;
    left: 0;
    overflow: hidden;
    -webkit-text-fill-color: #fcc419;
  }
  .star-rating-base {
    z-index: 0;
    padding: 0;
  }

  .rating {
    font-size: 16px;
  }
`;
