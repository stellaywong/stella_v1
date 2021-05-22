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
        duration: 500,
        easing: 'ease-in',
        // reset: false,
        opacity: 0,
        viewFactor: 0.25,
      }),
    srRight: (delay = 300) => ({
      delay,
      duration: 500,
      distance: '50px',
      easing: 'ease-in',
      opacity: 0,
      origin: 'left',
      viewFactor: 0.25,
    })
}