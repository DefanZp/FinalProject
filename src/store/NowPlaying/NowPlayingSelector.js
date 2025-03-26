import { useSelector } from "react-redux";

export const useNowPLayingSelector = () => useSelector((state) => state.data);