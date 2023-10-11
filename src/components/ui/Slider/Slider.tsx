import Slider from "@mui/material/Slider";
import "./Slider.css";
import { IFormValues } from "../../../AppTypes/AppTypes.type";

interface ICustomSlider {
  formValues: IFormValues;
  setFormValues: (value: IFormValues) => void;
}

const marks = [
  {
    value: 8,
    label: "8",
  },
  {
    value: 100,
    label: "100",
  },
];


function valuetext(value: number) {
  return `${value}`;
}

const CustomSlider: React.FC<ICustomSlider> = ({
  formValues,
  setFormValues}
) => {




  return (
    <div className="@apply flex flex-col justify-center mb-8">
      <label className="block text-sm font-semibold leading-6 text-textColor mb-5">
        Age
      </label>
      <Slider
        aria-label="Temperature"
        defaultValue={8}
        getAriaValueText={valuetext}
        color="secondary"
        valueLabelDisplay="on"
        min={8}
        max={100}
        marks={marks}
        onChange={(__event: Event, newValue: number | number[]) => {
          setFormValues({ ...formValues, age: newValue.toString() });
        }}
      />
    </div>
  );
};


export default CustomSlider;