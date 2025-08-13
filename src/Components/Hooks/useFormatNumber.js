import { useMemo } from "react";

const useFormatNumber = (number, locale = "es-ES", options = { style: "decimal", minimumFractionDigits: 0 }) => {
  const formattedNumber = useMemo(() => {
    if (typeof number !== "number" || isNaN(number)) {
      return "0";
    }
    return new Intl.NumberFormat(locale, options).format(number);
  }, [number, locale, options]);

  return formattedNumber;
};

export default useFormatNumber;