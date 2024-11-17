import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

const Legend = () => {
  return (
    <Card>
        <CardHeader>
            <h1 className='font-semibold text-2xl'>Legend</h1>
        </CardHeader>
        <CardContent>
            <div className='grid grid-cols-4 gap-3'>
                <div className='flex items-center gap-2'>
                    <div className='bg-WR w-8 h-8'></div>
                    <span>Wash Room</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-LR w-8 h-8'></div>
                    <span>Postgraduate Lab</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-SR w-8 h-8'></div>
                    <span>Study Room</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-FR w-8 h-8'></div>
                    <span>Faculty Office</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-BCR w-8 h-8'></div>
                    <span>Boys Common Room</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-GCR w-8 h-8'></div>
                    <span>Girls Common Room</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-CR w-8 h-8'></div>
                    <span>Conference Room</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-PR w-8 h-8'></div>
                    <span>Female Prayer Area</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-HO w-8 h-8'></div>
                    <span>HOD Office</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-GR w-8 h-8'></div>
                    <span>Guest Room</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-ER w-8 h-8'></div>
                    <span>{'Empty Room (for events)'}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-LH w-8 h-8'></div>
                    <span>Library Reading Hall</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-OC w-8 h-8'></div>
                    <span>Network Operation Center</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-WS w-8 h-8'></div>
                    <span>Engineering Workshop</span>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default Legend