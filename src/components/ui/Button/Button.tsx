import axios from 'axios';
import React, { useEffect } from 'react'
import { IFormValues } from '../../../AppTypes/AppTypes.type';


interface IButton {
  errorValidation: boolean;
  setErrorValidation: (value: boolean) => void;
  formValues: IFormValues;
  emailValidation: boolean | null
}

function hasEmptyProperty(obj: { [key: string]: any }): boolean {
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value === "" || value === undefined) {
        return true;
      }
    }
  }
  return false;
}

const url = "http://letsworkout.pl/submit";

const Button: React.FC<IButton> = ({errorValidation, setErrorValidation, formValues, emailValidation}) => {

useEffect(() => {
  setErrorValidation(hasEmptyProperty(formValues));
}, [formValues]);

  return (
    <button
      onClick={() =>
        axios
          .post(url, formValues)
          .then((response) => {
            console.log("succes:", response.data);
          })
          .catch((error) => {
            console.error("eror:", error);
          })
      }
      disabled={errorValidation || !emailValidation}
      className="  @apply w-full h-[45px] rounded text-lg font-medium leading-[21.78px] tracking-[0.5px] cursor-pointer bg-defaultButtonColor text-[white] mt-10 border-[none] hover:bg-hoverButtonColor disabled:bg-inactiveButtonColor"
    >
      Send Application
    </button>
  );
};

export default Button