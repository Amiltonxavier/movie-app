import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export  function Dialog({children}: Props) {
  return (
    <div className='fixed z-[1000] h-screen inset-0 backdrop-blur-sm bg-black/60 flex justify-center items-center'>
            <div className="w-[1200px]  bg-[#0F0D23] p-12 rounded-2xl">
                {
                    children
                }
            </div>
    </div>
  )
}
