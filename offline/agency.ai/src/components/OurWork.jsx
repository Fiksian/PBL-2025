import React from 'react'
import assets from '../assets/assets'
import Title from './Title'

const OurWork = () => {
    const workData= [
        {
            title: 'Mobile app marketing',
            description: 'we turn bold ideas into powerful digital solutions that, engage...',
            image: assets.work_mobile_app
        },
        {
            title: 'Dashboard Management',
            description: 'we help you execute your plan and deliver results',
            image: assets.work_dashboard_management
        },
        {
            title: 'Mobile app marketing',
            description: 'we help you create a marketing strategy that deliver results.',
            image: assets.work_fitness_app
        },
        
    ]


  return (
    <div id='our-work' className='flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 pb-5 text-gray-700 dark:text-white'>
      <Title title='Our Latest Work' desc='From Strategy to execution, 
      we craft digital solutions that move your business foward.'/>

      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl'>
        {
            workData.map((work, index)=>(
                <div key={index} className='hover:scale-95 duration-500 transition-all cursor-pointer'>
                    <img src={work.image} className='w-full rounded-xl' alt=''/>
                    <h3 className='mt-3 mb-2 text-lg font-semibold'>{work.title}</h3>
                    <p className='text-sm opacity-60 w-5/6'>{work.description}</p>
                </div>    
            ))
        }

      </div>
    </div>
  )
}

export default OurWork
