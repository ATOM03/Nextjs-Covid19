import { atom } from "recoil";

export const CovidState = atom({
  key: "state",
  default: {
    loading: true,
    status: [],
    confirmed: "",
    active: "",
    recovered: "",
    deaths: "",
    deltaconfirmed: "",
    deltarecovered: "",
    deltadeaths: "",
    case_time: [],
    open: false,
  },
});
