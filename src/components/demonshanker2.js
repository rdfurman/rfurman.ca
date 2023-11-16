import React, { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import styled from "styled-components";

export default function DemonShanker2() {
  const [showUnity, setShowUnity] = useState(false);

  const { unityProvider, loadingProgression, isLoaded, unload } =
    useUnityContext({
      codeUrl: "/demonshanker2/Build/demonshanker2.wasm",
      frameworkUrl: "/demonshanker2/Build/demonshanker2.framework.js",
      dataUrl: "/demonshanker2/Build/demonshanker2.data",
      loaderUrl: "/demonshanker2/Build/demonshanker2.loader.js",
    });

  useEffect(() => {
    return async () => {
      if (isLoaded) {
        await unload();
      }
    };
  }, [isLoaded, unload]);

  return (
    <GameStage>
      {showUnity ? (
        <>
          <LoadingBar
            hidden={loadingProgression === 1}
            style={{ display: loadingProgression === 1 ? "none" : "flex" }}
          >
            Loading... <br /> {Math.round(loadingProgression * 100)}%
          </LoadingBar>

          <Unity
            hidden={loadingProgression !== 1}
            style={{
              width: 1160,
              height: 680,
              display: loadingProgression !== 1 ? "none" : "flex",
            }}
            unityProvider={unityProvider}
          />
        </>
      ) : (
        <PlayButton onClick={() => setShowUnity(true)}>Play</PlayButton>
      )}
    </GameStage>
  );
}

const GameStage = styled.div`
  & {
    background-color: gray;
    width: 1160px;
    height: 680px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LoadingBar = styled.div`
  & {
    display: inline-block;
    text-decoration: none;
    font-size: 2rem;
    text-align: center;
    transition: background 250ms ease-in-out, transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 1rem 2rem;
    margin: 0;
    width: 20rem;
    justify-content: center;
    align-items: center;
  }
`;

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
