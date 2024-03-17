import React from 'react'
import Navbars from '../component/Navbars'
import Footers from '../component/Footers'
import Cards from '../component/Cards'
import Corosals from '../component/Corosals'

export default function Home() {
  return (
    <div >
      <Navbars/>
      <div className='mb-1'><Corosals/>
      <div className='mb-4'> </div>
      
      </div>

      <div className='mt-3 '>
      <Cards />
      <Cards />
       
      </div> 
       <Footers/>
    </div>
  )
}
