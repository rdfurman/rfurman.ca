import React from "react";
import Unity, { UnityContent } from "react-unity-webgl";

export default function DemonShanker2() {
  const unityContent = new UnityContent(
    "demonshanker2/Builds.json",
    "demonshanker2/UnityLoader.js"
  );
  return <Unity unityContent={unityContent} />;
}
