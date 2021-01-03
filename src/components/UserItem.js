//rafce
import React,{useEffect,useState} from 'react'
import Moment from 'react-moment'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

const UserItem = ({
  deleteItem,
  user: { _id, name, phoneNumber, feeAmount, dateJoined, feeStatus }, payFee, unpayFee, deleteFeeDefaulter
  // ,checkFeeStatus
}) => {
  // HERE IS THE PART WHERE YOU WILL EVALUATE ABOUT DUE FEE/LATE FEE
  // ==========================================
  const [color, setcolor] = useState('')
  const setVariant = () => {
    // The Date.parse() method parses a string representation of a date, and returns the number of milliseconds
    const date1=Date.parse(dateJoined)
    const date2=date1/(1000*60*60*24)
    const currDate=Date.now()
    const currDate2=currDate/(1000*60*60*24)
    const diffDays= currDate2-date2
    console.log(diffDays)
    if (diffDays >= 60)
    {
      deleteFeeDefaulter(_id)
      setcolor('')
    }
    else if (diffDays >= 30)
    {
      unpayFee(_id)
      setcolor('warning')

    }
    else
    {
      setcolor('success')
    }

  }

  useEffect(()=>{
    setVariant()
  },[])


  return (
    <tr>
      <td>{name}</td>
      <td>{phoneNumber}</td>
      <td>{feeAmount}</td>
      <td>
      {/* https://momentjs.com/ */}
        <Moment format='MMMM Do YYYY, h:mm:ss a'>{new Date(dateJoined)}</Moment>
      </td>
      <td>
      <Badge variant={color} className='p-2'>
            {feeStatus?<p>Paid</p>:<p>UnPaid</p>}
      </Badge>
      </td>
      <td>
        <Button size='sm' onClick={()=> payFee(_id)}>
          +
        </Button>
        </td>
      <td>
        <Button variant='danger' size='sm' onClick={()=> deleteItem(_id)}>
          x
        </Button>
        {/* <Button variant='danger' size='sm' onClick={()=> checkFeeStatus(_id)}>
          x
        </Button> */}
        {/* <Button size='sm' onClick={()=> deleteItem(_id)}>
          x
        </Button> */}
      </td>
    </tr>
  )
}

export default UserItem