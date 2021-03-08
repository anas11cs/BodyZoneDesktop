//rafce
import React,{useEffect,useState} from 'react'
import Moment from 'react-moment'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

const UserItem = ({
  deleteItem,
  user: { _id, name, phoneNumber, feeAmount, dateJoined, feeStatus }, payFee, unpayFee, deleteFeeDefaulter, updateUser, counter
  // ,checkFeeStatus
}) => {
  // HERE IS THE PART WHERE YOU WILL EVALUATE ABOUT DUE FEE/LATE FEE
  // ==========================================
  const [color, setcolor] = useState('');
  const setVariant = () => {
    // The Date.parse() method parses a string representation of a date, and returns the number of milliseconds
    const date1=Date.parse(dateJoined)
    const date2=date1/(1000*60*60*24)
    const currDate=Date.now()
    const currDate2=currDate/(1000*60*60*24)
    const diffDays= currDate2-date2
    //console.log('Set Variant Function,here !')
    if (diffDays >= 60)
    {
      //deleteFeeDefaulter(_id)
      setcolor('danger')
    }
    else if (diffDays >= 30)
    {
      //console.log('Warning Here !')
      unpayFee(_id)
      setcolor('warning')
    }
    else
    {
      //console.log('Success Here !')
      setcolor('success')
    }
    return 
  }

  useEffect(()=>{
    setVariant()
  },[])

  return (
    <tr>
      <td>{counter}</td>
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
      {/* <td>
        <Button variant='link' size='sm' onClick={()=> console.log('edit')}>
          Edit
        </Button>
      </td> */}
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
 
// ========================== TEST CODE BELOW ==========================

// Editable.js
// import React, { useState } from "react";

// // Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
// const Editable = ({
//   text,
//   type,
//   placeholder,
//   children,
//   ...props
// }) => {
//   // Manage the state whether to show the label or the input box. By default, label will be shown.
// // Exercise: It can be made dynamic by accepting initial state as props outside the component 
//   const [isEditing, setEditing] = useState(false);

// // Event handler while pressing any key while editing
//   const handleKeyDown = (event, type) => {
//     // Handle when key is pressed
//   };

// /*
// - It will display a label is `isEditing` is false
// - It will display the children (input or textarea) if `isEditing` is true
// - when input `onBlur`, we will set the default non edit mode
// Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
// */
//   return (
//     <section {...props}>
//       {isEditing ? (
//         <div
//           onBlur={() => setEditing(false)}
//           onKeyDown={e => handleKeyDown(e, type)}
//         >
//           {children}
//         </div>
//       ) : (
//         <div
//           onClick={() => setEditing(true)}
//         >
//           <span>
//             {text || placeholder || "Editable content"}
//           </span>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Editable;

// // App.js - Input editable UI

// import React, { useState } from "react";
// import Editable from "./Editable";

// function App() {
//   // State for the input
//   const [task, setTask] = useState("");

//   /*
//     Enclose the input element as the children to the Editable component to make it as inline editable.
//   */
//   return (
//     <Editable
//       text={task}
//       placeholder="Write a task name"
//       type="input"
//     >
//       <input
//         type="text"
//         name="task"
//         placeholder="Write a task name"
//         value={task}
//         onChange={e => setTask(e.target.value)}
//       />
//     </Editable>
//   );
// }

// export default App;