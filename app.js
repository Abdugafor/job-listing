const skillTags = document.querySelectorAll('.skill-tag'),
      tags = document.querySelector('#tags')


const skills = []
let i = 0

tags.innerHTML = ''

skillTags.forEach(item => {
    item.addEventListener('click', () => addTag(item))
})

function addTag(item) {
    if (item.classList.contains('active')) {
        item.classList.remove('active')
    }else {
        item.classList.add('active')
    }

    const tag = item.innerHTML.replace(/\s/gi, '')



    skills.push(tag)
    renderTags(tag.id)
}

function renderTags() {
    let html = ''
    for (let i = 0; i < skills.length; i++) {
    html += `
        <div class="top-tag d-flex">
            ${skills[i]}
            <img src="images/icon-remove.svg" alt="" class="remove">
        </div>
    `
    }

    tags.innerHTML = html

    deleteTag()
}


function deleteTag() {
    const removeTagBtn = document.querySelectorAll('.remove')

    removeTagBtn.forEach(item => {
        item.addEventListener('click', () => {
            const tag = item.dataset.id

            const tagId = skills.findIndex(item => item.title === tag)
            skills.splice(tagId, 1)
            renderTags()
        })
    })
}

//  Clear Btn
const clearBtn = document.querySelector('.clear')

clearBtn.addEventListener('click', () => {
    tags.innerHTML = ''

    skillTags.forEach(item => {
        item.classList.remove('active')
    })
})



