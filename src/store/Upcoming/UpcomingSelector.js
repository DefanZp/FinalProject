import { useSelector } from "react-redux";

export const useUpcomingSelector = () => useSelector((state) => state.data);