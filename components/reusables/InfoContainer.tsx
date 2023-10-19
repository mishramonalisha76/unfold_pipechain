import { ReactNode } from "react";

export const InfoContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="absolute bottom-14 -left-24 hidden group-hover:block">
      {children}
    </div>
  );
};
