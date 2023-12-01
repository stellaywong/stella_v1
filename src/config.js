module.exports = {
    navLinks: [
        {
            name: "Music",
            url: "/music"
        },
        {
            name: "Books",
            url: "/",
        },
        {
            name: "Poems",
            url: "/poems",
        },
        {
            name: "Projects",
            url: "/projects",
        },
        {
          name: "Events",
          url: "/events",
        },
    ],
    srConfig: (config={}) => ({
        delay: 300,
        duration: 500,
        distance: '50px',
        easing: 'ease-in',
        // reset: false,
        opacity: 0,
        viewFactor: 0.25,
        ...config,
      }),
    srRight: (delay = 300) => ({
      delay: 300,
      duration: 500,
      distance: '50px',
      easing: 'ease-in',
      opacity: 0,
      origin: 'left',
      viewFactor: 0.25,
    })
}