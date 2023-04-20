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
const categoryDeleteBtn = document.querySelector('.category-delete-btn')
const categoryToDelete = document.querySelector('#category-delete')

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
	: ['-wybierz kategorię-', 'Zakupy', 'Praca', 'Inne']
let categoryColorList = localStorage.getItem('categoryColorList')
	? JSON.parse(localStorage.getItem('categoryColorList'))
	: [null, '#48FF00', '#FFF300', '#00AAFF']
let categoryNoteList = localStorage.getItem('category') ? JSON.parse(localStorage.getItem('category')) : []
let textNoteList = localStorage.getItem('text') ? JSON.parse(localStorage.getItem('text')) : []
let backroundImage = localStorage.getItem('backroundImage') ? localStorage.getItem('backroundImage') : ''

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
		newNote.style.backgroundColor = categoryColorList[i + 1]
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
	}, 450)
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
}

// close panels

const closePanels = e => {
	const panel = e.target.closest('.panel')

	if (panel.matches('.category-panel')) {
		closeCategoryPanel()
	} else if (panel.matches('.backround-and-colors-panel')) {
		closeBackroundColorsPanel()
	}
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
	}, 450)
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
	}, 500)
}

const checkCategory = () => {
	console.log(categoryList)
	localStorage.setItem('categoryList', JSON.stringify(categoryList))
	category.textContent = ''
	categoryToDelete.textContent = ''
	categoryList.forEach(el => {
		const option = document.createElement('option')
		const optionDelete = document.createElement('option')
		option.textContent = el
		optionDelete.textContent = el

		if (option.textContent === '-wybierz kategorię-') {
			option.value = 0
			optionDelete.value = 0
			option.disabled = true
			optionDelete.disabled = true
			option.selected = true
			optionDelete.selected = true
		} else {
			option.value = 1
		}
		categoryToDelete.append(optionDelete)
		category.append(option)
	})
}

const createCategory = (name, color) => {
	clearValuePanelCategory()
	categoryList.push(name)
	categoryColorList.push(color)

	console.log(categoryList)
	console.log(categoryColorList)
	localStorage.setItem('categoryColorList', JSON.stringify(categoryColorList))
	checkCategory()
}

const addCategory = () => {
	const nameCategory = categoryInput.value
	const colorCategory = categoryColor.value

	if (nameCategory === '') {
		categoryError.style.display = 'block'
		categoryError.textContent = 'Podaj nazwę kategorii'
	} else {
		categoryError.style.display = 'none'
		categoryError.textContent = ''
		createCategory(nameCategory, colorCategory)
	}
}

const deleteCategory = e => {
	const selectedValue = categoryToDelete.selectedIndex
	console.log(selectedValue)

	if (selectedValue != 0) {
		categoryList.splice(selectedValue, 1)
		categoryColorList.splice(selectedValue, 1)
	}

	localStorage.setItem('categoryList', JSON.stringify(categoryList))
	localStorage.setItem('categoryColorList', JSON.stringify(categoryColorList))

	checkCategory()
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
	}, 500)
}

const changeBackground = () => {
	document.body.style.backgroundImage = `url('${bgAddInput.value}')`
	localStorage.setItem('backgroundImage', bgAddInput.value)
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
		console.error()
	} else {
		outputTime = ''
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
	localStorage.setItem('color', JSON.stringify(categoryColorList))
}

const selectValue = () => {
	selectedValue = category.options[category.selectedIndex].text
}

const checkColor = note => {
	const index = categoryList.indexOf(selectedValue)
	console.log(index)
	note.style.backgroundColor = categoryColorList[index]
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
	categoryColorList.splice(i, 1)

	localStorage.setItem('category', JSON.stringify(categoryNoteList))
	localStorage.setItem('text', JSON.stringify(textNoteList))
	localStorage.setItem('color', JSON.stringify(categoryColorList))
}

const deleteAllNotes = () => {
	noteArea.textContent = ''
	categoryNoteList = []
	textNoteList = []
	categoryColorList = []

	localStorage.setItem('category', JSON.stringify(categoryNoteList))
	localStorage.setItem('text', JSON.stringify(textNoteList))
	localStorage.setItem('color', JSON.stringify(categoryColorList))
}

// =========================== listeners ===========================

const allClosePanel = document.querySelectorAll('.close-settings')
allClosePanel.forEach(btn => btn.addEventListener('click', closePanels))
const allReturnBtn = document.querySelectorAll('.return-btn')
allReturnBtn.forEach(btn =>
	btn.addEventListener('click', () => {
		closeCategoryPanel()
		closeBackroundColorsPanel()
		openSettings()
	})
)

window.addEventListener('DOMContentLoaded', createLocalNote)
window.addEventListener('DOMContentLoaded', () => {
	checkCategory()
	const img = localStorage.getItem('backgroundImage')
	document.body.style.backgroundImage = ` url('${img}')`
})
addBtn.addEventListener('click', openPanel)
cancelBtn.addEventListener('click', closePanel)

categoryBtn.addEventListener('click', addCategory)
settingsBtnAll.forEach(btn => btn.addEventListener('click', openSettings))
openCategoryPanelBtn.addEventListener('click', openCategoryPanel)
categoryDeleteBtn.addEventListener('click', deleteCategory)

openBackroundColorsPanelBtn.addEventListener('click', openBackroundColorsPanel)
colorAddBtn.addEventListener('click', addColors)
colorResetBtn.addEventListener('click', resetColors)

closePanelBtn.addEventListener('click', closeSettings)
saveBtn.addEventListener('click', addNote)
deleteAllBtn.addEventListener('click', deleteAllNotes)
noteArea.addEventListener('click', activateDeleteListeners)

bgAddBtn.addEventListener('click', changeBackground)
