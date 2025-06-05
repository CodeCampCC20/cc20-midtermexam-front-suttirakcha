import type { PropsWithoutRef } from "react";

function Checkbox(props: PropsWithoutRef<any>) {
  return <input type="checkbox" className="checkbox" {...props} />;
}

export default Checkbox;
