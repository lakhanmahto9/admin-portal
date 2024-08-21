import React, { ReactNode } from "react";

interface ArtLayoutProps{
    children:ReactNode;
}
export const ArtLayout : React.FC<ArtLayoutProps> = ({children}) =>{
    return(
      <div>{children}</div>
    )
}