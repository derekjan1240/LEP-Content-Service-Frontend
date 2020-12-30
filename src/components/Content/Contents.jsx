import React, { useState, useEffect } from "react";
import ContentStageLayer from "./components/ContentStageLayer";
import ContentLectureLayer from "./components/ContentLectureLayer";
import ContentVideoLayer from "./components/ContentVideoLayer";

const ContentLayer = (props) => {
  switch (props.pageLayer) {
    case 0:
      return (
        <ContentStageLayer
          setPageLayer={props.setPageLayer}
          setContentStage={props.setContentStage}
        />
      );
    case 1:
      return (
        <ContentLectureLayer
          setPageLayer={props.setPageLayer}
          contentStage={props.contentStage}
        />
      );
    case 2:
      return <ContentVideoLayer setPageLayer={props.setPageLayer} />;
    // return <h1>not yet</h1>;
    default:
      console.error("Layer wrong", props.pageLayer);
      return <ContentStageLayer setPageLayer={props.setPageLayer} />;
  }
};

export default function Contents() {
  const [pageLayer, setPageLayer] = useState(0);
  const [contentStage, setContentStage] = useState(-1);
  return (
    <ContentLayer
      pageLayer={pageLayer}
      setPageLayer={setPageLayer}
      contentStage={contentStage}
      setContentStage={setContentStage}
    />
  );
}
