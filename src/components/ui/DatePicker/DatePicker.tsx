import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isSunday } from "date-fns";
import "./DatePicker.css"
import axios from "axios";
import { IFormValues } from "../../../AppTypes/AppTypes.type";


interface IDatePicker {
  formValues: IFormValues;
  setFormValues: (value: IFormValues) => void;
}

interface IHolidays {
  country: string;
  iso: string;
  year: number;
  date: string;
  day: string;
  name: string;
  type: string;
}

function findHoliday(dates: IHolidays[], selectedDay: string): string | null {
  const selectedDataObject = new Date(selectedDay);

  for (const holiday of dates) {
    const holidayData = new Date(holiday.date);
    

    if (
      holidayData.getDate() === selectedDataObject.getDate() &&
      holidayData.getMonth() === selectedDataObject.getMonth() &&
      holidayData.getFullYear() === selectedDataObject.getFullYear()
    ) {
      return holiday.name;
    }
  }

  return "";
}



function formatDateToString(arr: any[]) {
  const formattedArray = arr.map((item:any) => {
    const formattedDate = new Date(item.date);
    const dateString = formattedDate;
    return dateString;
  });
  return formattedArray;
}

const apiKey = "8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx";
const url =
  "https://api.api-ninjas.com/v1/holidays?country=PL&year=2023&type=NATIONAL_HOLIDAY";


  const urlObservance = "https://api.api-ninjas.com/v1/holidays?country=PL&year=2023&type=OBSERVANCE";



const CustomDatePicker: React.FC<IDatePicker> = ({
  formValues,
  setFormValues,
}) => {
  const [selectedDate, setSelectedDate] = useState<any>("");

  const [nationalHoliday, setNationalHoliday] = useState<any>([]);

  const [observance, setObservance] = useState<IHolidays[]>([]);

  const [allertMessage, setAllertMessage] = useState<string | null>(null);

  const handleDateChange = (date: any) => {
    setFormValues({ ...formValues, date: date });
    setSelectedDate(date)
  };

  const isSundayDay = (date: Date) => {
    return !isSunday(date);
  };


    useEffect(() => {
      axios
        .get(url, {
          headers: {
            "x-api-key": apiKey,
          },
        })
        .then((response: any) => {
          setNationalHoliday(formatDateToString(response.data));
        })
        .catch((error: any) => {
          console.error(error);
        });

        axios
          .get(urlObservance, {
            headers: {
              "x-api-key": apiKey,
            },
          })
          .then((response: any) => {
            setObservance(response.data);
          })
          .catch((error: any) => {
            console.error(error);
          });

    },[])

  useEffect(() => {
    setAllertMessage(findHoliday(observance, selectedDate));
  }, [selectedDate]);

  return (
    <div>
      <label className="block text-sm font-semibold leading-6 text-textColor">
        Date
      </label>
      <div className="w-full m-auto flex justify-center">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          filterDate={isSundayDay} // switch off sundays
          excludeDates={nationalHoliday} // switch off national holidays
          customInput={<input type="text" />}
          inline
        />
      </div>
      {allertMessage ? (
        <div>
          {" "}
          <span className="@apply h-[15px] w-[15px] text-[10px] bg-defaultBorderColor inline-block text-center text-[white] rounded-full cursor-pointer mr-2 mt-2">
            i
          </span>
          <span className="text-textColor text-[13px] font-semibold">
            It is {allertMessage}{" "}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default CustomDatePicker;
