import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export function Badge({ children }: Props) {
    return (
        <div className='bg-[#221F3D] rounded-[6px] px-4 py-[3.5px] flex items-center justify-center'>
            {
                children
            }
        </div>
    )
}
