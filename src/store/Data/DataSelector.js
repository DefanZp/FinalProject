import { useSelector } from "react-redux";

export const useDataSelector = () => useSelector((state) => state.data);