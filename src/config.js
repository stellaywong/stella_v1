module.exports = {
    navLinks: [
        {
            name: "Home",
            url: "/",
        },
        {
            name: "About",
            url: "/about",
        },
        {
            name: "Work",
            url: "/work",
        }
    ],
    srConfig: (delay = 300) => ({
        delay,
        distance: '30px',
        duration: 500,
        easing: 'ease-in',
        // reset: false,
        opacity: 0,
        viewFactor: 0.35,
      }),
}