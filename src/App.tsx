import TextField from "./components/ui/TextField/TextField";
import FormTitle from "./components/ui/FormTitle/FormTitle";
import Slider from "./components/ui/Slider/Slider";
import Button from "./components/ui/Button/Button";
import CustomDatePicker from "./components/ui/DatePicker/DatePicker";
import TimeSlot from "./components/ui/TimeSlot/TimeSlot";
import DropZone from "./components/ui/DropZone/DropZone";
import { useState } from "react";
import { IFormValues } from "./AppTypes/AppTypes.type";


const avaliableHours = [
  { id: 1, hours: "11:00" },
  { id: 2, hours: "13:30" },
  { id: 3, hours: "17:30" },
  { id: 4, hours: "19:00" },
];

function App() {


  const [formValues, setFormValues] = useState<IFormValues>({
    firstname: "",
    lastname: "",
    email: "",
    age: "8",
    files: "",
    date: "",
    time: "",
  });


  const [errorValidation, setErrorValidation] = useState<boolean>(true)
  const [emailValidation, setEmailValidation] = useState<boolean | null>(null);

  return (
    <>
      <div className="max-w-[426px] m-auto p-5">
        <FormTitle title="Personal info" />

        <TextField
          label="First Name"
          formValues={formValues}
          setFormValues={setFormValues}
          name="firstname"
        />
        <TextField
          label="Last Name"
          formValues={formValues}
          setFormValues={setFormValues}
          name="lastname"
        />
        <TextField
          label="Email Address"
          formValues={formValues}
          setFormValues={setFormValues}
          name="email"
          emailValidation={emailValidation}
          setEmailValidation={setEmailValidation}
        />
        <Slider formValues={formValues} setFormValues={setFormValues} />
        <DropZone formValues={formValues} setFormValues={setFormValues} />
        <FormTitle title="Your workout" />
        <div className="sm:flex ">
          <CustomDatePicker
            formValues={formValues}
            setFormValues={setFormValues}
          />

          {formValues.date !== "" ? (
            <div className="sm:ml-7">
              <label className="block text-sm font-semibold leading-6 text-textColor">
                Time
              </label>
              <div className="sm:flex-col flex gap-3">
                {avaliableHours.map((element) => {
                  return (
                    <div key={element.id} className="flex">
                      <TimeSlot
                        key={element.id}
                        hours={element.hours}
                        formValues={formValues}
                        setFormValues={setFormValues}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        <Button
          errorValidation={errorValidation}
          setErrorValidation={setErrorValidation}
          formValues={formValues}
          emailValidation={emailValidation}
        />
      </div>
    </>
  );
}

export default App;
