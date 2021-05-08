import { useState } from "react";

interface ErrorToast {
  mssgs: string[];
  mssgType: string;
  removeError: (errId: number) => void;
}

export const ErrorToast = ({ mssgs, mssgType, removeError }: ErrorToast) => {
  return (
    <div
      className="toast-container p-3"
      style={{ zIndex: 5, position: "fixed", bottom: 0, right: 0 }}
    >
      {mssgs.map((item, idx) => (
        <div
          className={`toast show border-danger border-1`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          key={idx}
        >
          <div className="toast-header bg-danger text-white justify-content-between">
            <strong className="me-auto">{mssgType}</strong>
            <button
              type="button"
              className="ml-2 mb-1 close text-white"
              data-dismiss="toast"
              aria-label="Close"
              onClick={() => removeError(idx)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="toast-body">{item}</div>
        </div>
      ))}
    </div>
  );
};
