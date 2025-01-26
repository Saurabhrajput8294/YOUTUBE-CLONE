import React from "react";
import Button from "./Button";
const list = [
  "All",
  "Gaming",
  "Songs",
  "Live",
  "Cricket",
  "Coding",
  "Cooking",
  "Developer",
];
export const ButtonList = () => {
  return (
    <div className="flex">
      {list.map((cat) => (
        <Button key={cat} name={cat} />
      ))}
    </div>
  );
};
export default ButtonList;
