'use client';
import MainDiv from '@/views/pages/landing_page/main_div';
import SideDiv from '@/views/pages/landing_page/side_div';
import React, { useState } from 'react'
import { FaClipboard, FaMapMarkedAlt } from 'react-icons/fa';
import { MdQuiz } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { ModalForm } from '@/views/auth/auth_form';

const Home = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [states, setStates] = useState({
    isOpen: false,
    formType: 'L',

  })

  function handleOpen() {
    setStates({...states, isOpen: !states.isOpen});
    console.log(isDialogOpen);
  }

  const RenderDialog = () => (
    <ModalForm open={isDialogOpen} handleOpen={handleOpen}/>
  )
  return (
    <div className='mx-2 flex flex-col gap-6'>
        {isDialogOpen &&(<RenderDialog/>)}
        <MainDiv/>
        <div className='flex flex-col lg:md:flex-row justify-between gap-3'>
          <SideDiv title={'Assignments'} paragraph={'View your pending and completed assignments.'}>
            <FaClipboard size={100} />
          </SideDiv>
          <SideDiv title={'Map'} paragraph={'View the map of the university.'}>
            <FaMapMarkedAlt size={100} />
          </SideDiv>
          <SideDiv title={'Create Notes'} paragraph={'Convert existing course resources to notes.'}>
            <CgNotes size={100} />
          </SideDiv>
          <SideDiv title={'Create Quiz'} paragraph={'Convert existing course resources to quiz.'}>
            <MdQuiz size={100} />
          </SideDiv>
        </div> 
    </div>
  )
}

export default Home