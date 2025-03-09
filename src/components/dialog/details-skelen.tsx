export function MovieDetailsSkeleton() {
    return (
      <div className='text-[#A8B5DB] flex flex-col gap-8 overflow-auto'>
        <div className='flex flex-col space-y-5 md:space-y-0 md:flex-row items-start md:items-center justify-between'>
          <div>
            <div className='h-10 w-64 bg-gray-700 rounded animate-pulse'></div>
            <div className='h-6 w-40 bg-gray-700 rounded mt-2 animate-pulse'></div>
          </div>
          <div className='flex gap-4 items-center'>
            <div className='px-4 py-[3.5px] rounded-[6px] bg-[#221F3D] h-8 w-20 animate-pulse'></div>
            <div className='px-4 py-[3.5px] rounded-[6px] bg-[#221F3D] h-8 w-16 animate-pulse'></div>
          </div>
        </div>
  
        <section className='grid grid-cols-9 gap-7 w-full'>
          <div className='hidden col-span-3 md:flex justify-center'>
            <div className='max-h-[441px] max-w-[302px] w-full h-full bg-gray-700 rounded-[10px] animate-pulse'></div>
          </div>
          <div className='col-span-9 md:col-span-6 w-full h-[441px] flex items-center justify-center bg-gray-900 rounded-[10px] animate-pulse'></div>
        </section>
  
        <section className='flex flex-col gap-5'>
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className='grid grid-cols-5 gap-4'>
              <div className='col-span-1 h-6 bg-gray-700 rounded animate-pulse'></div>
              <div className='col-span-4 h-6 bg-gray-700 rounded animate-pulse'></div>
            </div>
          ))}
        </section>
      </div>
    );
  };
  
 