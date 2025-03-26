import { useSelector } from "react-redux";

export const usePopularSelector = () => useSelector((state) => state.data);