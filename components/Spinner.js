import {
  BounceLoader,
  ClimbingBoxLoader,
  DotLoader,
  RingLoader,
  PacmanLoader,
} from "react-spinners";

export default function Spinner() {
  // return <BounceLoader color={"#1e3a8a"} speedMultiplier={2} />;
  // return <RingLoader color="#1e3a8a" speedMultiplier={1} />;
  // return <ClimbingBoxLoader color="#1e3a8a" speedMultiplier={3} />;
  return <PacmanLoader color="#1e3a8a" speedMultiplier={5} />;
}
