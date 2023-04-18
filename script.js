const addBtn = document.querySelector('.add')
const deleteAllBtn = document.querySelector('.delete-all')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')

const noteArea = document.querySelector('.note-area')
const notePanel = document.querySelector('.note-panel')
const category = document.querySelector('#category')
const textarea = document.querySelector('#text')

const timeInput = document.querySelector('#time')
let outputTime = ''

const error = document.querySelector('.error')

let selectedValue

// =========================== notification

Notification.requestPermission()

function notifyMe(text) {
	if (!('Notification' in window)) {
		// Check if the browser supports notifications
		alert('This browser does not support desktop notification')
	} else if (Notification.permission === 'granted') {
		// Check whether notification permissions have already been granted;
		console.log(text);
		const options = {
			body: text
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
let categoryNoteList = localStorage.getItem('category') ? JSON.parse(localStorage.getItem('category')) : []
let textNoteList = localStorage.getItem('text') ? JSON.parse(localStorage.getItem('text')) : []
let colorNoteList = localStorage.getItem('color') ? JSON.parse(localStorage.getItem('color')) : []

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

// =========================== ===========================

const clearValuePanel = () => {
	textarea.value = ''
	category.value = 0
	time.value = ''
}

const openPanel = () => {
	notePanel.style.display = 'flex'
}

const closePanel = () => {
	notePanel.style.display = 'none'
	error.style.visibility = 'hidden'
	clearValuePanel()
}

const addNote = () => {
	if (textarea.value !== '' && category.value !== '0') {
		error.style.visibility = 'hidden'
		createNote()
	} else {
		error.style.visibility = 'visible '
	}
}

// =========================== get Time and show Notification

const getTime = (textarea) => {
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
	} else if (endTime <= 0) {
		endTime = dateMiliseconds - miliseconds
		outputTime = `<p><i class="fa-regular fa-clock"></i> <span class="bold">${time[0]}:${time[1]}</span></p>`
	} else if (endTime === NaN) {
		outputTime = ''
	} else {
		console.warn('Nie podano godziny')
	}

	setTimeout(() => {
		notifyMe(textarea)
	}, endTime)
}

// ===========================

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
		// case 'OMS':
		// 	note.style.backgroundColor = 'rgb(255,243,0)'
		// 	colorNoteList.push('rgb(255,243,0)')
		// 	break
		// case 'AVEVA':
		// 	note.style.backgroundColor = 'rgb(255,243,0)'
		// 	colorNoteList.push('rgb(255,243,0)')
		// 	break
		// case 'Magazyn':
		// 	note.style.backgroundColor = 'rgb(255,243,0)'
		// 	colorNoteList.push('rgb(255,243,0)')
		// 	break
		case 'Inne':
			note.style.backgroundColor = 'rgb(0,170,255)'
			colorNoteList.push('rgb(0,170,255)')
			break
	}
}

const activateDeleteListeners = e => {
	// console.log()
	const deleteBtn = document.querySelectorAll('.delete-note')
	const map = []
	deleteBtn.forEach(el => map.push(el))
	// console.log(map)
	const target = e.target.closest('.delete-note')

	const i = map.indexOf(target)
	// console.log(i)

	if (i !== -1) {
		deleteNote(i)
		e.target.closest('.note').remove()
	}
}

const deleteNote = i => {
	// console.log(i, '=====')
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
	localStorage.clear()
}

window.addEventListener('DOMContentLoaded', createLocalNote)
addBtn.addEventListener('click', openPanel)
cancelBtn.addEventListener('click', closePanel)
saveBtn.addEventListener('click', addNote)
deleteAllBtn.addEventListener('click', deleteAllNotes)
noteArea.addEventListener('click', activateDeleteListeners)
