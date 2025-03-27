import React from 'react'
import { Link } from 'react-router-dom'
const ForYouView = ({data}) => {
  return (
    <section className='py-10'>
    <div className='container max-w-full'>
      <h1 className='text-2xl font-semibold mb-6'>For You</h1>
      <div className='flex flex-row w-full overflow-scroll no-scrollbar gap-6'>
      {data?.map ((movie) => (
        
        <div 
        style={{
          backgroundImage: movie.backdrop_path
          ? `linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,0.7) 100%), url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`
          : "linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%), url(https://149348893.v2.pressablecdn.com/wp-content/uploads/2019/03/no-image-available.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="flex flex-col min-w-[372px] lg:min-w-[480px] h-44 justify-end p-4">
        <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-col gap-1'>
        <div className='flex flex-row gap-3'>
          <h1 className='text-xs font-normal text-white text-opacity-70'>
          {movie.release_date.slice(0,4)}
          </h1>
          <h1 className='text-xs font-normal text-white text-opacity-70'>{movie.media_type}</h1>
        </div>
        <h1 className='text-base font-normal text-white'>{movie.title}</h1>
        </div>
        <Link to={`/detail/${movie.id}`}> 
        <button className='py-2 px-4 text-sm bg-white text-black rounded-md'>See Detail</button>
        </Link>
        </div>  
        </div>
       
      ))}
      </div>
    </div>
    </section>
  )
}

export default ForYouView
