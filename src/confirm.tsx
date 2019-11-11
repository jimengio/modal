import React, { useRef, useEffect } from "react";
import { ReactNode, useState } from "react";
import MesonModal from "./modal";
import { rowParted, rowCenter, Space, column, expand, fullHeight } from "@jimengio/flex-styles";
import { IconButton } from "@jimengio/jimo-basics";
import { css, cx } from "emotion";

interface IConfirmOptions {
  title?: string;
  text: string;
  cancelText?: string;
  confirmText?: string;
}

export let useConfirmModal = (options?: IConfirmOptions): [ReactNode, (opts?: IConfirmOptions) => Promise<boolean>] => {
  let [showModal, setShowModal] = useState(false);
  let resolveRef = useRef(null);
  let rejectRef = useRef(null);
  let promiseRef = useRef<Promise<boolean>>();
  let [confirmOptions, setConfirmOptions] = useState(options || { text: "Sure?" });

  let ui = (
    <MesonModal
      title={null}
      visible={showModal}
      onClose={() => setShowModal(false)}
      disableBackdropClose={true}
      renderContent={() => {
        return (
          <div className={cx(column, expand, styleCard)}>
            {confirmOptions.title ? <div className={styleTitle}>{confirmOptions.title}</div> : null}
            <Space height={16} />
            <div className={cx(expand, styleDesc)}>{confirmOptions.text}</div>
            <Space height={16} />
            <div className={rowParted}>
              <span />
              <div className={rowCenter}>
                <IconButton
                  text={confirmOptions.cancelText || "Cancel"}
                  onClick={() => {
                    resolveRef.current(false);
                    setShowModal(false);
                  }}
                />
                <Space width={8} />
                <IconButton
                  text={confirmOptions.cancelText || "Confirm"}
                  fillColor
                  onClick={() => {
                    resolveRef.current(true);
                    setShowModal(false);
                  }}
                />
              </div>
            </div>
          </div>
        );
      }}
    />
  );

  let waitConfirmation = (opts?: IConfirmOptions) => {
    if (opts) {
      setConfirmOptions({ ...confirmOptions, ...opts });
    }
    setShowModal(true);
    if (!showModal) {
      promiseRef.current = new Promise((resolve, reject) => {
        resolveRef.current = resolve;
        rejectRef.current = reject;
      });
    }
    return promiseRef.current;
  };

  return [ui, waitConfirmation];
};

let styleCard = css`
  padding: 16px;
`;

let styleTitle = css`
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
`;

let styleDesc = css`
  font-size: 13px;
  color: hsl(0, 0%, 40%);
`;