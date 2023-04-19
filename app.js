
class JobsCard {
    constructor(id, company, logo, newPost, featured, position, role, level, postedAt, contract, location, languages, tools, container) {
        this.id = id
        this.company = company
        this.logo = logo
        this.newPost = newPost
        this.featured = featured
        this.position = position
        this.role = role
        this.level = level
        this.postedAt = postedAt
        this.contract = contract
        this.location = location
        this.languages = languages
        this.tools = tools
        this.container = container
    }


    render() {
        const container = document.querySelector(`${this.container}`)

        container.innerHTML += `
        <div class="job d-flex ${this.checkActiveNew()}">
        <div class="info d-flex">
          <div class="logo">
            <img src="${this.logo}" alt="" width="65">
          </div>

          <div class="info-text">
            <div class="top-info  d-flex">
              <p class="name">${this.company}</p>

              <div class="info-tags  d-flex">
              ${this.checkNew()}
              ${this.checkFeature()}
              </div>

            </div>

            <h4 class="job-name">${this.position}</h4>

            <div class="btm-info d-flex">
              <div class="bottom-info">
                ${this.postedAt}
              </div>
              <div class="bottom-info">
                ${this.contract}
              </div>
              <div class="bottom-info">
                ${this.location}
              </div>
            </div>
          </div>

        </div>

        <div class="skill-tags d-flex">
            ${this.renderLanguages()}
            ${this.renderTools()}
      </div>
        `

        this.activeTag()
    }

    renderLanguages() {
        let tags = ''
        for (let i = 0; i < this.languages.length; i++) {
            tags += `
                <div class="skill-tag">
                    ${this.languages[i]}
                </div>
            `
        }
    
        return tags
    }

    renderTools() {
        if (this.tools.length === 0) {
            return ''
        }else {
            let tool = ''
            for (let i = 0; i < this.tools.length; i++) {
                tool += `
                    <div class="skill-tag">
                        ${this.tools[i]}
                    </div>
                `
            }
    
            return tool  
        }
    }

    checkNew() {
        if (this.postedAt === '1d ago' || this.postedAt === '2d ago') {
            return `<p class="info-tag new">NEW!</p>`
        }

        return ''
    }

    checkFeature() {
        if (this.featured === true) {
             return `<p class="info-tag featured">FEATURED</p>`
        }

        return ''
    }

    checkActiveNew() {
        if (this.newPost) {
            return 'new-job'
        }else {
            return
        }
    }

    activeTag() {
        const tags = document.querySelectorAll('.skill-tag')

        tags.forEach(item => {
            item.addEventListener('click', () => {
                if (item.classList.contains('active')) {
                    item.classList.remove('active')
                }else {
                    item.classList.add('active')
                }

                this.filterJobs()
            })
        })
    }

} 

const getData = async (url) => {
    const res = await fetch(url)

    return await res.json()
}

getData('http://localhost:3000/jobs')
    .then(data => {
        data.forEach(({id, company, logo, newPost, featured,position, role, level, postedAt, contract, location, languages, tools}) => {
            new JobsCard(id, company, logo, newPost, featured,position, role, level, postedAt, contract, location, languages, tools, '.jobs').render()
        });
    })



// Add job

const btn = document.querySelector('#btn'),
      modal = document.querySelector('.modal-block')

btn.addEventListener('click', () => {
    modal.style.display = 'block'
    document.querySelector('body').style.overflow = 'hidden'
})

modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-block') ) {
        modal.style.display = 'none'
        document.querySelector('body').style.overflow = 'visible'
    }
})

// Form of Adding job

const form = document.querySelector('.form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector('body').style.overflow = 'visible'

    const formData = new FormData(form)
    const json = JSON.stringify(Object.fromEntries(formData.entries())) 

    postData('http://localhost:3000/jobs', json)
    .finally(form.reset())


    modal.style.display = 'none'
})


const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    })

}
