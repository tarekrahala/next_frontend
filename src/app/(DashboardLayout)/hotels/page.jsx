import HotelForm from "@/app/components/hotel form/HotelForm"
import HotelCard from "@/app/components/hotels/HotelCard"
import { Grid } from '@mui/material'

function page({params}) {
    const {slugs} = params
    console.log(slugs)
  return (
    <div className="p-4"> 
        <HotelForm />
        <Grid container spacing={2} className="mt-4">
          <Grid item xs={12}>
            <HotelCard
              name="The Strand "
              rating={4.7}
              location="0.2 miles to city centre"
              distanceText="0.2 miles to city centre"
              stars={5}
              score={9.1}
              reviews={564}
              suppliers={[
                { name: 'TBO', price: '£297', rooms: [ { name: 'Deluxe Room', policy: 'Free cancellation', price: '£297' } , { name: 'Superior Room', policy: 'Non-refundable', price: '£310' } , { name: 'Standard Room', policy: 'Free breakfast', price: '£310' } ] },
                { name: 'Smart', price: '£310', rooms: [ { name: 'Superior Room', policy: 'Non-refundable', price: '£310' } , { name: 'Standard Room', policy: 'Free breakfast', price: '£310' } ,  { name: 'Deluxe Room', policy: 'Free cancellation', price: '£297' } ] },
                { name: 'JTE', price: '£310', rooms: [ { name: 'Standard Room', policy: 'Free breakfast', price: '£310' } ] },
                { name: 'lemond', price: '£310', rooms: [ { name: 'Standard Room', policy: 'Free breakfast', price: '£310' } ] },
                { name: 'Amadous', price: '£310', rooms: [ { name: 'Standard Room', policy: 'Free breakfast', price: '£310' } ] },
                { name: 'Booking', price: '£310', rooms: [ { name: 'Standard Room', policy: 'Free breakfast', price: '£310' } ] },
              ]}
            />
          </Grid>
        </Grid>
    </div>
  )
}

export default page