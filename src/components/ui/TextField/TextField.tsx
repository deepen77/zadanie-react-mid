import { IFormValues } from "../../../AppTypes/AppTypes.type";

interface ITextField {
  label: string;
  formValues: IFormValues;
  setFormValues: (value: IFormValues) => void;
  name: keyof IFormValues;
  emailValidation?: boolean | null;
  setEmailValidation?: (value: boolean | null) => void;
}

const TextField: React.FC<ITextField> = ({
  label,
  formValues,
  setFormValues,
  name,
  setEmailValidation,
  emailValidation,
}) => {
  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  return (
    <div className="@apply text-textColor  mb-3">
      <label className="block text-sm font-semibold leading-6 text-textColor">
        {label}
      </label>
      <input
        className={
          !emailValidation && name === "email" && formValues.email !== ""
            ? "@apply w-full h-12 border border-errorBorderColor bg-errorBackgroundColor rounded-lg border-solidoutline: none focus:border-errorBorderColor focus:bg-errorBackgroundColor focus:ring-1 focus:ring-errorBorderColor focus:outline-none pl-4"
            : "@apply w-full h-12 border border-defaultBorderColor bg-defaultBackroundColor rounded-lg border-solidoutline: none focus:border-activeBorderColor focus:bg-activeBackroundColor focus:ring-1 focus:ring-activeBorderColor focus:outline-none pl-4"
        }
        name={name}
        type="text"
        value={formValues[name]}
        onChange={(e) => {
          setFormValues({ ...formValues, [name]: e.target.value });
          if (name === "email") {
            if (setEmailValidation) {
              setEmailValidation(isValidEmail(formValues.email));
            }
          }
        }}
      />
      {!emailValidation && name === "email" && formValues.email !== "" ? (
        <div className="mt-3 flex ">
          <span className="@apply h-[15px] w-[15px] text-[10px] bg-errorBorderColor inline-block text-center text-[white] rounded-full mr-2 ">
            !
          </span>
          <span className="text-textColor text-[13px] font-semibold ">
            Please use correct formatting.
            <br /> Example: address@email.com
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default TextField;
