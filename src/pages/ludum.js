import React from "react";
import Layout from "../components/layout";
import DemonShanker2 from "../components/demonshanker2";
import styled from "styled-components";
import Seo from "../components/seo";

const UnityContainer = styled.div`
  height: 680px;
`;

const ListExternalLink = (props) => (
  <a href={props.to} rel="noopener noreferrer" target="_blank">
    <h4>{props.children}</h4>
  </a>
);

export default function Ludum() {
  return (
    <Layout>
      <Seo title="Ludum Dare" />
      <h1>Ludum Dare</h1>
      <>
        <h3>Ludum Dare 29: Demon Shanker 2</h3>
        <strong>
          Created for Ludum Dare 29. Built with Unity by a team of 5, with me
          sharing design and coding duties.
        </strong>
        <p>
          This is no ordinary hobo, his name is Demon Shanker! Only Demon
          Shanker can see demons for what they truly are. Take a swig to
          activate vodka vision and let the shankin' begin. Keep on shankin'
          until you run out of vodka but be careful, shankin' too many humans
          may draw attention to yourself...
        </p>
        <UnityContainer>
          <DemonShanker2 />
        </UnityContainer>
        <ListExternalLink to="http://ludumdare.com/compo/ludum-dare-29/?action=preview&uid=37215">
          Ludum Dare Entry
        </ListExternalLink>
      </>
    </Layout>
  );
}
