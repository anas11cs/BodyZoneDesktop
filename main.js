const path = require('path')
const url = require('url')
const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const connectDB = require('./config/db')
const User = require('./models/User')
let mainWindow
let isDev = true

const isMac = process.platform === 'darwin'? true : false

if ( process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development') {
	isDev = true
}

//Connect to Database
connectDB()

function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: isDev ? 1400:1100,
		height: 800,
		show: false,
		icon: './assets/icons/icon.png',
		webPreferences: {
			nodeIntegration: true,
		},
	})

	let indexPath

	if (isDev && process.argv.indexOf('--noDevServer') === -1) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: 'index.html',
			slashes: true,
		})
	} else {
		indexPath = url.format({
			protocol: 'file:',
			pathname: path.join(__dirname, 'dist', 'index.html'),
			slashes: true,
		})
	}

	mainWindow.loadURL(indexPath)

	// Don't show until we are ready and loaded
	mainWindow.once('ready-to-show', () => {
		mainWindow.show()

		// Open devtools if dev
		if (isDev) {
			const {
				default: installExtension,
				REACT_DEVELOPER_TOOLS,
			} = require('electron-devtools-installer')

			installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
				console.log('Error loading React DevTools: ', err)
			)
			mainWindow.webContents.openDevTools()
		}
	})

	mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', () =>{
	createMainWindow() // 1st Render THING on Window
	const mainMenu=Menu.buildFromTemplate(menu) // 2nd Render THING on Window
	Menu.setApplicationMenu(mainMenu)
})

// ==================================== APP MENU BELOW  ====================================


const menu = [
	...(isMac ? [{ role: 'appMenu' }] : []),
	{
	  role: 'fileMenu',
	},
	{
	  role: 'editMenu',
	},
	// {
	//   label: 'Users',
	//   submenu: [
	// 	{
	// 	  label: 'Clear Logs',
	// 	  click: () => clearLogs(),
	// 	},
	//   ],
	// },
	...(isDev
	  ? [
		  {
			label: 'Developer',
			submenu: [
			  { role: 'reload' },
			  { role: 'forcereload' },
			  { type: 'separator' },
			  { role: 'toggledevtools' },
			],
		  },
		]
	  : []),
  ]

// ====================================  ==================================== IPC PROCESSES BELOW  ====================================  ====================================
// Helper Functions Below
// Send Logs & Clear Logs
async function sendUsers()// Function to fetch data from data base
{
	try{
		const users = await User.find().sort({created:1/*1=Ascending*/})
		mainWindow.webContents.send('users:get', JSON.stringify(users))
	}
	catch(err){
		console.log(err)
	}
}
// async function clearLogs()
// {
// 	try{
// 		const logs = await Log.deleteMany({})
// 		mainWindow.webContents.send('logs:clear'/*, JSON.stringify(logs)*/) // Second Parameter Removed as nothing to render, since all logs are cleared
// 	}
// 	catch(err){
// 		console.log(err)
// 	}
// }
 // ====================================
 // ====================================
// Catching the sent users here. Sent from App.js by ipcRenderer.send('users:load')
// Load User
ipcMain.on('users:load',sendUsers)
//Create User
ipcMain.on('users:add', async (e,item) => {
	try{
		await User.create(item)
		sendUsers()
		//console.log('here')
	} catch(err){
		console.log(err)
	}
	//console.log(item)
})
// ====================================
//Delete User
ipcMain.on('users:delete', async (e,id) => {
	try{
		await User.findOneAndDelete({ _id:id })
		sendUsers()
		//console.log('here')
	} catch(err){
		console.log(err)
	}
	//console.log(item)
})
//Pay Fee User
ipcMain.on('users:pay', async (e,id) => {
	try{
		await User.findOneAndUpdate({ _id:id },{feeStatus:true})
		await User.findOneAndUpdate({ _id:id },{dateJoined:Date.now()})
		sendUsers()
		//console.log('here')
	} catch(err){
		console.log(err)
	}
	//console.log(item)
})
//Un-Pay Fee User
ipcMain.on('users:unpay', async (e,id) => {
	try{
		console.log('here')
		await User.findOneAndUpdate({ _id:id },{feeStatus:false})
		//sendUsers()
	} catch(err){
		console.log(err)
	}
	//console.log(item)
})
//deleteFeeDefaulter
ipcMain.on('users:deletefeedefaulter', async (e,id) => {
	try{
		await User.findOneAndRemove({ _id:id })
		sendUsers()
		//console.log('here')
	} catch(err){
		console.log(err)
	}
	//console.log(item)
})
// ipcMain.on('users:status', async(e,id) =>{
// 	try{
// 		// console.log('mein try hon')
// 		// console.log(id)
// 		const {feeStatus} = await User.findOne({_id:id}).select('feeStatus')
// 		mainWindow.webContents.send('users:status', feeStatus)
// 		// console.log(feeStatus)
// 		// console.log('ustad ji thaly result ayy')
// 		// console.log(
// 			// )

// 	}
// 	catch(err)
// 	{
// 		console.log(err)
// 	}
// })
 // ====================================
// // Clear Log
//  ipcMain.on('logs:clear', async(e) => {
// 	 try{

// 	 }
// 	 catch(err){
// 		console.log(err)
// 	 }
//  })
 // ====================================
// ====================================
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createMainWindow()
	}
})

// Stop error
app.allowRendererProcessReuse = true
