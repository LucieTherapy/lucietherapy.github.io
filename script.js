document.addEventListener("DOMContentLoaded", () => {
    // 1. URL Params & Language
    const urlParams = new URLSearchParams(window.location.search)
    let currentLang = urlParams.get("lang")
    if (currentLang !== "fr" && currentLang !== "en") {
        currentLang = "en"
    }

    updateContent(currentLang)

    // 2. Navigation Logic
    window.setLanguage = (lang) => {
        const newUrl = new URL(window.location)
        newUrl.searchParams.set("lang", lang)
        window.history.pushState({}, "", newUrl)
        updateContent(lang)
    }

    // 3. Scroll Spy
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-links a")
    window.addEventListener("scroll", () => {
        let current = ""
        sections.forEach((section) => {
            const sectionTop = section.offsetTop
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute("id")
            }
        })
        navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active")
            }
        })
    })

    // 4. Check for Deep Linked Blog Post
    const postId = urlParams.get("post")
    if (postId) {
        openBlogDrawer(postId)
    }

    // 5. Initialize Carousel Listeners
    document.getElementById("zone-next").addEventListener("click", () => {
        moveCarouselNext()
    })
    document.getElementById("zone-prev").addEventListener("click", () => {
        moveCarouselPrev()
    })

    // 6. Copy Email Logic
    const copyBtn = document.getElementById("btn-copy-email")
    copyBtn.addEventListener("click", () => {
        const email = "info@lucietherapy.com"
        navigator.clipboard.writeText(email).then(() => {
            const toast = document.getElementById("copy-toast")
            toast.classList.add("show")
            setTimeout(() => {
                toast.classList.remove("show")
            }, 2000)
        })
    })

    // 7. Contact Modal Logic
    const bookBtn = document.getElementById("book-btn")
    const modal = document.getElementById("contact-modal")
    const modalClose = document.getElementById("modal-close")

    if (bookBtn && modal && modalClose) {
        bookBtn.addEventListener("click", (e) => {
            e.preventDefault()
            modal.classList.add("show")
        })

        modalClose.addEventListener("click", () => {
            modal.classList.remove("show")
        })

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("show")
            }
        })
    }

    // 8. Supervision Modal Logic
    const supervisionBtn = document.getElementById("supervision-btn")
    const supervisionModal = document.getElementById("supervision-modal")
    const supervisionModalClose = document.getElementById("supervision-modal-close")

    if (supervisionBtn && supervisionModal && supervisionModalClose) {
        supervisionBtn.addEventListener("click", (e) => {
            e.preventDefault()
            supervisionModal.classList.add("show")
        })

        supervisionModalClose.addEventListener("click", () => {
            supervisionModal.classList.remove("show")
        })

        supervisionModal.addEventListener("click", (e) => {
            if (e.target === supervisionModal) {
                supervisionModal.classList.remove("show")
            }
        })
    }
})

/* --- CAROUSEL STATE --- */
let isAnimating = false

function updateContent(lang) {
    document.querySelectorAll(".lang-btn").forEach((b) => b.classList.remove("active"))
    document.getElementById(`btn-${lang}`).classList.add("active")

    // Nav
    document.getElementById("link-bio").textContent = CONTENT.ui.nav_bio[lang]
    document.getElementById("link-about").textContent = CONTENT.ui.nav_about[lang]
    document.getElementById("link-practice").textContent = CONTENT.ui.nav_practice[lang]
    document.getElementById("link-services").textContent = CONTENT.ui.nav_services[lang]
    document.getElementById("link-blog").textContent = CONTENT.ui.nav_blog[lang]

    // Bio
    document.getElementById("page-name").textContent = CONTENT.titles.name
    document.getElementById("page-role").innerHTML = CONTENT.titles.role[lang]
    document.getElementById("bio-text").innerHTML = CONTENT.summary[lang]
    document.getElementById("btn-bio-action").textContent = CONTENT.ui.btn_background[lang]

    // About Me (SPLIT CONTENT)
    document.getElementById("about-title").textContent = CONTENT.about.title[lang]
    document.getElementById("about-education").innerHTML = CONTENT.about.education[lang]
    document.getElementById("about-experience").innerHTML = CONTENT.about.experience[lang]

    // --- AUTOMATIC AFFILIATIONS GENERATOR ---
    const affData = CONTENT.about.affiliations
    let affHTML = `<h3 class="about-subtitle">${affData.title[lang]}</h3>`
    affHTML += `<ul class="affiliations-list">`
    affData.list.forEach((item) => {
        affHTML += `
            <li>
                <div class="aff-left">
                    <img src="${item.logo}" class="aff-logo" alt="${item.org[lang]}">
                    <div>
                        <strong>${item.role[lang]}</strong><br>
                        ${item.org[lang]}
                    </div>
                </div>
                <div class="aff-date">
                    ${item.location[lang]}<br>
                    ${item.date[lang]}
                </div>
            </li>
        `
    })
    affHTML += `</ul>`
    affHTML += `<p style="margin-top: 20px; font-style: italic;">${affData.footer[lang]}</p>`
    document.getElementById("about-affiliations").innerHTML = affHTML
    // ----------------------------------------

    // MAP PINS & ARROWS
    const mapContainer = document.getElementById("about-map-container")
    const svgLayer = document.getElementById("map-arrows-svg")
    const existingPins = mapContainer.querySelectorAll(".map-pin")
    existingPins.forEach((pin) => pin.remove())
    const paths = svgLayer.querySelectorAll("path")
    paths.forEach((p) => p.remove())

    const timeline = CONTENT.about.timeline

    // Create Pins
    timeline.forEach((item) => {
        const pin = document.createElement("div")
        pin.className = "map-pin"
        pin.style.top = item.top + "%"
        pin.style.left = item.left + "%"

        const labelClass = item.labelPos === "top" ? "pin-label top" : "pin-label"

        pin.innerHTML = `
            <div class="${labelClass}">${item.location[lang]}</div>
            <div class="pin-info">
                <span class="pin-year">${item.year[lang]}</span>
                ${item.desc[lang]}
            </div>
        `
        mapContainer.appendChild(pin)
    })

    // Draw Dynamic Arrows
    for (let i = 0; i < timeline.length - 1; i++) {
        const start = timeline[i]
        const end = timeline[i + 1]

        const x1 = start.left
        const y1 = start.top
        const x2 = end.left
        const y2 = end.top

        const mx = (x1 + x2) / 2
        const my = (y1 + y2) / 2

        const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
        const curvature = dist * 0.3

        let cx = mx
        let cy = my - curvature

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
        const d = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`

        path.setAttribute("d", d)
        path.setAttribute("class", "arrow-path")
        path.setAttribute("marker-end", "url(#arrowhead)")

        svgLayer.appendChild(path)
    }

    // Practice
    const pData = CONTENT.practice
    document.getElementById("practice-main-title").textContent = pData.title[lang]
    document.getElementById("ip-title").textContent = pData.in_person_title[lang]
    document.getElementById("ip-desc").textContent = pData.in_person_desc[lang]
    document.getElementById("ip-loc-name").textContent = pData.location_name[lang]
    document.getElementById("ip-address").innerHTML = pData.address_lines[lang].join("<br>")
    document.getElementById("ip-email").textContent = pData.contact_email
    document.getElementById("ip-email").href = "mailto:" + pData.contact_email
    document.getElementById("ip-web").href = pData.contact_web_url
    document.getElementById("btn-contact-left").textContent = CONTENT.ui.btn_contact[lang]
    document.getElementById("ol-title").textContent = pData.online_title[lang]
    document.getElementById("ol-badge").textContent = CONTENT.ui.telehealth_badge[lang]
    document.getElementById("ol-desc").textContent = pData.online_desc[lang]
    document.getElementById("ol-sub").textContent = pData.online_sub[lang]
    document.getElementById("sg-email").textContent = pData.sg_contact
    document.getElementById("sg-email").href = "mailto:" + pData.sg_contact
    document.getElementById("sg-web").href = pData.sg_web_url
    document.getElementById("btn-contact-right").textContent = CONTENT.ui.btn_contact[lang]

    // Services
    document.getElementById("services-title").textContent = CONTENT.services.title[lang]
    const servicesContainer = document.getElementById("services-container")
    servicesContainer.innerHTML = ""
    CONTENT.services.cards.forEach((card) => {
        const bgStyle = card.img ? `style="background-image: url('media/${card.img}');"` : ""
        const hasBgClass = card.img ? "has-bg" : ""

        const clickAttr = card.blogPostId ? `onclick="openBlogDrawer('${card.blogPostId}')"` : ""
        const pointerClass = card.blogPostId ? "clickable" : ""

        const cardHTML = `
            <div class="service-card ${hasBgClass} ${pointerClass}" ${bgStyle} ${clickAttr}>
                <div class="s-content-default"><h3 class="s-title">${card.title[lang]}</h3></div>
                <div class="s-overlay">
                    <h3 class="s-title" style="color:white; margin-bottom:15px;">${card.title[lang]}</h3>
                    <p class="s-desc">${card.desc[lang]}</p>
                </div>
            </div>`
        servicesContainer.innerHTML += cardHTML
    })
    document.getElementById("fees-title").textContent = CONTENT.services.fees_title[lang]
    document.getElementById("fees-desc").textContent = CONTENT.services.fees_desc[lang]
    document.getElementById("insurance-info").textContent = CONTENT.services.insurance[lang]
    document.getElementById("book-btn").textContent = CONTENT.ui.btn_book[lang]

    // Contact Modal Form Labels
    document.getElementById("modal-title").textContent = CONTENT.form.title[lang]
    document.getElementById("lbl-email").textContent = CONTENT.form.lbl_email[lang]
    document.getElementById("lbl-availability").textContent = CONTENT.form.lbl_availability[lang]
    document.getElementById("lbl-type").textContent = CONTENT.form.lbl_type[lang]
    document.getElementById("opt-online").textContent = CONTENT.form.opt_online[lang]
    document.getElementById("opt-inperson").textContent = CONTENT.form.opt_inperson[lang]
    document.getElementById("lbl-message").textContent = CONTENT.form.lbl_message[lang]
    document.getElementById("btn-submit").textContent = CONTENT.form.btn_submit[lang]
    document.getElementById("modal-close").setAttribute("aria-label", CONTENT.form.btn_close[lang])

    // Supervision Modal Form Labels
    const sf = CONTENT.form_supervision
    document.getElementById("supervision-modal-title").textContent = sf.title[lang]
    document.getElementById("sup-lbl-email").textContent = sf.lbl_email[lang]
    document.getElementById("sup-lbl-background").textContent = sf.lbl_background[lang]
    document.getElementById("sup-opt-trainee").textContent = sf.opt_trainee[lang]
    document.getElementById("sup-opt-qualified").textContent = sf.opt_qualified[lang]
    document.getElementById("sup-lbl-availability").textContent = sf.lbl_availability[lang]
    document.getElementById("sup-lbl-message").textContent = sf.lbl_message[lang]
    document.getElementById("sup-btn-submit").textContent = sf.btn_submit[lang]
    document.getElementById("supervision-modal-close").setAttribute("aria-label", sf.btn_close[lang])

    // Blog
    document.getElementById("blog-title").textContent = CONTENT.ui.nav_blog[lang]

    // Render Carousel
    renderBlogCarousel(lang)
}

function renderBlogCarousel(lang) {
    const track = document.getElementById("blog-track")
    track.innerHTML = ""

    let displayPosts = [...CONTENT.blog]
    if (displayPosts.length < 9) {
        displayPosts = [...CONTENT.blog, ...CONTENT.blog, ...CONTENT.blog]
    }

    displayPosts.forEach((post, index) => {
        const title = post.title[lang]
        const tmpDiv = document.createElement("div")
        tmpDiv.innerHTML = post.content[lang]
        const text = tmpDiv.textContent || tmpDiv.innerText || ""
        const excerpt = text.substring(0, 80) + "..."

        const imgHTML = post.img ? `<img src="media/${post.img}" alt="${title}" class="blog-thumb">` : `<div class="blog-no-img">📝</div>`

        const html = `
            <div class="blog-post-card" id="card-${index}" onclick="openBlogDrawer('${post.id}')">
                ${imgHTML}
                <div class="blog-content">
                    <div class="blog-date">${post.date}</div>
                    <h3 class="blog-title">${title}</h3>
                    <p class="blog-excerpt">${excerpt}</p>
                    <span class="blog-link">${CONTENT.ui.read_more[lang]} →</span>
                </div>
            </div>
        `
        track.innerHTML += html
    })

    const cards = Array.from(track.children)
    if (cards.length > 0) {
        track.prepend(track.lastElementChild)
    }

    updateActiveClasses()

    track.style.transition = "none"
    track.style.transform = "translateX(-33.33%)"

    if (window.innerWidth <= 900) {
        track.style.transform = "translateX(-100%)"
    }
}

function moveCarouselNext() {
    if (isAnimating) return
    isAnimating = true
    const track = document.getElementById("blog-track")
    const isMobile = window.innerWidth <= 900

    const slidePercent = 100
    const numToMove = isMobile ? 1 : 3

    track.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)"
    const currentTrans = isMobile ? -100 : -33.333
    const newTrans = currentTrans - slidePercent

    track.style.transform = `translateX(${newTrans}%)`

    setTimeout(() => {
        for (let i = 0; i < numToMove; i++) {
            track.appendChild(track.firstElementChild)
        }

        track.style.transition = "none"
        track.style.transform = `translateX(${currentTrans}%)`

        updateActiveClasses()
        isAnimating = false
    }, 500)
}

function moveCarouselPrev() {
    if (isAnimating) return
    isAnimating = true
    const track = document.getElementById("blog-track")
    const isMobile = window.innerWidth <= 900

    const slidePercent = 100
    const numToMove = isMobile ? 1 : 3

    track.style.transition = "none"
    const currentTrans = isMobile ? -100 : -33.333
    const offsetTrans = currentTrans - slidePercent

    for (let i = 0; i < numToMove; i++) {
        track.insertBefore(track.lastElementChild, track.firstElementChild)
    }

    track.style.transform = `translateX(${offsetTrans}%)`

    void track.offsetWidth

    track.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)"
    track.style.transform = `translateX(${currentTrans}%)`

    setTimeout(() => {
        updateActiveClasses()
        isAnimating = false
    }, 500)
}

function updateActiveClasses() {
    const track = document.getElementById("blog-track")
    const cards = Array.from(track.children)
    const isMobile = window.innerWidth <= 900

    cards.forEach((card, index) => {
        card.classList.remove("inactive")

        if (!isMobile) {
            if (index < 1 || index > 3) {
                card.classList.add("inactive")
            }
        }
    })
}

// DRAWER LOGIC
window.openBlogDrawer = (id) => {
    const overlay = document.getElementById("drawer-overlay")
    const drawer = document.getElementById("blog-drawer")
    const lang = document.getElementById("btn-fr").classList.contains("active") ? "fr" : "en"

    const post = CONTENT.blog.find((p) => p.id === id)
    if (!post) return

    document.getElementById("drawer-title").textContent = post.title[lang]
    document.getElementById("drawer-date").textContent = post.date
    document.getElementById("drawer-body").innerHTML = post.content[lang]

    const imgContainer = document.getElementById("drawer-img-container")
    const drawerBody = document.getElementById("drawer-body")
    if (post.img) {
        imgContainer.innerHTML = `<img src="media/${post.img}" alt="">`
        drawerBody.insertAdjacentElement("afterbegin", imgContainer)
    } else {
        imgContainer.innerHTML = ""
        imgContainer.remove()
    }

    overlay.classList.add("open")
    drawer.classList.add("open")
    document.body.style.overflow = "hidden"

    const newUrl = new URL(window.location)
    newUrl.searchParams.set("post", id)
    window.history.pushState({}, "", newUrl)
}

const closeDrawer = () => {
    document.getElementById("drawer-overlay").classList.remove("open")
    document.getElementById("blog-drawer").classList.remove("open")
    document.body.style.overflow = ""

    const newUrl = new URL(window.location)
    newUrl.searchParams.delete("post")
    window.history.pushState({}, "", newUrl)
}

document.getElementById("drawer-close").addEventListener("click", closeDrawer)
document.getElementById("drawer-overlay").addEventListener("click", closeDrawer)

window.addEventListener("resize", () => {
    const lang = document.getElementById("btn-fr").classList.contains("active") ? "fr" : "en"
    renderBlogCarousel(lang)
})
