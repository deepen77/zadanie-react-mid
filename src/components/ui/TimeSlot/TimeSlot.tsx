import { IFormValues } from "../../../AppTypes/AppTypes.type";

interface ITimeSlot {
  formValues: IFormValues;
  setFormValues: (value: IFormValues) => void;
  hours: string
}


const TimeSlot = ({ hours, formValues, setFormValues }: ITimeSlot) => {

  const handleInputClick = () => {
    setFormValues({ ...formValues, time: hours });
  };

  return (
    <div className="text-textColor mb-2">
      <input
        className="@apply w-[70px] h-12 border border-defaultBorderColor bg-defaultBackroundColor rounded-lg border-solidoutline: none focus:border-activeBorderColor focus:bg-activeBackroundColor focus:ring-1 focus:ring-activeBorderColor focus:outline-none text-center"
        type="text"
        value={hours}
        readOnly
        onClick={handleInputClick}
      />
    </div>
  );
};

export default TimeSlot;
