import React, { FC, useState } from "react";
import { css } from "emotion";
import MesonModal from "../../../src/modal";
import { DocDemo } from "@jimengio/doc-frame";

let DemoModal: FC<{}> = (props) => {
  let [visible, setVisible] = useState(false);
  let [noMovingVisible, setNoMovingVisible] = useState(false);

  return (
    <div className={styleContainer}>
      <div className={styleBoxArea}>
        <div>
          <DocDemo title="Modal" link={"https://github.com/jimengio/meson-modal/blob/master/example/pages/demos/modal.tsx"}>
            <button
              onClick={() => {
                setVisible(true);
              }}
            >
              Try Modal
            </button>
          </DocDemo>

          <DocDemo title="Modal disabled moving" link="https://github.com/jimengio/meson-modal/blob/master/example/pages/demos/modal.tsx">
            <button
              onClick={() => {
                setNoMovingVisible(true);
              }}
            >
              Try Modal No moving
            </button>
          </DocDemo>
        </div>
      </div>

      <MesonModal
        title={"DEMO modal"}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        renderContent={() => {
          return (
            <div>
              SOMETHING....
              <span
                onClick={() => {
                  setVisible(false);
                }}
              >
                Close
              </span>
            </div>
          );
        }}
      />

      <MesonModal
        title={"DEMO modal"}
        visible={noMovingVisible}
        onClose={() => {
          setNoMovingVisible(false);
        }}
        disableMoving
        renderContent={() => {
          return (
            <div>
              <span
                onClick={() => {
                  setNoMovingVisible(false);
                }}
              >
                Close
              </span>
            </div>
          );
        }}
      />
    </div>
  );
};

export default DemoModal;

let styleContainer = css``;

let styleBoxArea = css`
  padding: 20px;
`;

const styleLabel = css`
  width: 200px;
`;
