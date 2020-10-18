// Navigation

import VacationList from "~/screens/Vacation/VacationList";
import TravelList from "~/screens/Travel/TravelList";
import TravelupList from "~/screens/Travelup/TravelupList";
import PhotographyList from "~/screens/Photography/PhotographyList";

export default [
  { name: "VacationList", label: "Vacation", component: VacationList },
  { name: "TravelList", label: "Travel", component: TravelList },
  { name: "TravelupList", label: "TravelUp", component: TravelupList },
  { name: "PhotographyList", label: "Photography", component: PhotographyList },
];
