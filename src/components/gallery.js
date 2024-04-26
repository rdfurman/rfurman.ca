import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import useGallery from "../hooks/useGallery";
import "./gallery.css";

const Gallery = () => {
  const images = useGallery();

  return (
    <div>
      <div className="gallery">
        {images.map(({ id, gatsbyImageData }) => {
          return (
            <GatsbyImage
              key={id}
              image={getImage(gatsbyImageData)}
              alt="An image"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
