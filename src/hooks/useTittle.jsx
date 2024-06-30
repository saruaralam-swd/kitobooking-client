import { useEffect } from "react";

const useTittle = (title) => {
  useEffect(() => {
    document.title = `${title} - kitobooking`;
  }, [title]);
};

export default useTittle;
