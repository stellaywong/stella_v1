module.exports = {
    navLinks: [
        {
            name: "Home",
            url: "/",
        },
        {
            name: "Books",
            url: "/books",
        },
        {
            name: "Poems",
            url: "/poems",
        },
        {
            name: "Projects",
            url: "/projects",
        },
    ],
    srConfig: (delay = 300) => ({
        delay,
        distance: '40px',
        duration: 500,
        easing: 'ease-in',
        // reset: false,
        opacity: 0,
        viewFactor: 0.25,
      }),
}