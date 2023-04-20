const addBtn = document.querySelector('.add')
const deleteAllBtn = document.querySelector('.delete-all')
const settingsBtnAll = document.querySelectorAll('.settings')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')

const noteArea = document.querySelector('.note-area')
const notePanel = document.querySelector('.note-panel')
const category = document.querySelector('#category')
const textarea = document.querySelector('#text')

const settingsPanel = document.querySelector('.settings-panel')
const closePanelBtn = document.querySelector('.close-settings')

const categoryPanel = document.querySelector('.category-panel')
const openCategoryPanelBtn = document.querySelector('.category-open-panel-btn')
const openBackroundColorsPanelBtn = document.querySelector('.colors-open-panel-btn')

const categoryInput = document.querySelector('#category-add')
const categoryColor = document.querySelector('#category-color-add')
const categoryBtn = document.querySelector('.category-btn')
const categoryError = document.querySelector('.error-category')

const backroundColorsPanel = document.querySelector('.backround-and-colors-panel')
const bgAddInput = document.querySelector('#bg-add-input')
const bgAddBtn = document.querySelector('.bg-add-btn')

const root = document.querySelector(':root')
const colorAddInput1 = document.querySelector('.color #color1')
const colorAddInput2 = document.querySelector('.color #color2')
const opacityColorAddInput = document.querySelector('.color #opacity')
const colorAddBtn = document.querySelector('.c-add-btn')
const mainColor = getComputedStyle(root).getPropertyValue('--main-color')
const secondColor = getComputedStyle(root).getPropertyValue('--second-color')
const colorResetBtn = document.querySelector('.c-reset-btn')

const timeInput = document.querySelector('#time')
let outputTime = ''

const error = document.querySelector('.error')

let selectedValue

const bg = document.querySelector('.bg')

// =========================== notification ===========================

Notification.requestPermission()

function notifyMe(text) {
	if (!('Notification' in window)) {
		// Check if the browser supports notifications
		alert('This browser does not support desktop notification')
	} else if (Notification.permission === 'granted') {
		// Check whether notification permissions have already been granted;
		console.log(text)
		const options = {
			body: text,
			// icon: theIcon,
		}

		const notification = new Notification(selectedValue, options)
		notification.onclick = e => {
			e.preventDefault() // prevent the browser from focusing the Notification's tab
			window.open('https://notes-rudydev.netlify.app/', '_blank')
		}
	} else if (Notification.permission !== 'denied') {
		// We need to ask the user for permission
		Notification.requestPermission().then(permission => {
			// If the user accepts, let's create a notification
			if (permission === 'granted') {
				const notification = new Notification(selectedValue, options)

				notification.onclick = e => {
					e.preventDefault()
					window.open('https://notes-rudydev.netlify.app/', '_blank')
				}
			}
		})
	}
}

// =========================== local ===========================
let categoryList = localStorage.getItem('categoryList')
	? JSON.parse(localStorage.getItem('categoryList'))
	: ['Zakupy', 'Praca', 'Inne']
let categoryColorList = localStorage.getItem('categoryColorList')
	? JSON.parse(localStorage.getItem('categoryColorList'))
	: []
let categoryNoteList = localStorage.getItem('category') ? JSON.parse(localStorage.getItem('category')) : []
let textNoteList = localStorage.getItem('text') ? JSON.parse(localStorage.getItem('text')) : []
let colorNoteList = localStorage.getItem('color') ? JSON.parse(localStorage.getItem('color')) : []

// const crateLocalCategoryList = () => {

// }

const createLocalNote = () => {
	for (let i = 0; i < categoryNoteList.length; i++) {
		const newNote = document.createElement('div')
		newNote.classList.add('note')
		newNote.innerHTML = `
			<div class="note-header">
				<h3 class="note-title">${categoryNoteList[i]}</h3>
				<button class="delete-note">
					<i class="fas fa-times icon"></i>
				</button>
			</div>
			<div class="note-body">
				${textNoteList[i]}
			</div>
		`
		noteArea.append(newNote)
		newNote.style.backgroundColor = colorNoteList[i]
	}
}

// ===========================  panels  ===========================

const clearValuePanel = () => {
	textarea.value = ''
	category.value = 0
	time.value = ''
}

const openPanel = () => {
	closeSettings()
	closeCategoryPanel()
	closeBackroundColorsPanel()
	notePanel.style.display = 'flex'
	notePanel.classList.remove('panel-hide')
	notePanel.classList.add('panel-show')
}

const closePanel = () => {
	notePanel.classList.remove('panel-show')
	notePanel.classList.add('panel-hide')
	setTimeout(() => {
		notePanel.style.display = 'none'
		error.style.visibility = 'hidden'
		clearValuePanel()
	}, 500)
}

const addNote = () => {
	if (textarea.value !== '' && category.value !== '0') {
		error.style.visibility = 'hidden'
		createNote()
	} else {
		error.style.visibility = 'visible '
	}
}

// =========================== settings panel ===========================

//clear value

const clearValuePanelCategory = () => {
	categoryInput.value = ''
	categoryColor.value = '#fff300'
}

const clearValuePanelBackroundColorsPanel = () => {
	bgAddInput.value = ''
	// colorAddInput1.value = root.style.getPropertyValue('--main-color')
	// colorAddInput2.value = root.style.getPropertyValue('--second-color')
}

// close panels

const closePanels = e => {
	const panel = e.target.closest('.panel')

	if (panel.matches('.category-panel')) {
		closeCategoryPanel()
	} else if (panel.matches('.backround-and-colors-panel')) {
		closeBackroundColorsPanel()
	}

	// panel.classList.remove('panel-show')
	// panel.classList.add('panel-hide')
	// setTimeout(() => {
	// 	panel.style.display = 'none'
	// 	// error.style.visibility = 'hidden'
	// 	// clearValuePanel()
	// }, 500)
}

// settings

const openSettings = () => {
	closePanel()
	settingsPanel.style.display = 'flex'
	settingsPanel.classList.remove('panel-hide')
	settingsPanel.classList.add('panel-show')
}

const closeSettings = () => {
	settingsPanel.classList.remove('panel-show')
	settingsPanel.classList.add('panel-hide')
	setTimeout(() => {
		settingsPanel.style.display = 'none'
		// error.style.visibility = 'hidden'
		// clearValuePanel()
	}, 500)
}

//category

const openCategoryPanel = () => {
	closeSettings()
	categoryPanel.style.display = 'flex'
	categoryPanel.classList.remove('panel-hide')
	categoryPanel.classList.add('panel-show')
}

const closeCategoryPanel = () => {
	categoryPanel.classList.remove('panel-show')
	categoryPanel.classList.add('panel-hide')
	setTimeout(() => {
		categoryPanel.style.display = 'none'
		clearValuePanelCategory()
		// error.style.visibility = 'hidden'
		// clearValuePanel()
	}, 500)
}

// const pushCategory = () => {

// }

const checkCategory = () => {

	console.log(categoryList)
	localStorage.setItem('categoryList', JSON.stringify(categoryList))

	categoryList.forEach(el => {
		const option = document.createElement('option')
		option.value = 1
		option.textContent = el

		category.appendChild(option)
	})
}

const createCategory = (name, color) => {
	clearValuePanelCategory()
	categoryList.push(name)
	categoryColorList.push(color)

	console.log(categoryList)
	console.log(categoryColorList)

	checkCategory()
}

const addCategory = () => {
	const nameCategory = categoryInput.value
	const colorCategory = categoryColor.value

	if (nameCategory === '') {
		categoryError.style.display = 'block'
		categoryError.textContent = 'Podaj nazwę kategorii'
	}
	// else if (){
	// local storage
	// }
	else {
		categoryError.style.display = 'none'
		categoryError.textContent = ''
		createCategory(nameCategory, colorCategory)
	}
}

// background and colors

const openBackroundColorsPanel = () => {
	closeSettings()
	backroundColorsPanel.style.display = 'flex'
	backroundColorsPanel.classList.remove('panel-hide')
	backroundColorsPanel.classList.add('panel-show')
}

const closeBackroundColorsPanel = () => {
	backroundColorsPanel.classList.remove('panel-show')
	backroundColorsPanel.classList.add('panel-hide')
	setTimeout(() => {
		backroundColorsPanel.style.display = 'none'
		clearValuePanelBackroundColorsPanel()
		// error.style.visibility = 'hidden'
		// clearValuePanel()
	}, 500)
}

const changeBackground = () => {
	document.body.style.backgroundImage = `url('${bgAddInput.value}')`
	bgAddInput.value = ''
}

const addColors = () => {
	root.style.setProperty('--main-color', colorAddInput1.value)
	const red = parseInt(colorAddInput2.value.substring(1, 3), 16)
	const green = parseInt(colorAddInput2.value.substring(3, 5), 16)
	const blue = parseInt(colorAddInput2.value.substring(5, 7), 16)
	const opacity = opacityColorAddInput.value / 100

	root.style.setProperty('--second-color', `rgba(${red},${green},${blue},${opacity})`)
}

const resetColors = () => {
	root.style.setProperty('--main-color', mainColor)
	root.style.setProperty('--second-color', secondColor)
	colorAddInput1.value = '#000000'
	colorAddInput2.value = '#ffffff'
	opacityColorAddInput.value = 100
}
// =========================== get Time and show Notification ===========================

const getTime = textarea => {
	const date = new Date()
	const dateHours = date.getHours()
	const dateMinutes = date.getMinutes()
	const dateSeconds = date.getSeconds()
	const dateMiliseconds = (dateHours * 60 * 60 + dateMinutes * 60 + dateSeconds) * 1000

	let time = timeInput.value
	time = time.split(':')
	const hours = time[0]
	const minutes = time[1]
	const miliseconds = (hours * 60 * 60 + minutes * 60) * 1000

	endTime = miliseconds - dateMiliseconds

	if (endTime > 0) {
		outputTime = `<p><i class="fa-regular fa-clock"></i> <span class="bold">${time[0]}:${time[1]}</span></p>`
		setTimeout(() => {
			notifyMe(textarea)
		}, endTime)
	} else if (endTime <= 0) {
		endTime = dateMiliseconds - miliseconds
		outputTime = `<p><i class="fa-regular fa-clock"></i> <span class="bold">${time[0]}:${time[1]}</span></p>`
		setTimeout(() => {
			notifyMe(textarea)
		}, endTime)
	} else if (endTime === NaN) {
		outputTime = ''
	} else {
		console.warn('Nie podano godziny')
	}
}

// =========================== create and delete note ===========================

const createNote = () => {
	selectValue()
	getTime(textarea.value)
	const newNote = document.createElement('div')
	newNote.classList.add('note')
	newNote.innerHTML = `
        <div class="note-header">
            <h3 class="note-title">${selectedValue}</h3>
			${outputTime}
            <button class="delete-note">
                <i class="fas fa-times icon"></i>
            </button>
        </div>
        <div class="note-body">
            ${textarea.value}
        </div> 
    `
	noteArea.append(newNote)

	categoryNoteList.push(selectedValue)
	textNoteList.push(textarea.value)

	clearValuePanel()
	notePanel.style.display = 'none'
	checkColor(newNote)

	localStorage.setItem('category', JSON.stringify(categoryNoteList))
	localStorage.setItem('text', JSON.stringify(textNoteList))
	localStorage.setItem('color', JSON.stringify(colorNoteList))
}

const selectValue = () => {
	selectedValue = category.options[category.selectedIndex].text
}

const checkColor = note => {
	switch (selectedValue) {
		case 'Zakupy':
			note.style.backgroundColor = 'rgb(72,255,0)'
			colorNoteList.push('rgb(72,255,0)')
			break
		case 'Praca':
			note.style.backgroundColor = 'rgb(255,243,0)'
			colorNoteList.push('rgb(255,243,0)')
			break
		case 'Inne':
			note.style.backgroundColor = 'rgb(0,170,255)'
			colorNoteList.push('rgb(0,170,255)')
			break
	}
}

const activateDeleteListeners = e => {
	const deleteBtn = document.querySelectorAll('.delete-note')
	const map = []
	deleteBtn.forEach(el => map.push(el))
	const target = e.target.closest('.delete-note')
	const i = map.indexOf(target)

	if (i !== -1) {
		deleteNote(i)
		e.target.closest('.note').remove()
	}
}

const deleteNote = i => {
	categoryNoteList.splice(i, 1)
	textNoteList.splice(i, 1)
	colorNoteList.splice(i, 1)

	localStorage.setItem('category', JSON.stringify(categoryNoteList))
	localStorage.setItem('text', JSON.stringify(textNoteList))
	localStorage.setItem('color', JSON.stringify(colorNoteList))
}

const deleteAllNotes = () => {
	noteArea.textContent = ''
	categoryNoteList = []
	textNoteList = []
	colorNoteList = []

	localStorage.setItem('category', JSON.stringify(categoryNoteList))
	localStorage.setItem('text', JSON.stringify(textNoteList))
	localStorage.setItem('color', JSON.stringify(colorNoteList))
}

// =========================== listeners ===========================

const allClosePanel = document.querySelectorAll('.close-settings')
allClosePanel.forEach(btn => btn.addEventListener('click', closePanels))

window.addEventListener('DOMContentLoaded', createLocalNote)
addBtn.addEventListener('click', openPanel)
cancelBtn.addEventListener('click', closePanel)

categoryBtn.addEventListener('click', addCategory)
settingsBtnAll.forEach(btn => btn.addEventListener('click', openSettings))
openCategoryPanelBtn.addEventListener('click', openCategoryPanel)

openBackroundColorsPanelBtn.addEventListener('click', openBackroundColorsPanel)
colorAddBtn.addEventListener('click', addColors)
colorResetBtn.addEventListener('click', resetColors)
// settingsBtn.addEventListener('click', openSettings)
closePanelBtn.addEventListener('click', closeSettings)
saveBtn.addEventListener('click', addNote)
deleteAllBtn.addEventListener('click', deleteAllNotes)
noteArea.addEventListener('click', activateDeleteListeners)

bgAddBtn.addEventListener('click', changeBackground)

checkCategory()
