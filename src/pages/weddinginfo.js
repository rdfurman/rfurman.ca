import React from "react";
import styled from "styled-components";
import WeddingLayout from "../components/weddinglayout";

export const Head = () => <title>Daisy & Randy 2024 - Info</title>;

const Container = styled.div`
  display: "flex";
`;

const GeneralInfoBox = styled.div`
  flex: 1;
  flex-direction: row;
  width: 50%;
`;

const WeddingInfo = () => {
  return (
    <WeddingLayout>
      <Container>
        <GeneralInfoBox>
          <h2>General Info</h2>
          <p>
            This will be an outdoor ceremony in October so make sure bring warm
            clothing!
          </p>
        </GeneralInfoBox>
        <GeneralInfoBox>
          <h2>Directions</h2>
          <p>
            This will be an outdoor ceremony in October so make sure bring warm
            clothing!
          </p>
        </GeneralInfoBox>
      </Container>
    </WeddingLayout>
  );
};

export default WeddingInfo;
