import { Disposition } from "../src/js/Disposition.js";

it("Should blbla", () => {
  const disposition = new Disposition(
    [Disposition.Speciality, Disposition.Cabinet]
  );
  console.log("lolo", disposition.adaptOptions(0));
});
