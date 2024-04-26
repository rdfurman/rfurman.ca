import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import useGallery from "../hooks/useGallery";
import * as galleryStyles from "./gallery.module.css";

const Gallery = () => {
  const images = useGallery();

  return (
    <div>
      <div className={galleryStyles.gallery}>
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
