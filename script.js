/* lucietherapy.com — progressive enhancement only.
   All content is rendered at build time by build.py; nothing here is
   required for the page to be readable or navigable. */

document.addEventListener("DOMContentLoaded", () => {
    setupScrollSpy()
    setupModal("book-btn", "contact-modal", "modal-close")
    setupModal("supervision-btn", "supervision-modal", "supervision-modal-close")
})

/* Highlight the sidebar link for the section currently in view.
   Only applies on the homepage, where the nav uses in-page anchors. */
function setupScrollSpy() {
    const sections = Array.from(document.querySelectorAll(".content-area section[id]"))
    const navLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"))
    if (!sections.length || !navLinks.length) return

    const sync = () => {
        let current = ""
        for (const section of sections) {
            if (window.scrollY >= section.offsetTop - 300) {
                current = section.id
            }
        }
        for (const link of navLinks) {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`)
        }
    }

    let queued = false
    window.addEventListener(
        "scroll",
        () => {
            if (queued) return
            queued = true
            requestAnimationFrame(() => {
                sync()
                queued = false
            })
        },
        { passive: true }
    )
    sync()
}

/* Inquiry dialogs. The forms POST to formsubmit.co and work without JS
   once open; this only handles opening, closing, and focus. */
function setupModal(triggerId, modalId, closeId) {
    const trigger = document.getElementById(triggerId)
    const modal = document.getElementById(modalId)
    const close = document.getElementById(closeId)
    if (!trigger || !modal || !close) return

    let lastFocused = null

    const open = () => {
        lastFocused = document.activeElement
        modal.classList.add("show")
        document.body.style.overflow = "hidden"
        const field = modal.querySelector("input, textarea, button")
        if (field) field.focus()
    }

    const hide = () => {
        modal.classList.remove("show")
        document.body.style.overflow = ""
        if (lastFocused) lastFocused.focus()
    }

    trigger.addEventListener("click", (e) => {
        e.preventDefault()
        open()
    })
    close.addEventListener("click", hide)
    modal.addEventListener("click", (e) => {
        if (e.target === modal) hide()
    })
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("show")) hide()
    })
}
