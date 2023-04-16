const addBtn = document.querySelector('.add')
const deleteAllBtn = document.querySelector('.delete-all')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')
// const deleteBtn = document.getElementsByClassName('delete-note')

const noteArea = document.querySelector('.note-area')
const notePanel = document.querySelector('.note-panel')
const category = document.querySelector('#category')
const textarea = document.querySelector('#text')
const error = document.querySelector('.error')

let selectedValue

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

const createNote = () => {
	selectValue()
	const newNote = document.createElement('div')
	newNote.classList.add('note')
	newNote.innerHTML = `
        <div class="note-header">
            <h3 class="note-title">${selectedValue}</h3>
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
	console.log()
	const deleteBtn = document.querySelectorAll('.delete-note')
	const map = []
	deleteBtn.forEach(el => map.push(el))
	console.log(map)
	const target = e.target.closest('.delete-note')

	const i = map.indexOf(target)
	console.log(i)

	if (i !== -1) {
		deleteNote(i)
		e.target.closest('.note').remove()
	}
}

const deleteNote = i => {
	console.log(i, '=====')
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
