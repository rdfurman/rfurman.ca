import React from "react";
import styled from "styled-components";
import WeddingLayout from "../components/weddinglayout";

export const Head = () => <title>Daisy & Randy 2024 - Info</title>;

const InfoContainer = styled.div`
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoBox = styled.div`
  width: 50%;
  padding: 5px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const InfoBoxBorder = styled.div`
  width: 100%;
  border-radius: 15px;
  border: 2px solid black;
  padding: 5px;
`;

const InfoBoxTitle = styled.h3`
  text-align: center;
`;

const WeddingInfo = () => {
  return (
    <WeddingLayout>
      <InfoContainer
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <InfoBox>
          <InfoBoxBorder>
            <InfoBoxTitle>Info</InfoBoxTitle>
            <h3>Schedule</h3>
            <p>
              3PM - Ceremony
              <br />
              6PM - Dinner
            </p>
            <h3>Accomodations</h3>
            <p>
              Everything is{" "}
              <strong style={{ color: "red" }}>first-come-first-serve</strong>.
              All prices include tax.
            </p>
            <h5>Motel Rooms</h5>
            <p>
              The motel rooms have 2 queen beds, a small kitchenette with a mini
              fridge, hot plate, microwave and coffee pot. There are 12 motel
              rooms available for rent.
            </p>
            <p>Price: $194/night for the first night and second night $139.</p>
            <p></p>

            <h5>Cabins</h5>
            <p>
              Cabins are rented for a 3 day minimum only. All cabins have a fire
              pit, outside chairs & picnic table. There are 2 cabins available
              to rent.
            </p>
            <p> Price: $1254.75 for 3 nights.</p>
            <ul>
              <li>There are 3 queen beds and a queen air mattress.</li>
              <li>Full fridge, stove, microwave & dishwasher in each.</li>
              <li>Dishes, pots and pans included.</li>
            </ul>

            <h5>BYO Rooms</h5>
            <p>
              You will need to bring your own air mattress and bedding. There is
              a bathroom outside with toilets and pay showers, BBQ, and many
              fire pits & picnic tables for all BYO guests. The BYO rooms also
              have a large parking lot that can hold many RV's if they don't
              require hook ups.
              <strong>BYO room availability will depend on weather.</strong>
            </p>
            <h6>XL BYO Rooms</h6>
            <p>
              The XL BYO room costs has 6 tables & chairs, heaters and enough
              space for 6 ppl to sleep. There are 2 XL BYO rooms available.
            </p>
            <p>Price: $139.50/night. Extra guests are $20/night.</p>
            <h6>BYO Rooms</h6>
            <p>
              The smaller BYO rooms can hold 4 ppl. There is 1 queen size wood
              bed frame and you can accommodate 2 more in the same room if they
              setup a bed on the floor. There are 6 smaller BYO rooms available.
            </p>
            <p>Price: $86/night</p>

            <h5>Camping</h5>
            <p>
              There are RV camping sites available around each of the cabins
              that include full hookups. If your RV does not require any hookups
              we can squeeze in more units.
            </p>
            <p>Price: $50/night for full hookups, $40/night with no hookups.</p>
            <p>
              There are also many campgrounds nearby and the whole area is crown
              land so there are a lot of options for camping.
            </p>
          </InfoBoxBorder>
        </InfoBox>
        <InfoBox>
          <InfoBoxBorder>
            <InfoBoxTitle>Location</InfoBoxTitle>
            <h3>Mountain-Aire Resort</h3>
            <h6>
              <a
                href="https://mountain-aire.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Website
              </a>
            </h6>
            <h6>
              <a href="mailto:info@mountain-aire.com">info@mountain-aire.com</a>
            </h6>
            <h6>
              We are holding our wedding at a beautiful resort in the foothills
              North West of Calgary. Getting here does require driving on gravel
              roads and cell coverage is spotty at best around the area so plan
              accordingly.
            </h6>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2475.236739202012!2d-115.28969712324644!3d51.655501799873065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5376dd8328e81785%3A0xf7f6acc033eaa54c!2sMountain-Aire%20Resort%20%26%20Campground!5e0!3m2!1sen!2sca!4v1714154455967!5m2!1sen!2sca"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Map"
            />
          </InfoBoxBorder>
        </InfoBox>
      </InfoContainer>
    </WeddingLayout>
  );
};

export default WeddingInfo;
