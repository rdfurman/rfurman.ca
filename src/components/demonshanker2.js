import React, { Component } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import styled from "styled-components";

const PlayButton = styled.button`
  & {
    display: inline-block;
    border: none;
    padding: 1rem 2rem;
    margin: 0;
    width: 20rem;
    text-decoration: none;
    background: #0069ed;
    color: #ffffff;
    font-size: 2rem;
    cursor: pointer;
    text-align: center;
    transition: background 250ms ease-in-out, transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  &:hover,
  &:focus {
    background: #0053ba;
  }

  &:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
  }
`;

class DemonShanker2 extends Component {
  constructor() {
    super();

    this.state = {
      showUnity: false,
    };
  }

  componentDidMount() {
    this.unityContext = new UnityContext({
      codeUrl: "/demonshanker2/Build/build.wasm",
      frameworkUrl: "/demonshanker2/Build/build.framework.js",
      dataUrl: "/demonshanker2/Build/build.data",
      loaderUrl: "/demonshanker2/Build/build.loader.js",
    });
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "gray",
          height: "680px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {this.state.showUnity === true ? (
          <Unity
            width="1160px"
            height="680px"
            unityContext={this.unityContext}
          />
        ) : (
          <PlayButton
            onClick={() => this.setState({ showUnity: !this.state.showUnity })}
          >
            Play
          </PlayButton>
        )}
      </div>
    );
  }
}

export default DemonShanker2;
