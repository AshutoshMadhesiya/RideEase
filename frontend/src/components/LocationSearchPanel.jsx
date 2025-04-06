import React from 'react'

const LocationSearchPanel = (props) => {
    console.log(props);
    //sample array for location
    const locations = ['Tandon Hostel,MNNIT Allahabad,UP 211004 ',
        "Malviya Hostel,MNNIT Allahabad,UP 211004",
        "Tilak Hostel,MNNIT Allahabad,UP 211004",


    ]
    return (
        <div>
            {
                locations.map(function (elem,idx) {
                    return <div key={idx} onClick={() => {
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }} className='flex  gap-4  border-2 border-white active:border-black  p-3 rounded-xl items-center justify-start my-4'>
                        <h2 className='bg-[#eee] h-10 flex items-center justify-center w-15 rounded-full' ><i class="ri-map-pin-2-fill"></i></h2>
                        <h4>{elem}</h4>
                    </div>

                })
            }


        </div>
    )
}

export default LocationSearchPanel