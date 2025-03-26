import { useSelector } from "react-redux";

export const useCreditSelector = () => useSelector((state) => state.data);