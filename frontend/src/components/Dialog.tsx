import React, { useEffect, useRef } from "react";

interface DialogProps {
  title: string;
  message: string;
  openModal: boolean;
  closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Dialog({
  title,
  message,
  openModal,
  closeModal,
}: DialogProps): JSX.Element {
  const refCon = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (refCon.current){
        if (openModal) {
          refCon.current.showModal();
        } else {
          refCon.current.close();
        }
    }
  }, [openModal]);

  return (
    <dialog ref={refCon} onCancel={() => closeModal}
        className="relative w-96 h-72 rounded-xl"
    >
      <h2>{title}</h2>
      <p>{message}</p>
      <button onClick={closeModal}>Close</button>
    </dialog>
  );
}

interface TermsAndRegulationsProps {
    isOpen: boolean;
    agreed: boolean;
    close: (e: React.SyntheticEvent<HTMLDialogElement>) => void;
    agree: (e: React.ChangeEvent<HTMLInputElement>) => void;
    createAccount: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function TermsAndRegulations ({ isOpen, agreed, agree, close, createAccount }: TermsAndRegulationsProps ): JSX.Element {
    const refCon = useRef<HTMLDialogElement>(null);

    useEffect(() => {
      if (refCon.current){
          if (isOpen) {
            refCon.current.showModal();
          } else {
            refCon.current.close();
          }
      }
    }, [isOpen])

    return(
        <dialog ref={refCon} onCancel={close}
            className="relative w-[75%] h-[75%] rounded-xl px-8 py-4 tracking-tighter"
        >
            <h1 className="font-azert font-bold text-3xl " >Terms and Regulations</h1>
            <section
                className="relative w-full h-[85%]"
            >
                <p>holy moly</p>
                <label htmlFor="iagree"></label>
                <input checked={agreed} type="checkbox" name="" id="iagree" onChange={agree}/>
            </section>
            
            <button disabled={!agreed}
                onClick={(e) => {createAccount(e)}}
                className="absolute right-8 bottom-4 h-fit w-fit bg-lime-400 px-5 py-2"
            >
                Create Account
            </button>

        </dialog>
    )
}

export { TermsAndRegulations };

export default Dialog;
