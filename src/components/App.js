import React,/*useState Hook*/{useState, useEffect/*toFetchDataFromDatabaseAsReactCan't*/} from 'react'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import UserItem from './UserItem'
import RegisterUser from './RegisterUser'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import { ipcRenderer } from 'electron'

const App = () => {
	const [search,setSearch] = useState('')
	const [users, setUsers] = useState([
		//{
		// 	_id:1,
		// 	text:'This is log One',
		// 	priority: 'moderate',
		// 	user:'Kate',
		// 	created: new Date().toString(),
		// },
		// {
		// 	_id:2,
		// 	text:'This is log two',
		// 	priority: 'low',
		// 	user:'Brad',
		// 	created: new Date().toString(),
		// },
		// {
		// 	_id:3,
		// 	text:'This is log Three',
		// 	priority: 'high',
		// 	user:'John',
		// 	created: new Date().toString(),
		//},
	]
	)
	const [alert, setAlert] = useState({
		show:false, // When we want to show Alert Message, we put it to true
		message:'',
		variant: 'success'
	})

	useEffect(() => {
		ipcRenderer.send('users:load') // <= This is to main process know that logs are ready to load
		ipcRenderer.on('users:get',(e,users) => {
		setUsers(JSON.parse(users))
		})
	},[]/*Empty array as no dependency, if there is depedency then we send it here*/)
	// Adding Element in the above prototype data

	function addUser(item){
		if(item.name==='' || item.phoneNumber === '' || item.feeAmount === '')
        {
			showAlert('Please Enter All Fields','danger')
			console.log('Masti Kar raya aen')
			return false;
          //Alert()
          
        }
		// item._id= Math.floor(Math.random()*90000)+10000
		// item.created=new Date().toString()
		/*...logs means all the logs from exisiting array */
		// setLogs([...logs, item])
		ipcRenderer.send('users:add', item)
		showAlert('User Added !')
	}
	function updateUser(item){
		if(item.name==='' || item.phoneNumber === '' || item.feeAmount === '')
        {
			showAlert('Empty Fields Not Allowed! Please Fill','danger')
			console.log('Masti Kar raya aen')
			return false;
        }
		// item._id= Math.floor(Math.random()*90000)+10000
		// item.created=new Date().toString()
		/*...logs means all the logs from exisiting array */
		// setLogs([...logs, item])
		console.log('Update in App.js')
		console.log(item.id)
		console.log(item.name)
		console.log(item.phoneNumber)
		console.log(item.feeAmount)
		//ipcRenderer.send('users:update', item)
		showAlert('User Updated !')
	}
	function showAlert(message, variant='success', seconds=3000)
	{
		setAlert({
			show: true,
			message,
			variant
		})
		setTimeout(() => {
			setAlert({
				show: false,
				message: '',
				variant: 'success'
			})
		}, seconds)
	}
	// Deleting Item from the above Logs
	function deleteItem(_id)
	{
		//setLogs(logs.filter((item) => item._id !== id))
		ipcRenderer.send('users:delete', _id)
		showAlert('User Removed !')
	}
	function payFee(_id)
	{
		//setLogs(logs.filter((item) => item._id !== id))
		ipcRenderer.send('users:pay', _id)
		showAlert('User Paid Fee !')
	}
	function unpayFee(_id)
	{
		//setLogs(logs.filter((item) => item._id !== id))
		ipcRenderer.send('users:unpay', _id)
	}
	function deleteFeeDefaulter(_id)
	{
		//setLogs(logs.filter((item) => item._id !== id))
		ipcRenderer.send('users:deletefeedefaulter', _id)
	}
	//Check Fee Status
	// function checkFeeStatus(_id)
	// {
	// 	console.log('mein call kepiche hon')
	// 	ipcRenderer.send('users:status',_id)
	// 	console.log(_id)
	// }
	// The part Below is Rendered on the Screen
	const onSubmit = (e)=>{
		e.preventDefault()
		if(search!==''){
			let newUsers = users.filter(member=>member.name === search)
			newUsers = [...newUsers, ...(users.filter(member=>member.phoneNumber === search))]
			if(search === 'Paid'){
				newUsers = [...newUsers, ...(users.filter(member=>member.feeStatus === true))]
			}else if(search === 'UnPaid'){
				newUsers = [...newUsers, ...(users.filter(member=>member.feeStatus === false))]
			}
			setUsers(newUsers)
		}else{
			ipcRenderer.send('users:load') // <= This is to main process know that logs are ready to load
		ipcRenderer.on('users:get',(e,users) => {
			setUsers(JSON.parse(users))
		})
		}
		
	}

	const searchTag = <Form onSubmit={onSubmit}>
	<Row className='my-3'>
	  <Col>
		<Form.Control
		  placeholder='Search'
		  type='text'
		  onChange={(e)=>setSearch(e.target.value)}
		/>
	  </Col>
	</Row></Form>

let counter=0;
	return (
		// <div className='app'>
		// 	<h1>React Electron Boilerplate</h1>
		// 	<p>This is a simple boilerplate for using React with Electron</p>
		// </div>
		<Container>
			<RegisterUser addUser={addUser}/>
			{searchTag}
			{alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Phone Number</th>
						<th>Fee Amount</th>
						<th>Date Joined</th>
						<th>Fee Status</th>	
						<th>Pay Fee</th>	
						{/* <th>Click to Edit</th> */}
						<th>Click to Delete</th>					
						{/* <th></th> */}
					</tr>
				</thead>
				<tbody>
					{/*The Code below Iterates to Display the table*/}
					{
						users.map((user) => 
						(
							counter++,
							// props of UserItem below are key, user, deleteItem, payFee ...
							<UserItem key={user._id} user={user} deleteItem={deleteItem} payFee={payFee} unpayFee={unpayFee} deleteFeeDefaulter={deleteFeeDefaulter} updateUser={updateUser} counter={counter} /*checkFeeStatus={//checkFeeStatus}*/ />
						)
					  )
					}
				</tbody>
			</Table>
		</Container>
	)
}

export default App
